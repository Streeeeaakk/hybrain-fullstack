import * as Yup from "yup"
import {Button} from "@mui/material"
import {Form, Formik} from "formik"
import ItemInputComponent from "../../components/ItemInputComponent.jsx"
import {Link, useNavigate} from "react-router-dom"
import {Loader} from "../../components/Loader.jsx"
import SelectComponent from "../../components/SelectComponent.jsx"
import TextAreaComponent from "../../components/TextAreaComponent.jsx"
import {toast} from "react-toastify"
import {useDispatch} from "react-redux"
import {useCategoriesQuery} from "../../slices/categroyApiSlice.js"
import {useItemsQuery} from "../../slices/itemsApiSlice.js"
import {useAddItemMutation} from "../../slices/itemsApiSlice.js"

export default function ItemInput() {
	const navigate = useNavigate()

	const categQuery = useCategoriesQuery()

	const itemsQuery = useItemsQuery()

	const {data: categories, isFetching, isLoading} = categQuery

	const [addItem, {data, error, isSuccess}] = useAddItemMutation()

	let selectData = null

	if (!isLoading && !isFetching) {
		selectData = categories.map((data) => {
			return {
				text: data.name,
				value: data.name,
			}
		})
	}

	const initialValues = {
		name: "",
		price: "",
		quantity: "",
		category: "",
		description: "",
	}

	const validationSchema = Yup.object({
		name: Yup.string().required("Required Name"),
		price: Yup.number().required("Required Price"),
		quantity: Yup.number().required("Required Quantity"),
		category: Yup.string().required("Required Category"),
		description: Yup.string().required("Required Description"),
	})

	const handleSubmit = async (values, actions) => {
		if (values.name === "") {
			toast.error("Please enter a name")
			return
		} else {
			try {
				const res = await addItem(values).unwrap()
				itemsQuery.refetch()
				navigate("..")
				toast.success(`Item Added ${values.name}`)
			} catch (err) {
				toast.error(err?.data?.message || err.error)
			}
		}
	}

	return (
		<div>
			{!isLoading ? (
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{(props) => (
						<Form sx={{margin: `10px`}}>
							<ItemInputComponent name="name" placeholder="Name" type="text" className="light" />

							<ItemInputComponent
								name="price"
								placeholder="Price"
								type="number"
								className="light"
							/>

							<ItemInputComponent
								name="quantity"
								placeholder="Quantity"
								type="number"
								className="light"
							/>

							<SelectComponent name="category" label="Category" data={selectData} />

							<TextAreaComponent name="description" label="Description" />

							<Button
								variant="contained"
								color="primary"
								type="submit"
								disabled={props.isSubmitting}
								sx={{margin: `20px`}}
							>
								Submit
							</Button>

							<Link to=".." relative="path" className="back-button">
								<Button variant="contained" color="primary" type="button">
									Cancel
								</Button>
							</Link>
						</Form>
					)}
				</Formik>
			) : (
				<Loader />
			)}
		</div>
	)
}
