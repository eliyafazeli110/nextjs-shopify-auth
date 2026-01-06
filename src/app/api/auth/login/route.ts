import { NextResponse } from "next/server"

export async function POST(request: Request) {
	try {
		const { token } = await request.json().catch(() => ({ token: "" }))

		const res = NextResponse.json({ ok: true })

		res.cookies.set({
			name: "phone-verify-token",
			value: String(token ?? ""),
			httpOnly: true,
			maxAge: 60 * 60 * 24, // 1 day
			path: "/",
			sameSite: "lax",
		})

		return res
	} catch (err) {
		return NextResponse.json(
			{ ok: false, err: "server error" },
			{ status: 500 }
		)
	}
}

export async function GET() {
	const res = NextResponse.json({ ok: true, message: "Cookie deleted" })
	res.cookies.delete("phone-verify-token")
	return res
}
