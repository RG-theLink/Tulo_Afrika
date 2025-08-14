import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function handler() {
  try {
    const rows = await sql`select 'ok' as status, now() as now`;
    return {
      statusCode: 200,
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