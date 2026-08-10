/**
 * Single source of truth for contact and social endpoints.
 * Links render only when a value is set — no dead hrefs.
 */
export const SITE = {
  email: 'info@koisoftware.com',
  social: {
    instagram: '',
    linkedin: 'https://www.linkedin.com/in/carloshugoeg/',
  },
  iximchat: 'https://iximchat.koisoftware.com',
  url: 'https://koisoftware.com',
} as const;
