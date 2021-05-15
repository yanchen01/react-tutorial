import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
	items: [],
	totalAmount: 0
};

const cartReducer = (state, action) => {
	let existingCartItemIdx;
	let existingCartItem;
	let updatedTotalAmount;
	let updatedItems;

	switch (action.type) {
		case 'ADD':
			updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

			existingCartItemIdx = state.items.findIndex((item) => item.id === action.item.id);
			existingCartItem = state.items[existingCartItemIdx];

			if (existingCartItem) {
				const updatedItem = {
					...existingCartItem,
					amount: existingCartItem.amount + action.item.amount
				};

				updatedItems = [ ...state.items ];
				updatedItems[existingCartItemIdx] = updatedItem;
			} else {
				updatedItems = state.items.concat(action.item);
			}

			return { items: updatedItems, totalAmount: updatedTotalAmount };

		case 'REMOVE':
			existingCartItemIdx = state.items.findIndex((item) => item.id === action.id);
			existingCartItem = state.items[existingCartItemIdx];
			updatedTotalAmount = state.totalAmount - existingCartItem.price;

			if (existingCartItem.amount === 1) {
				updatedItems = state.items.filter((item) => item.id !== action.id);
			} else {
				const updatedItem = { ...existingCartItem, amount: existingCartItem.amount - 1 };
				updatedItems = [ ...state.items ];
				updatedItems[existingCartItemIdx] = updatedItem;
			}

			return { items: updatedItems, totalAmount: updatedTotalAmount };
		default:
			break;
	}
	return defaultCartState;
};

const CartProvider = (props) => {
	const [ cartState, dispatchCartAction ] = useReducer(cartReducer, defaultCartState);

	const addItemToCartHandler = (item) => {
		dispatchCartAction({ type: 'ADD', item: item });
	};

	const removeItemFromCartHandler = (id) => {
		dispatchCartAction({ type: 'REMOVE', id: id });
	};

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler
	};

	return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
};

export default CartProvider;
