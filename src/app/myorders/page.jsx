import dynamic from "next/dynamic";

const MyOrders = dynamic(() => import("../../components/pages/MyOrders"));

export default function Page() {
	return <MyOrders />;
}
