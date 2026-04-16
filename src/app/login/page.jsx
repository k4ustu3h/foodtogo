import dynamic from "next/dynamic";

const Login = dynamic(() => import("../../components/pages/Login"));

export default function Page() {
	return <Login />;
}
