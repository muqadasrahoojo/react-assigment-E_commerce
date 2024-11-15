import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';
import ErrorPage from './components/error-page/ErrorPage';
import App from './App';
import SignIn from './components/auth/sign-in/SignIn';
import SignUp from './components/auth/sign-up/SignUp';
import ProductDetails from './components/product-details/ProductDetails';
import Layout from './components/layout/Layout';
import { Provider } from 'react-redux';
import { store } from './store';

const router = createBrowserRouter([
  {
    path: "/",
    element: < Layout />,
    children: [
      {
        path: "",
        element: < App /> 
      },
      {
        path: "product-details/:product_Id",
        element: <ProductDetails />
      }
    ],
    errorElement: < ErrorPage />
  },
  {
    path: "/sign-in",
    element: < SignIn />
  },
  {
    path: "/sign-up",
    element: < SignUp />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

 <Provider store={store}>
   <RouterProvider router={router} />
 </Provider>

);

