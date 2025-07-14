export type SendQueryResponse = {
	llm_used: string;
	response: string;
};

// File attachment types
export interface FileAttachment {
	id: string;
	name: string;
	type: string;
	size: number;
	url?: string;
	base64?: string;
	file?: File;
}

export interface SendQueryRequest {
	query: string;
	files?: FileAttachment[];
}

// Add interface for parsed Stability AI response
export interface StabilityAIResponse {
	finish_reason: string;
	seed: string;
	error: string | null;
	image_base64: string;
}

// Add interface for parsed ElevenLabs response
export interface ElevenLabsResponse {
	audio_base64: string;
}

// Helper function to check if response is from Stability AI
export function isStabilityResponse(llm_used: string): boolean {
	return llm_used === "stability";
}

// Helper function to check if response is from ElevenLabs
export function isElevenLabsResponse(llm_used: string): boolean {
	return llm_used === "elevenlabs";
}

// Helper function to parse Stability AI response
export function parseStabilityResponse(response: string): StabilityAIResponse | null {
	try {
		const parsed = JSON.parse(response);
		if (parsed && typeof parsed === 'object' && 'image_base64' in parsed) {
			return parsed as StabilityAIResponse;
		}
		return null;
	} catch (error) {
		console.error('Failed to parse Stability AI response:', error);
		return null;
	}
}

// Helper function to parse ElevenLabs response
export function parseElevenLabsResponse(response: string): ElevenLabsResponse | null {
	try {
		const parsed = JSON.parse(response);
		if (parsed && typeof parsed === 'object' && 'audio_base64' in parsed) {
			return parsed as ElevenLabsResponse;
		}
		return null;
	} catch (error) {
		console.error('Failed to parse ElevenLabs response:', error);
		return null;
	}
}
