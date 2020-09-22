import styled from "styled-components";

const StyledHeading = styled.h1`
	text-transform: uppercase;
	letter-spacing: 0.1em;
	margin-bottom: 0.6em;

	span {
		border-bottom: 4px solid ${props => props.theme.violet};
	}
`;

export default StyledHeading;
