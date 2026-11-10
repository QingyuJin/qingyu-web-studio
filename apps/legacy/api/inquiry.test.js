import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

const mail = vi.hoisted(() => ({
  createTransport: vi.fn(),
  sendMail: vi.fn(),
}))

vi.mock("nodemailer", () => ({
  default: {
    createTransport: mail.createTransport,
  },
}))

import handler, { buildInquiryEmail } from "./inquiry.js"

const environmentKeys = [
  "SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "VITE_SUPABASE_URL",
  "VITE_SUPABASE_ANON_KEY",
  "GMAIL_USER",
  "GMAIL_APP_PASSWORD",
  "INQUIRY_NOTIFICATION_EMAIL",
]
const originalEnvironment = Object.fromEntries(environmentKeys.map((key) => [key, process.env[key]]))

function createResponse() {
  return {
    headers: {},
    statusCode: 200,
    body: null,
    setHeader(name, value) {
      this.headers[name] = value
    },
    status(code) {
      this.statusCode = code
      return this
    },
    json(body) {
      this.body = body
      return this
    },
    end() {
      return this
    },
  }
}

let requestSequence = 0

async function submit(body, headers = {}) {
  const res = createResponse()
  requestSequence += 1
  await handler({
    method: "POST",
    body,
    headers: { host: "qingyuweb.com", "x-forwarded-for": `192.0.2.${requestSequence}`, ...headers },
  }, res)
  return res
}

describe("inquiry API", () => {
  beforeEach(() => {
    environmentKeys.forEach((key) => delete process.env[key])
    mail.createTransport.mockReset()
    mail.sendMail.mockReset()
    mail.createTransport.mockReturnValue({ sendMail: mail.sendMail })
    mail.sendMail.mockResolvedValue({ messageId: "mail-1" })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    environmentKeys.forEach((key) => {
      if (originalEnvironment[key] === undefined) delete process.env[key]
      else process.env[key] = originalEnvironment[key]
    })
  })

  it("stores the request and sends a Gmail notification", async () => {
    process.env.SUPABASE_URL = "https://example.supabase.co"
    process.env.SUPABASE_SERVICE_ROLE_KEY = "server-key"
    process.env.GMAIL_USER = "a0988874324@gmail.com"
    process.env.GMAIL_APP_PASSWORD = "test-app-password"
    process.env.INQUIRY_NOTIFICATION_EMAIL = "a0988874324@gmail.com"
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, status: 201, text: vi.fn() }))

    const res = await submit({
      name: "王小姐",
      contact: "customer@example.com",
      service_type: "品牌網站",
      budget_range: "3 至 6 萬",
      message: "想重新整理公司網站",
      source: "contact-page",
    })

    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject({ ok: true, stored: true, notified: true, mode: "stored-and-notified" })
    expect(mail.createTransport).toHaveBeenCalledWith(expect.objectContaining({ host: "smtp.gmail.com", port: 465, secure: true }))
    expect(mail.sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "a0988874324@gmail.com",
        replyTo: "customer@example.com",
        subject: "[晴宇新需求] 品牌網站｜王小姐",
      }),
    )
  })

  it("does not claim that email was sent when Gmail is not configured", async () => {
    process.env.SUPABASE_URL = "https://example.supabase.co"
    process.env.SUPABASE_SERVICE_ROLE_KEY = "server-key"
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, status: 201, text: vi.fn() }))

    const res = await submit({ name: "林先生", contact: "0900000000", message: "需要企業系統" })

    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject({ ok: true, stored: true, notified: false, mode: "stored-only" })
    expect(res.body.warning).toContain("Email 通知尚未寄出")
    expect(mail.sendMail).not.toHaveBeenCalled()
  })

  it("fails closed without sending email when the request cannot be stored", async () => {
    process.env.GMAIL_USER = "a0988874324@gmail.com"
    process.env.GMAIL_APP_PASSWORD = "test-app-password"

    const res = await submit({ name: "林先生", contact: "0900000000", message: "需要企業系統" })

    expect(res.statusCode).toBe(503)
    expect(res.body).toMatchObject({ ok: false, stored: false, notified: false })
    expect(mail.sendMail).not.toHaveBeenCalled()
  })

  it("rejects cross site browser submissions without a wildcard CORS header", async () => {
    const res = await submit(
      { name: "林先生", contact: "0900000000", message: "需要企業系統" },
      { origin: "https://attacker.example" },
    )

    expect(res.statusCode).toBe(403)
    expect(res.headers["Access-Control-Allow-Origin"]).toBeUndefined()
  })

  it("accepts the official site origin and never returns wildcard CORS", async () => {
    const res = createResponse()
    await handler({ method: "OPTIONS", headers: { host: "qingyuweb.com", origin: "https://www.qingyuweb.com" } }, res)

    expect(res.statusCode).toBe(204)
    expect(res.headers["Access-Control-Allow-Origin"]).toBe("https://www.qingyuweb.com")
    expect(res.headers["Access-Control-Allow-Origin"]).not.toBe("*")
  })

  it("rejects insecure official origins", async () => {
    const res = await submit(
      { name: "林先生", contact: "0900000000", message: "需要企業系統" },
      { origin: "http://qingyuweb.com" },
    )

    expect(res.statusCode).toBe(403)
    expect(res.headers["Access-Control-Allow-Origin"]).toBeUndefined()
  })

  it("allows POST only", async () => {
    const res = createResponse()
    await handler({ method: "GET", headers: { host: "qingyuweb.com", "x-forwarded-for": "198.51.100.20" } }, res)

    expect(res.statusCode).toBe(405)
    expect(res.body).toEqual({ ok: false, error: "Method not allowed" })
    expect(res.headers["Cache-Control"]).toBe("no-store")
  })

  it("rate limits the sixth request from one address", async () => {
    const body = { name: "林先生", contact: "0900000000", message: "需要企業系統" }
    const address = `198.51.100.${requestSequence + 30}`
    const responses = []
    for (let index = 0; index < 6; index += 1) {
      responses.push(await submit(body, { "x-forwarded-for": address }))
    }

    expect(responses.slice(0, 5).every((response) => response.statusCode !== 429)).toBe(true)
    expect(responses[5].statusCode).toBe(429)
    expect(responses[5].headers["Retry-After"]).toBe("600")
  })

  it("rejects honeypot submissions before storage or email", async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal("fetch", fetchMock)

    const res = await submit({ name: "Bot", contact: "bot@example.com", message: "大量廣告訊息", website: "spam.example" })

    expect(res.statusCode).toBe(400)
    expect(fetchMock).not.toHaveBeenCalled()
    expect(mail.sendMail).not.toHaveBeenCalled()
  })

  it("returns the first successful result for the same idempotency key", async () => {
    process.env.SUPABASE_URL = "https://example.supabase.co"
    process.env.SUPABASE_SERVICE_ROLE_KEY = "server-key"
    process.env.GMAIL_USER = "a0988874324@gmail.com"
    process.env.GMAIL_APP_PASSWORD = "test-app-password"
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 201, text: vi.fn() })
    vi.stubGlobal("fetch", fetchMock)
    const key = `test-${requestSequence}-${Date.now()}`
    const body = { name: "王小姐", contact: "customer@example.com", message: "想重新整理公司網站" }

    const first = await submit(body, { "idempotency-key": key })
    const second = await submit(body, { "idempotency-key": key })

    expect(first.body).toEqual(second.body)
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(mail.sendMail).toHaveBeenCalledTimes(1)
  })

  it("rejects incomplete submissions without storing or sending", async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal("fetch", fetchMock)

    const res = await submit({ name: "", contact: "" })

    expect(res.statusCode).toBe(400)
    expect(res.body).toEqual({ ok: false, error: "請填寫想解決的問題與有效的聯絡方式" })
    expect(fetchMock).not.toHaveBeenCalled()
    expect(mail.sendMail).not.toHaveBeenCalled()
  })

  it("escapes customer content in the HTML email", () => {
    const email = buildInquiryEmail(
      {
        name: "<script>alert(1)</script>",
        contact: "customer@example.com",
        company: "A&B",
        service_type: "網站",
        budget_range: "待討論",
        source: "contact-page",
        message: "<img src=x onerror=alert(1)>",
      },
      new Date("2026-08-22T12:00:00Z"),
    )

    expect(email.html).not.toContain("<script>")
    expect(email.html).not.toContain("<img src=x")
    expect(email.html).toContain("&lt;script&gt;")
    expect(email.html).toContain("A&amp;B")
  })

  it("accepts only the problem and contact without requiring a name", async () => {
    process.env.SUPABASE_URL = "https://example.supabase.co"
    process.env.SUPABASE_SERVICE_ROLE_KEY = "server-key"
    const fetchMock = vi.fn().mockResolvedValue({ ok: true })
    vi.stubGlobal("fetch", fetchMock)
    const res = await submit({ contact: "sample_line", message: "手機版文字擠在一起" })
    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject({ stored: true, notified: false })
    expect(JSON.parse(fetchMock.mock.calls[0][1].body).name).toBe("未提供稱呼")
  })

  it.each(["bad@", "x", "1234", "hello world", "<script>"])("rejects invalid contact %s before storage", async (contact) => {
    const fetchMock = vi.fn()
    vi.stubGlobal("fetch", fetchMock)
    const res = await submit({ contact, message: "希望修改手機版" })
    expect(res.statusCode).toBe(400)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it("does not put upstream errors or inquiry content in logs", async () => {
    process.env.SUPABASE_URL = "https://example.supabase.co"
    process.env.SUPABASE_SERVICE_ROLE_KEY = "server-key"
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("private contact and message")))
    const log = vi.spyOn(console, "error").mockImplementation(() => {})
    try {
      const res = await submit({ contact: "customer@example.com", message: "希望修改手機版" })
      expect(res.statusCode).toBe(503)
      expect(log).toHaveBeenCalledWith("inquiry insert failed")
      expect(JSON.stringify(log.mock.calls)).not.toContain("private contact")
    } finally { log.mockRestore() }
  })
})
