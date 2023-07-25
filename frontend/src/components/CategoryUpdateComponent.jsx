import {Field} from "formik"
import TextField from "@mui/material/TextField"

export default function CategoryInputComponent(props) {
	return (
		<div className="input--con">
			<Field name={props.name}>
				{({field, meta}) => (
					<div>
						<TextField
							type={props.type}
							id="outlined-required"
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
