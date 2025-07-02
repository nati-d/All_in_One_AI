import {NextRequest, NextResponse} from "next/server";
import apiClient from "../../lib/axiosConfig";
import type {SendQueryResponse} from "../../types/query";

export const SendQuery = async (query: string): Promise<SendQueryResponse> => {
	const response = await apiClient.post("/api/v1/query", {
		query: query,
	});
	return response.data;
};
