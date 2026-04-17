import dynamic from "next/dynamic";

const Home = dynamic(() => import("@/components/pages/Home"));

export default function Page() {
	return <Home />;
}
