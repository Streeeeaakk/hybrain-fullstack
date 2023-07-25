import {Field} from "formik"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import InputLabel from "@mui/material/InputLabel"
import FormControl from "@mui/material/FormControl"
import FormHelperText from "@mui/material/FormHelperText"

export default function SelectComponent(props) {
	return (
		<Field name={props.name}>
			{({field, meta}) => (
				<div className="select--con">
					<FormControl fullWidth error={meta.touched && meta.error ? true : false}>
						<InputLabel id="demo-simple-select-helper-label">{props.label}</InputLabel>
						<Select
							{...field}
							labelId="demo-simple-select-helper-label"
							id="demo-simple-select-helper-label"
							autoWidth
							label={props.label}
						>
							<MenuItem value="">
								<em>Select Category</em>
							</MenuItem>

							{props.data.map((item, index) => (
								<MenuItem key={index} value={item.value}>
									{item.text}
								</MenuItem>
							))}
						</Select>
						{meta.touched && meta.error ? <FormHelperText>{meta.error}</FormHelperText> : null}
					</FormControl>
				</div>
			)}
		</Field>
	)
}
