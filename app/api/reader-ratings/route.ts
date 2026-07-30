import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
const BASE = (process.env.NEXT_PUBLIC_STRAPI_URL || 'https://strapi.fxnstudio.com').replace(/\/$/, '');
const TOKEN = process.env.STRAPI_API_TOKEN;

export async function POST(req: Request) {
  if (!TOKEN) return NextResponse.json({ ok: false, error: 'Rating service is not configured.' }, { status: 503 });
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 }); }
  if (typeof body.website === 'string' && body.website.length > 0) return NextResponse.json({ ok: true });
  const postId = body.postId;
  const authorName = String(body.authorName || '').trim();
  const email = String(body.email || '').trim();
  const text = String(body.body || '').trim();
  const rating = Number(body.rating || 0);
  if (!postId || !authorName || !email || !text || !Number.isInteger(rating) || rating < 1 || rating > 5) return NextResponse.json({ ok: false, error: 'Name, email, rating, and comment are required.' }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ ok: false, error: 'Please enter a valid email address.' }, { status: 400 });
  if (authorName.length > 80 || text.length > 4000) return NextResponse.json({ ok: false, error: 'One or more fields exceed the allowed length.' }, { status: 400 });
  const userAgent = (req.headers.get('x-forwarded-for') || 'unknown') + ' | ' + (req.headers.get('user-agent') || '');
  const res = await fetch(BASE + '/api/nxtsmart-comments', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + TOKEN }, body: JSON.stringify({ data: { post: postId, authorName, email, body: text, rating, commentStatus: 'pending', postedAt: new Date().toISOString(), source: 'reader-submitted', userAgent } }) });
  if (!res.ok) return NextResponse.json({ ok: false, error: 'Could not submit your rating.' }, { status: 502 });
  return NextResponse.json({ ok: true });
}
