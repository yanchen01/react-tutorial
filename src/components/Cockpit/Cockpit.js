import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
	background-color: ${(props) => (props.alt ? 'red' : 'green')};
	color: white;
	font: inherit;
	border: 1px solid blue;
	padding: 8px;
	cursor: pointer;

	&:hover {
		background-color: ${(props) => (props.alt ? 'salmon' : 'lightgreen')};
		color: black;
	}
`;

const cockpit = (props) => {
	const classes = [];
	if (props.personsLength <= 2) {
		classes.push('red');
	}
	if (props.personsLength <= 1) {
		classes.push('bold');
	}

	return (
		<div>
			<h1>Hi, I'm a React App</h1>
			<p className={classes.join(' ')}>This is really working!</p>
			<StyledButton alt={props.showPersons} onClick={props.clicked}>
				Toggle Persons
			</StyledButton>
		</div>
	);
};

export default cockpit;
