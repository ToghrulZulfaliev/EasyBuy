import { createSlice } from '@reduxjs/toolkit';

export const getLocalStorageItems = () => {
    try {
        const userId = JSON.parse(localStorage.getItem('user'))?.email;
        console.log(userId);


        if (!userId) {
            const cartItems = localStorage.getItem(`cartItems_guest`);
            return cartItems ? JSON.parse(cartItems) : [];
        }
        else {
            const cartItems = localStorage.getItem(`cartItems_${userId}`);
            return cartItems ? JSON.parse(cartItems) : [];
        }

    } catch (error) {
        console.error('Error loading cart:', error);
        return [];
    }
};

export const getGuestItems = () => {
    const cartItems = localStorage.getItem(`cartItems_guest`);
    return cartItems ? JSON.parse(cartItems) : [];
};

export const getUserItems = (userId) => {
    const cartItems = localStorage.getItem(`cartItems_${userId}`);
    return cartItems ? JSON.parse(cartItems) : [];
};

const calculateTotals = (items) => {
    return items.reduce((totals, item) => ({
        quantity: totals.quantity + item.qty,
        amount: totals.amount + (item.price * item.qty)
    }), { quantity: 0, amount: 0 });
};

const initialState = {
    cartItems: getLocalStorageItems(),
    totalAmount: calculateTotals(getLocalStorageItems()).amount,
    totalQuantity: calculateTotals(getLocalStorageItems()).quantity,
    shipping: 30.0
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(item => item.id === newItem.id);

            if (existingItem) {
                existingItem.qty += 1;
            } else {
                state.cartItems.push({
                    ...newItem,
                    qty: 1
                });
            }

            const totals = calculateTotals(state.cartItems);
            state.totalQuantity = totals.quantity;
            state.totalAmount = totals.amount;

            const userId = JSON.parse(localStorage.getItem('user'))?.email;
            if (userId) {
                localStorage.setItem(`cartItems_${userId}`, JSON.stringify(state.cartItems));
            } else {
                localStorage.setItem(`cartItems_guest`, JSON.stringify(state.cartItems));
            }
        },

        removeFromCart: (state, action) => {
            const id = action.payload.id;
            const existingItem = state.cartItems.find(item => item.id === id);

            if (existingItem.qty === 1) {
                state.cartItems = state.cartItems.filter(item => item.id !== id);
            } else {
                existingItem.qty -= 1;
            }

            const totals = calculateTotals(state.cartItems);
            state.totalQuantity = totals.quantity;
            state.totalAmount = totals.amount;

            const userId = JSON.parse(localStorage.getItem('user'))?.email;
            if (userId) {
                localStorage.setItem(`cartItems_${userId}`, JSON.stringify(state.cartItems));
            }
        },

        clearCart: (state) => {
            state.cartItems = [];
            state.totalAmount = 0;
            state.totalQuantity = 0;

            const userId = JSON.parse(localStorage.getItem('user'))?.email;
            if (userId) {
                localStorage.removeItem(`cartItems_${userId}`);
            }
        },
        setToCard: (state, action) => {
            state.cartItems = action.payload;
            console.log(calculateTotals(state.cartItems), state.cartItems);

            const totals = calculateTotals(state.cartItems);
            state.totalQuantity = totals.quantity;
            state.totalAmount = totals.amount;

        }
    }
});

export const { addToCart, removeFromCart, clearCart, setToCard } = cartSlice.actions;
export default cartSlice.reducer;