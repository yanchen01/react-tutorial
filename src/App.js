import React, { Component, Children } from 'react';
import styled from 'styled-components';

import './App.css';

import Person from './Person/Person';

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

class App extends Component {
	state = {
		persons: [
			{
				id: 'a1',
				name: 'Max',
				age: 28
			},
			{
				id: 'a2',
				name: 'Manu',
				age: 29
			},
			{
				id: 'a3',
				name: 'Chen',
				age: 19
			}
		],
		otherState: 'some other value',
		showPersons: false
	};

	nameChangeHandler = (event, id) => {
		// find the person and change its name
		const personIndex = this.state.persons.findIndex((p) => {
			return p.id === id;
		});
		const person = { ...this.state.persons[personIndex] };
		person.name = event.target.value;

		// update
		const persons = [ ...this.state.persons ];
		persons[personIndex] = person;

		this.setState({ persons: persons });
	};

	togglePersonHandler = () => {
		this.setState({ showPersons: !this.state.showPersons });
	};

	deletePersonHandler = (index) => {
		const persons = [ ...this.state.persons ];
		persons.splice(index, 1);
		this.setState({ persons: persons });
	};

	render() {
		let persons = null;

		if (this.state.showPersons) {
			persons = (
				<div>
					{this.state.persons.map((person, index) => {
						return (
							<Person
								name={person.name}
								age={person.age}
								click={() => this.deletePersonHandler(index)}
								key={person.id}
								changed={(event) => this.nameChangeHandler(event, person.id)}
							/>
						);
					})}
				</div>
			);
		}

		const classes = [];
		if (this.state.persons.length <= 2) {
			classes.push('red');
		}
		if (this.state.persons.length <= 1) {
			classes.push('bold');
		}

		return (
			<div className="App">
				<h1>Hi, I'm a React App</h1>
				<p className={classes.join(' ')}>This is really working!</p>
				<StyledButton alt={this.state.showPersons} onClick={this.togglePersonHandler}>
					Toggle Persons
				</StyledButton>
				{persons}
			</div>
		);
	}
}

export default App;
