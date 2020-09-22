import React from "react";
import { useField } from "formik";
import ErrorMsg from '../styles/ErrorMsg';
import StyledInput from "../styles/StyledInput";

const TextInput = ({ ...props }) => {
	const [field, meta] = useField(props);

	return (
		<>
			{meta.touched && meta.error && <ErrorMsg>{meta.error}</ErrorMsg>}
			<StyledInput {...field} {...props} />
		</>
	);
};

export default TextInput;
