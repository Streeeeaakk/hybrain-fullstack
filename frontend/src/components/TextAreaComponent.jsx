import {Field} from "formik"
import InputLabel from "@mui/material/InputLabel"
import FormControl from "@mui/material/FormControl"
import FormHelperText from "@mui/material/FormHelperText"

export default function TextAreaComponent(props) {
	return (
		<Field name={props.name} as="textarea">
			{({field, form, meta}) => (
				<div className="form-group">
					<FormControl fullWidth error={meta.touched && meta.error ? true : false}>
						<textarea
							className="form-control"
							id={props.name}
							{...field}
							error={meta.touched && meta.error ? true : false}
							helperText={meta.touched && meta.error ? meta.error : null}
						></textarea>

						{meta.touched && meta.error ? <FormHelperText>{meta.error}</FormHelperText> : null}
					</FormControl>
				</div>
			)}
		</Field>
	)
}
