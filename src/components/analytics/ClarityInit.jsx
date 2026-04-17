"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

export default function ClarityInit({ projectId }) {
	useEffect(() => {
		if (typeof window !== "undefined") {
			Clarity.init(projectId);
		}
	}, [projectId]);

	return null;
}
