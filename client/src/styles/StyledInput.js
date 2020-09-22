import styled from "styled-components";

const StyledInput = styled.input`
	padding: 1em 1em;
	margin: 0.6em 0 1em 0;
	font-family: ${props => props.theme.buttonFont}, sans-serif;
	border: none;
	letter-spacing: 0.1em;
	font-size: 1em;
	width: 24em;

	@media (max-width: 512px) {
		width: 22em;
	}

	@media (max-width: 400px) {
		width: 19em;
	}
`;

export default StyledInput;
