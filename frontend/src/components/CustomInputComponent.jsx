import {Field} from "formik"
import TextField from "@mui/material/TextField"
import {InputLabel} from "@mui/material"

export default function CustomInputComponent(props) {
	return (
		<div className="input--con">
			<Field name={props.name}>
				{({field, meta}) => (
					<div>
						<TextField
							type={props.type}
							id={props.name}
							label={props.placeholder}
							{...field}
							placeholder={props.placeholder}
							error={meta.touched && meta.error ? true : false}
							helperText={meta.touched && meta.error ? meta.error : null}
						/>
					</div>
				)}
			</Field>
		</div>
	)
}
