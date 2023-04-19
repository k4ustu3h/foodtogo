import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import MyOrder from "./screens/MyOrder";
import ErrorPage from "./screens/ErrorPage";
import SignUp from "./screens/SignUp";
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
		path: "/myorder",
		element: <MyOrder />,
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
