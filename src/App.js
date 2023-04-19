import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyOrder from "./pages/MyOrder";
import ErrorPage from "./pages/ErrorPage";
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
