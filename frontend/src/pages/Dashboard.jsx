import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import {styled} from "@mui/material"
import {Loader} from "../components/Loader"
import {useItemsQuery} from "../slices/itemsApiSlice"

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

export default function Dashboard() {
	const itemsQuery = useItemsQuery()

	const {data: items, isFetching, isLoading} = itemsQuery

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
				</TableRowStyled>
			)
		})
	}

	return (
		<>
			<h1>List of Items</h1>
			<Paper sx={{width: "100%", overflow: "hidden"}}>
				<TableContainer sx={{maxHeight: 440, textAlign: "center"}}>
					<Table sx={{minWidth: 650}} aria-label="sticky table" stickyHeader>
						<TableHead>
							<TableRow>
								<TableCell sx={{fontWeight: `bold`}}>Name</TableCell>
								<TableCell sx={{fontWeight: `bold`}}>Price</TableCell>
								<TableCell sx={{fontWeight: `bold`}}>Quantity</TableCell>
								<TableCell sx={{fontWeight: `bold`}}>Category</TableCell>
								<TableCell sx={{fontWeight: `bold`, width: `500px`}}>Description</TableCell>
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
