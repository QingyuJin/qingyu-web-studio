// Email, LINE personal/official IDs and existing phone inquiries remain supported.
export function isValidInquiryContact(value) {
  if (typeof value !== "string") return false
  const contact = value.trim()
  if (!contact || contact.length > 200) return false
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)) return true
  if (/^\+?[\d\s()-]+$/.test(contact)) return contact.replace(/\D/g, "").length >= 7 && contact.replace(/\D/g, "").length <= 15
  return /^@?[a-zA-Z0-9_.-]{4,20}$/.test(contact)
}
