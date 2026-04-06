import { defineOverridesPreferences } from '@vben/preferences';

export const overridesPreferences = defineOverridesPreferences({
  app: {
    name: '风控管理平台',
    accessMode: 'frontend',
    defaultHomePath: '/dashboard',
    contentPadding: 16,
    contentPaddingBottom: 16,
    contentPaddingLeft: 16,
    contentPaddingRight: 16,
    contentPaddingTop: 16,
  },
});
