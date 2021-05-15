import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
	const [ isBtnHighlighted, setIsBtnHighlighted ] = useState(false);
	const cartCtx = useContext(CartContext);

	const numberOfCartItems = cartCtx.items.reduce((sum, item) => {
		return sum + item.amount;
	}, 0);

	const btnClasses = `${classes.button} ${isBtnHighlighted ? classes.bump : ''}`;

	const { items } = cartCtx;

	useEffect(
		() => {
			if (items.length === 0) {
				return;
			}
			setIsBtnHighlighted(true);
			const timer = setTimeout(() => {
				setIsBtnHighlighted(false);
			}, 300);

			return () => {
				clearTimeout(timer);
			};
		},
		[ items ]
	);

	return (
		<button className={btnClasses} onClick={props.onClick}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={classes.badge}>{numberOfCartItems}</span>
		</button>
	);
};

export default HeaderCartButton;
