import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyOrders from "./pages/MyOrders";
import SignUp from "./pages/SignUp";
import { CartProvider } from "./components/ContextReducer";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/myorders",
		element: <MyOrders />,
	},
	{
		path: "/signup",
		element: <SignUp />,
	},
]);

function App() {
	return (
		<CartProvider>
			<RouterProvider router={router} />
		</CartProvider>
	);
}

export default App;
