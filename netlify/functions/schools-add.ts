import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function handler(event: any) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { Allow: 'POST' },
      body: 'Method Not Allowed'
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const country = typeof body.country === 'string' ? body.country.trim() : null;
    const city = typeof body.city === 'string' ? body.city.trim() : null;

    if (!name) {
      return {
        statusCode: 400,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ error: 'name is required' }),
      };
    }

    if (name.length > 200) {
      return {
        statusCode: 400,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ error: 'name too long (max 200 chars)' }),
      };
    }

    const rows = await sql`
      insert into schools (name, country, city)
      values (${name}, ${country}, ${city})
      returning id, name, country, city, created_at
    `;

    return {
      statusCode: 201,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(rows[0]),
    };
  } catch (e: any) {
    return {
      statusCode: 500,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ error: e.message }),
    };
  }
}