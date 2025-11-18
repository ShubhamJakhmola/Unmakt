import type { Handler } from '@netlify/functions';
import { requireAuth } from './utils/auth';
import { handleOptions, jsonResponse } from './utils/http';

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return handleOptions();
  if (event.httpMethod !== 'GET') {
    return jsonResponse(405, { error: 'Method not allowed' });
  }

  const claims = requireAuth(event);

  if (!claims) {
    return jsonResponse(401, { error: 'Unauthorized' });
  }

  return jsonResponse(200, { user: claims });
};

