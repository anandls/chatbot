import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
	html {
		font-size: 10px;
		box-sizing: border-box;
	}

	*, *:before, *:after {
		padding: 0;
		margin: 0;
		box-sizing: inherit;
	}

  *:focus {
    outline: none;
  }

	body {
		font-family: ${props => props.theme.baseFont}, sans-serif;
		font-size: 1.5em;
		line-height: 1.6;
		color: ${props => props.theme.primaryTxtColor};
	  background: hsl(210, 36%, 96%);
	}

	h1, h2, h3, h4, h5, h6 {
		font-family: ${props => props.theme.headingFont}, sans-serif;
		font-weight: normal;
		margin: 1rem 0;
	}

	p {
		margin: 1rem 0;
	}

	a {
		text-decoration: none;
		color: inherit;
	}

	button {
		font-family: ${props => props.theme.buttonFont}, sans-serif;
	}

	ul {
		list-style: none;
	}

	@media (max-width: 500px) {
		body {
			font-size: 1.4em;
	  }
	}
`;

export default GlobalStyles;
