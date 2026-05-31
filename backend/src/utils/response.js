/**
 * Response Utilities for Cloudflare Workers
 * 
 * Provides standardized response helpers with CORS support.
 * All API responses should use these helpers for consistency.
 */

/**
 * Generate CORS headers for cross-origin requests
 * Allows requests from any origin (configure for production)
 * @param {Request} request - Incoming request (optional, for dynamic origin)
 * @returns {object} Headers object with CORS headers
 */
export function corsHeaders(request = null) {
  const origin = request?.headers?.get('Origin') || '*';
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };
}

/**
 * Create a JSON success response with CORS headers
 * @param {object} data - Response body data
 * @param {number} status - HTTP status code (default: 200)
 * @param {Request} request - Original request for CORS origin
 * @returns {Response} Cloudflare Workers Response object
 */
export function jsonResponse(data, status = 200, request = null) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders(request),
    },
  });
}

/**
 * Create a JSON error response with CORS headers
 * @param {string} message - Error message
 * @param {number} status - HTTP status code (default: 400)
 * @param {Request} request - Original request for CORS origin
 * @returns {Response} Cloudflare Workers Response object
 */
export function errorResponse(message, status = 400, request = null) {
  return new Response(
    JSON.stringify({
      success: false,
      error: message,
    }),
    {
      status,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders(request),
      },
    }
  );
}
