import React from "react"
import {Form, Formik, useFormik} from "formik"
import {Link, useNavigate, useParams} from "react-router-dom"
import {Button} from "@mui/material"
import * as Yup from "yup"
import CategoryUpdateComponent from "../components/CategoryUpdateComponent"
import {useUpdateCategoryMutation} from "../slices/categroyApiSlice"
import {useCategoriesQuery} from "../slices/categroyApiSlice"
import {useDispatch, useSelector} from "react-redux"
import {toast} from "react-toastify"

export default function CategoryUpdate() {
	const {id, name} = useParams()

	const navigate = useNavigate()
	const dispatch = useDispatch()
	const categQuery = useCategoriesQuery()
	const [updateCategory, {isLoading, isSuccess}] = useUpdateCategoryMutation()

	const initialValues = {
		name: name,
	}

	const validationSchema = Yup.object({
		name: Yup.string().required("Required Name"),
	})

	const handleSubmit = async (values, actions) => {
		if (values.name === "") {
			toast.error("Please enter a name")
			return
		} else {
			try {
				const res = await updateCategory({id: id, name: values.name}).unwrap()
				categQuery.refetch()
				navigate("/")
				toast.success(`${values.name} Category Updated`)
			} catch (error) {
				toast.error(error?.data?.message || error.error)
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
						<CategoryUpdateComponent
							name="name"
							placeholder="Category Name"
							type="text"
							className="light"
							value={name}
						/>

						<Button
							variant="contained"
							color="primary"
							type="submit"
							disabled={props.isSubmitting}
							sx={{margin: `20px`}}
						>
							Update
						</Button>

						<Link to="/admin" relative="path" className="back-button">
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
