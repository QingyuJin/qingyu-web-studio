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

async function submit(body) {
  const res = createResponse()
  await handler({ method: "POST", body }, res)
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

  it("rejects incomplete submissions without storing or sending", async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal("fetch", fetchMock)

    const res = await submit({ name: "", contact: "" })

    expect(res.statusCode).toBe(400)
    expect(res.body).toEqual({ ok: false, error: "請填寫姓名與聯絡方式" })
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
})
