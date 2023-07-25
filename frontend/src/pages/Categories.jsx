import React from "react"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import {Button, styled} from "@mui/material"
import {useState, useEffect} from "react"
import {Link, useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {useCategoriesQuery} from "../slices/categroyApiSlice"
import {useDeleteCategoryMutation} from "../slices/categroyApiSlice"
import {toast} from "react-toastify"
import {Loader} from "../components/Loader"

const TableRowStyled = styled(TableRow)`
	&:nth-of-type(odd) {
		background-color: lightgray;
	}
	&:nth-of-type(even) {
	}
	& > td {
		color: black;
	}
`

export default function Categories() {
	const [open, setOpen] = useState(false)

	const handleClickOpen = (name) => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const navigate = useNavigate()
	const dispatch = useDispatch()
	const categQuery = useCategoriesQuery()

	const {data: categories, isFetching, isLoading} = categQuery

	const [deleteCategoryItem, {data, error, isSuccess}] = useDeleteCategoryMutation()

	let tableData = null
	let categLength = null

	if (!isLoading && !isFetching) {
		categLength = categories.length
		tableData = categories.map((data) => {
			return (
				<TableRowStyled key={data._id} sx={{"&:last-child td, &:last-child th": {border: 0}}}>
					{isLoading && isFetching ? <Loader /> : null}
					<TableCell component="th" scope="row">
						{data.name}
					</TableCell>
					<TableCell align="right">
						<Link to={`updateCategory/${data._id}/${data.name}`}>
							<Button>Update</Button>
						</Link>
					</TableCell>
					<TableCell align="right">
						<Button
							onClick={async () => {
								try {
									const res = await deleteCategoryItem({id: data._id}).unwrap()
									categQuery.refetch()
									toast.success("Category Successfuly Deleted")
									navigate("/")
								} catch (err) {
									toast.error(err?.data?.message || err.error)
								}
							}}
						>
							Delete
						</Button>
					</TableCell>
				</TableRowStyled>
			)
		})
	}

	return (
		<>
			<h1>Categories</h1>
			<Link to="addCategory">
				<Button> Add new Category </Button>
			</Link>

			<Paper sx={{width: "100%", overflow: "hidden"}}>
				<TableContainer sx={{maxHeight: 440}}>
					<Table sx={{minWidth: 650}} aria-label="sticky table" stickyHeader>
						<TableHead>
							<TableRow>
								<TableCell sx={{fontWeight: `bold`}}>Name</TableCell>
								<TableCell align="right" />
								<TableCell align="right" />
							</TableRow>
						</TableHead>
						{isLoading ? null : <TableBody>{tableData}</TableBody>}

						{isLoading && <Loader />}
					</Table>
				</TableContainer>
			</Paper>
		</>
	)
}
