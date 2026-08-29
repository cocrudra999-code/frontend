import axios from 'axios';

const API_BASE = '/api/seo';

/**
 * Generate SEO from a YouTube URL.
 */
export async function generateYouTubeSEO(url) {
  const response = await axios.post(`${API_BASE}/youtube`, { url });
  return response.data;
}

/**
 * Generate SEO from a video script.
 */
export async function generateScriptSEO(script) {
  const response = await axios.post(`${API_BASE}/script`, { script });
  return response.data;
}
