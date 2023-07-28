import {Form, Formik} from "formik"
import CustomInputComponent from "../components/CustomInputComponent"
import * as Yup from "yup"
import Button from "@mui/material/Button"
import styled from "styled-components"
import {Link, useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {Loader} from "../components/Loader"
import {useState, useEffect} from "react"
import {toast} from "react-toastify"
import {useRegisterMutation} from "../slices/usersApiSlice"
import {setCredentials} from "../slices/authSlice"
import CheckboxComponent from "../components/CheckboxComponent"

const StyledLink = styled(Link)`
	text-decoration: none;
`

const StyledDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`

const StyledForm = styled(Form)`
	display: flex;
	flex-direction: column;
	align-items: center;
`

export default function RegisterForm() {
	const navigate = useNavigate()

	const dispatch = useDispatch()

	const {userInfo} = useSelector((state) => state.auth)

	const [register, {isLoading}] = useRegisterMutation()

	const [showPassword, setShowPassword] = useState(false)

	useEffect(() => {
		if (userInfo) {
			navigate("/admin")
		}
	}, [userInfo, navigate])

	const validationSchema = Yup.object({
		firstName: Yup.string().required("Required First Name"),
		lastName: Yup.string().required("Required Last Name"),
		email: Yup.string().required("Required Email"),
		password: Yup.string().required("Required Password"),
		confirmPassword: Yup.string().oneOf(
			[Yup.ref("password"), null],
			`Passwords must match`
		),
	})
	const initialValues = {
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	}
	const handleSubmit = async (values, actions) => {
		try {
			const res = await register(values).unwrap()
			dispatch(setCredentials({...res}))
			toast.success("Successfuly Registered")
			navigate("/admin")
		} catch (error) {
			toast.error(error?.data?.message || error.error)
		}
	}

	return (
		<StyledDiv>
			<h1>Register</h1>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{(props) => (
					<StyledForm>
						<CustomInputComponent
							name="firstName"
							placeholder="First Name"
							type="text"
							className="light"
						/>
						<CustomInputComponent
							name="lastName"
							placeholder="Last Name"
							type="text"
							className="light"
						/>
						<CustomInputComponent
							name="email"
							placeholder="Email"
							type="email"
							className="light"
						/>

						<CustomInputComponent
							name="password"
							placeholder="Password"
							type={showPassword ? "text" : "password"}
							className="light"
						/>

						<CustomInputComponent
							name="confirmPassword"
							placeholder="Confirm Password"
							type={showPassword ? "text" : "password"}
							className="light"
						/>

						<Button variant="contained" onClick={() => setShowPassword(!showPassword)}>
							{showPassword ? "Hide Password" : "Show Password"}
						</Button>
						<br />
						{isLoading && <Loader />}
						<Button variant="contained" type="submit">
							Submit
						</Button>
					</StyledForm>
				)}
			</Formik>

			<div>
				Already have an account?
				<Button>
					<StyledLink to="/login">Login</StyledLink>
				</Button>
			</div>
		</StyledDiv>
	)
}
