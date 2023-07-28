import * as Yup from "yup"
import Button from "@mui/material/Button"
import CustomInputComponent from "../components/CustomInputComponent"
import styled from "styled-components"
import {Loader} from "../components/Loader"
import {Form, Formik} from "formik"
import {useState, useEffect} from "react"
import {Link, useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {useLoginMutation} from "../slices/usersApiSlice"
import {setCredentials} from "../slices/authSlice"
import {toast} from "react-toastify"

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

export default function LoginForm() {
	const navigate = useNavigate()

	const dispatch = useDispatch()

	const [login, {isLoading}] = useLoginMutation()

	const {userInfo} = useSelector((state) => state.auth)

	useEffect(() => {
		if (userInfo) {
			navigate("/admin")
		}
	}, [userInfo, navigate])

	const validationSchema = Yup.object({
		email: Yup.string().required("Required Email"),
		password: Yup.string().required("Required Password"),
	})
	const initialValues = {
		email: "",
		password: "",
	}
	const handleSubmit = async (values, actions) => {
		try {
			const res = await login(values).unwrap()
			dispatch(setCredentials({...res}))
			toast.success("Successfuly Logged In")
			navigate("/admin")
		} catch (err) {
			toast.error(err?.data?.message || err.error)
		}
	}

	return (
		<StyledDiv>
			<h1>Login</h1>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{(props) => (
					<StyledForm>
						<CustomInputComponent
							name="email"
							placeholder="Email"
							type="email"
							className="light"
						/>

						<CustomInputComponent
							name="password"
							placeholder="Password"
							type="password"
							className="light"
						/>

						{isLoading && <Loader />}
						<Button variant="contained" type="submit">
							Submit
						</Button>
					</StyledForm>
				)}
			</Formik>

			<br />

			<div>
				New User?
				<Button>
					<StyledLink to="/register">Register</StyledLink>
				</Button>
			</div>
		</StyledDiv>
	)
}
