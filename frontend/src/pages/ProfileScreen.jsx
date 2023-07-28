import {Form, Formik} from "formik"
import CustomInputComponent from "../components/CustomInputComponent"
import * as Yup from "yup"
import Button from "@mui/material/Button"
import styled from "styled-components"
import {Link, useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {Loader} from "../components/Loader"
import {toast} from "react-toastify"
import {setCredentials} from "../slices/authSlice"
import {useUpdateUserMutation} from "../slices/usersApiSlice"

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

export default function ProfileScreen() {
	const navigate = useNavigate()

	const dispatch = useDispatch()

	const {userInfo} = useSelector((state) => state.auth)

	const [updateProfile, {isLoading}] = useUpdateUserMutation()

	const validationSchema = Yup.object({
		firstName: Yup.string().required("Required First Name"),
		lastName: Yup.string().required("Required Last Name"),
		email: Yup.string().required("Required Email"),
		password: Yup.string().required("Required Password"),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref("password"), null], `Passwords must match`)
			.required("Required Confirm Password"),
	})
	const initialValues = {
		firstName: userInfo?.firstName || "",
		lastName: userInfo?.lastName || "",
		email: userInfo?.email || "",
		password: "",
		confirmPassword: "",
	}

	const handleSubmit = async (values, actions) => {
		try {
			const res = await updateProfile({
				_id: userInfo._id,
				...values,
			}).unwrap()
			dispatch(setCredentials({...res}))
			toast.success("Successfuly Updated Profile")
		} catch (error) {
			toast.error(error?.data?.message || error.error)
		}
	}

	return (
		<StyledDiv>
			<h3>Profile</h3>
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
							type="password"
							className="light"
						/>

						<CustomInputComponent
							name="confirmPassword"
							placeholder="Confirm Password"
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
		</StyledDiv>
	)
}
