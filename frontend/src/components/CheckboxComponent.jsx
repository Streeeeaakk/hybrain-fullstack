import {Field} from "formik"
import {Checkbox, FormControlLabel} from "@mui/material"
import {InputLabel} from "@mui/material"

export default function CheckboxComponent(props) {
	return (
		<div className="checkbox--con">
			<FormControlLabel
				control={
					<Checkbox
						checked={props.formik.values.check}
						onChange={props.formik.handleChange}
						name={props.name}
					/>
				}
				className="checkbox--text"
				label={props.label}
			/>
		</div>
	)
}
