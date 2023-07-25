import {Form, Formik, useFormik} from "formik"
import CustomInputComponent from "../components/CustomInputComponent"
import CheckboxComponent from "../components/CheckboxComponent"
import SelectComponent from "../components/SelectComponent"
import * as Yup from "yup"
import Button from "@mui/material/Button"

export default function InputForm() {
	const validationSchema = Yup.object({
		name: Yup.string().required("Required First Name"),
		email: Yup.string().required("Required Email"),
		gender: Yup.string().required("Required Gender"),
	})
	const initialValues = {
		name: "",
		email: "",
		gender: "",
		check: false,
	}
	const handleSubmit = (values, actions) => {
		alert(JSON.stringify(values, null, 2))
		actions.resetForm({values: ""})
	}

	return (
		<div className="form--input--box">
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{(props) => (
					<Form>
						<CustomInputComponent
							name="name"
							placeholder="First Name"
							type="text"
							className="light"
						/>

						<CustomInputComponent
							name="email"
							placeholder="Email"
							type="email"
							className="light"
						/>

						<SelectComponent
							name="gender"
							label="Gender"
							items={[
								{
									text: `Select Gender`,
									value: ``,
								},
								{
									text: `Male`,
									value: `male`,
								},
								{
									text: `Female`,
									value: `female`,
								},
								{
									text: `Others`,
									value: `others`,
								},
							]}
						/>

						<br />
						<CheckboxComponent name="check" label="Checkbox" formik={props} />
						<br />

						<Button variant="contained" type="submit">
							Submit
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	)
}
