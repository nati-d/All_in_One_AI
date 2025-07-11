/**
 * Extracts a user-friendly error message from various error response formats
 */
export function extractErrorMessage(error: any): string {
	let errorMessage = "An error occurred while processing your request.";

	if (error.response?.data?.detail) {
		// Extract msg from detail array
		const details = error.response.data.detail;
		if (Array.isArray(details) && details.length > 0) {
			// Get all msg values from the detail array
			const messages = details.map((detail: any) => detail.msg).filter(Boolean);
			errorMessage = messages.join(", ");
		} else if (typeof details === "string") {
			errorMessage = details;
		}
	} else if (error.response?.data?.message) {
		// Backend returned a specific error message
		errorMessage = error.response.data.message;
	} else if (error.response?.data) {
		// Use the entire response data if no specific message field
		errorMessage = JSON.stringify(error.response.data, null, 2);
	} else if (error.message) {
		// Network or other error
		errorMessage = error.message;
	}

	return errorMessage;
} 