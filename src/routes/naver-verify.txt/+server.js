// Naver verification file endpoint (prerender-safe)
import { PUBLIC_NAVER_SITE_VERIFICATION } from '$env/static/public';

/** @type {import('./$types').RequestHandler} */
export function GET() {
	const verificationCode = PUBLIC_NAVER_SITE_VERIFICATION;
	
	if (!verificationCode) {
		return new Response('Verification code not configured', { status: 404 });
	}
	
	return new Response(verificationCode, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=86400'
		}
	});
}
