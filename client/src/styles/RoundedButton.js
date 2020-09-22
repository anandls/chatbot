import styled from "styled-components";
import { motion } from 'framer-motion';

const RoundedButton = styled(motion.button)`
	display: inline-block;
	padding: 1em 2em;
	margin: 1.2em 0;
	font-weight: bold;
	letter-spacing: 0.2em;
	border-radius: 100px;
	border: none;
	text-transform: uppercase;
	cursor: pointer;
`;

export default RoundedButton;
