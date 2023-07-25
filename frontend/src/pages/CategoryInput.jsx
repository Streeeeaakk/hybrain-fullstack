import {Form, Formik, useFormik} from "formik"
import CategoryInputComponent from "../components/CategoryInputComponent"
import * as Yup from "yup"
import {Button} from "@mui/material"
import styled from "@emotion/styled"
import {Link, useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {useAddCategoryMutation} from "../slices/categroyApiSlice"
import {useCategoriesQuery} from "../slices/categroyApiSlice"
import {useEffect} from "react"
import {toast} from "react-toastify"

export default function CategoryInput() {
	const validationSchema = Yup.object({
		name: Yup.string().required("Required Name"),
	})

	const navigate = useNavigate()
	const dispatch = useDispatch()
	const categQuery = useCategoriesQuery()

	const initialValues = {
		name: "",
	}

	const [addCategory, {data, error, isSuccess}] = useAddCategoryMutation()

	const handleSubmit = async (values, actions) => {
		if (values.name === "") {
			toast.error("Please enter a name")
			return
		} else {
			try {
				const res = await addCategory({name: values.name}).unwrap()
				categQuery.refetch()
				navigate("/")
				toast.success("Category Added")
			} catch (err) {
				toast.error(err?.data?.message || err.error)
			}
		}
	}

	return (
		<div>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{(props) => (
					<Form sx={{margin: `10px`}}>
						<CategoryInputComponent
							name="name"
							placeholder="Category Name"
							type="text"
							className="light"
						/>

						<Button
							variant="contained"
							color="primary"
							type="submit"
							disabled={props.isSubmitting}
							sx={{margin: `20px`}}
						>
							Submit
						</Button>

						<Link to="/admin/" relative="path" className="back-button">
							<Button variant="contained" color="primary" type="button">
								Cancel
							</Button>
						</Link>
					</Form>
				)}
			</Formik>
		</div>
	)
}
