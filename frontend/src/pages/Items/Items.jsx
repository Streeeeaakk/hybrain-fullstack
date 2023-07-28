import React from "react"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import {Button, styled} from "@mui/material"
import {Link, useNavigate} from "react-router-dom"
import {toast} from "react-toastify"
import {Loader} from "../../components/Loader"
import {useItemsQuery, useDeleteItemMutation} from "../../slices/itemsApiSlice"

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

export default function Items() {
	const navigate = useNavigate()

	const itemsQuery = useItemsQuery()

	const {data: items, isFetching, isLoading} = itemsQuery

	const [deleteItem, {data, error, isSuccess}] = useDeleteItemMutation()

	let tableData = null

	if (!isLoading && !isFetching) {
		tableData = items.map((data) => {
			return (
				<TableRowStyled key={data._id} sx={{"&:last-child td, &:last-child th": {border: 0}}}>
					{isLoading && isFetching ? <Loader /> : null}

					<TableCell component="th" scope="row">
						{data.name}
					</TableCell>

					<TableCell component="th" scope="row">
						{data.price}
					</TableCell>

					<TableCell component="th" scope="row">
						{data.quantity}
					</TableCell>

					<TableCell component="th" scope="row">
						{data.category}
					</TableCell>

					<TableCell component="th" scope="row">
						{data.description}
					</TableCell>
					<TableCell align="right">
						<Link
							to={`updateItem/${data._id}/${data.name}/${data.price}/${data.quantity}/${data.category}/${data.description}`}
						>
							<Button>Update</Button>
						</Link>
					</TableCell>

					<TableCell align="right">
						<Button
							onClick={async () => {
								try {
									const res = await deleteItem({id: data._id}).unwrap()
									itemsQuery.refetch()
									toast.success(`Item ${data.name} Successfuly Deleted`)
									navigate("/admin/items")
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
			<h1>Items</h1>

			<Link to="addItem">
				<Button> Add new Item </Button>
			</Link>

			<Paper sx={{width: "100%", overflow: "hidden"}}>
				<TableContainer sx={{maxHeight: 440}}>
					<Table sx={{minWidth: 650}} aria-label="sticky table" stickyHeader>
						<TableHead>
							<TableRow>
								<TableCell sx={{fontWeight: `bold`}}>Name</TableCell>
								<TableCell sx={{fontWeight: `bold`}}>Price</TableCell>
								<TableCell sx={{fontWeight: `bold`}}>Quantity</TableCell>
								<TableCell sx={{fontWeight: `bold`}}>Category</TableCell>
								<TableCell sx={{fontWeight: `bold`, width: `500px`}}>Description</TableCell>
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
