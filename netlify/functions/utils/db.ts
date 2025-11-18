import { neon } from '@netlify/neon';

export const getSqlClient = () => {
  if (!process.env.NETLIFY_DATABASE_URL) {
    throw new Error('NETLIFY_DATABASE_URL is not configured');
  }

  return neon(process.env.NETLIFY_DATABASE_URL);
};

