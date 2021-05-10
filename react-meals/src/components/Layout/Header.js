import React, { Fragment } from 'react';
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';

const Header = () => {
	return (
		<Fragment>
			<header className={classes.header}>
				<div>
					<h1>ReactMeals</h1>
					<button>Cart</button>
				</div>
			</header>
			<div>
				<img src={mealsImage} alt="A table full of delicious food!" />
			</div>
		</Fragment>
	);
};

export default Header;
