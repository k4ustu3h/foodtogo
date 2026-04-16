import dynamic from "next/dynamic";

const SignUp = dynamic(() => import("../../components/pages/SignUp"));

export default function Page() {
	return <SignUp />;
}
