import { NextResponse } from 'next/server'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const sanitizeText = (value) => (typeof value === 'string' ? value.trim() : '')

export async function POST(request) {
    let payload

    try {
        payload = await request.json()
    } catch {
        return NextResponse.json(
            { ok: false, error: 'Solicitud invalida.' },
            { status: 400 }
        )
    }

    const data = {
        name: sanitizeText(payload?.name),
        email: sanitizeText(payload?.email),
        business: sanitizeText(payload?.business),
        phone: sanitizeText(payload?.phone),
        message: sanitizeText(payload?.message),
        website: sanitizeText(payload?.website)
    }

    // Honeypot filled: treat as successful request and do not process it.
    if (data.website) {
        return NextResponse.json({ ok: true, message: 'Mensaje recibido.' })
    }

    if (!data.name || !data.email || !data.message) {
        return NextResponse.json(
            { ok: false, error: 'Completa nombre, email y mensaje.' },
            { status: 400 }
        )
    }

    if (!emailPattern.test(data.email)) {
        return NextResponse.json(
            { ok: false, error: 'Email invalido.' },
            { status: 400 }
        )
    }

    const webhookUrl = process.env.CONTACT_FORM_WEBHOOK_URL

    if (webhookUrl) {
        try {
            const webhookResponse = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    source: 'welyd-contact-form',
                    submittedAt: new Date().toISOString(),
                    ...data
                }),
                cache: 'no-store'
            })

            if (!webhookResponse.ok) {
                return NextResponse.json(
                    { ok: false, error: 'No pudimos enviar tu mensaje. Intentalo de nuevo.' },
                    { status: 502 }
                )
            }
        } catch {
            return NextResponse.json(
                { ok: false, error: 'No pudimos enviar tu mensaje. Intentalo de nuevo.' },
                { status: 502 }
            )
        }
    } else {
        console.info('[contact-form] webhook not configured, message received:', data)
    }

    return NextResponse.json({
        ok: true,
        message: 'Mensaje enviado. Te responderemos pronto.'
    })
}
