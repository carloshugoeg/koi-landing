/**
 * Single source of truth for contact and social endpoints.
 * Links render only when a value is set — no dead hrefs.
 */
export const SITE = {
  email: 'info@koisoftware.com',
  /** International format, digits only (e.g. '50212345678'). Empty = WhatsApp CTA hidden. */
  whatsapp: '',
  social: {
    instagram: '',
    linkedin: '',
  },
  iximchat: 'https://iximchat.koisoftware.com',
  url: 'https://koisoftware.com',
} as const;

export function whatsappHref(message: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}
