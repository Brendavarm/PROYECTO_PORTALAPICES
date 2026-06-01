/** Cuentas oficiales GoalDesk — proyecto UNIFRANZ */
export const GOALDESK_SOCIAL = {
  instagram: {
    handle: '@goaldesk_franz',
    url:
      import.meta.env.VITE_INSTAGRAM_URL ||
      import.meta.env.VITE_SOCIAL_URL ||
      'https://www.instagram.com/goaldesk_franz',
  },
  tiktok: {
    handle: '@goaldesk_franz',
    url: import.meta.env.VITE_TIKTOK_URL || 'https://www.tiktok.com/@goaldesk_franz',
  },
};
