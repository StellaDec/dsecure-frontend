import api from "../utils/apiClient";

export interface EnhancedUpdateResponse {
  version_id: number;
  version_number: string;
  changelog: string;
  download_link: string;
  release_date: string;
  is_mandatory_update: boolean;
  is_newer_version: boolean;
  current_version_provided: string | null;
}

/**
 * Fetches the latest version and download URL from the backend.
 * API Endpoint: GET /api/EnhancedUpdates/latest
 */
export const fetchLatestUpdate = async (productCode: string): Promise<EnhancedUpdateResponse | null> => {
  if (!productCode) return null;
  try {
    const endpoint = `/api/EnhancedUpdates/product/${productCode}/latest`;
      
    const response = await api.get<EnhancedUpdateResponse>(endpoint);
    // Agar successful response aaya (chahe encrypted ho ya plain JSON)
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch latest app updates for ${productCode}:`, error);
    return null;
  }
};
