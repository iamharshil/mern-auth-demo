import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function Private() {
	const router = useRouter();
	const [showContent, setShowContent] = useState(false);
	async function verifyToken() {
		await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
			mode: "cors",
			credentials: "include",
		})
			.then((row) => row.json())
			.then((res) => {
				if (!res.success) {
					toast.error(res.message);
					return router.push("/login");
				}
				setShowContent(true);
			});
	}

	useEffect(() => {
		verifyToken();
	}, []);

	if (showContent) return <div>Private page</div>;
}
