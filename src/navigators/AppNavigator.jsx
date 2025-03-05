// React Router
import { Routes, Route } from 'react-router-dom';
// Components
import Layout from '../components/Layout/Layout';


// Pages
import HomePage from '../pages/HomePage';
import ProductsPage from '../pages/ProductsPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import CartPage from '../pages/CartPage';
import BuyPage from '../pages/BuyPage';
import { useEffect } from 'react';
import { GetFromLocalStorage } from '../utils/storages/LocalStorage';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/features/authSlice';
import { addToCart, getGuestItems, getLocalStorageItems, getUserItems, setToCard } from '../redux/features/CartSlice';


const AppNavigator = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        if (!user) {
            const items = getGuestItems();
            console.log({ items, user });
            dispatch(setToCard(items));
        } else {
            const items = getUserItems(user.email);
            console.log({ items, user });
            console.log({ items });

            dispatch(setToCard(items));
        }
    }, [user]);

    useEffect(() => {

        const checkUser = async () => {
            const access_token = GetFromLocalStorage('access_token');
            if (access_token) {
                const response = await fetch("https://ecommerce.ramil.dev/api/v2/get-user-by-access_token", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        access_token: access_token
                    }),
                })

                const data = await response.json();
                if (data.result) {
                    dispatch(setUser(data));
                }
            }
        }

        checkUser();

    }, [])



    return <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="product/:id" element={<BuyPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="cart" element={<CartPage />} />

            <Route path="*" element={
                <div className="container text-center py-5">
                    <h1>404 - Page Not Found</h1>
                    <p>The page you are looking for doesn't exist.</p>
                </div>
            } />
        </Route>
    </Routes>
}

export default AppNavigator;