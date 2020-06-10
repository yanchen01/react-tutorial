import React, { Component, Children } from 'react';

import './App.css';

import Person from '../components/Persons/Person/Person';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

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
				<Persons
					persons={this.state.persons}
					clicked={this.deletePersonHandler}
					changed={this.nameChangeHandler}
				/>
			);
		}

		return (
			<div className="App">
				<Cockpit
					personsLength={this.state.persons.length}
					showPersons={this.state.showPersons}
					clicked={this.togglePersonHandler}
				/>
				{persons}
			</div>
		);
	}
}

export default App;
