import {NextRequest, NextResponse} from "next/server";
import apiClient from "../../lib/axiosConfig";
import type {SendQueryResponse, FileAttachment} from "../../types/query";

export const SendQuery = async (query: string, files?: FileAttachment[]): Promise<SendQueryResponse> => {
	try {
		// If files are present, create FormData for multipart upload
		if (files && files.length > 0) {
			const formData = new FormData();
			formData.append("query", query);
			
			// Add files to FormData
			files.forEach((fileAttachment, index) => {
				if (fileAttachment.file) {
					formData.append(`files`, fileAttachment.file);
				}
			});

			const response = await apiClient.post("/api/v1/query", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			return response.data;
		} else {
			// Regular text-only query
			const response = await apiClient.post("/api/v1/query", {
				query: query,
			});
			return response.data;
		}
	} catch (error: any) {
		console.error("SendQuery error:", error);
		throw error;
	}
};
