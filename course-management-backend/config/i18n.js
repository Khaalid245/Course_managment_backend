const path = require('path');
const i18n = require('i18n');

i18n.configure({
  locales: ['en', 'fr', 'ar', 'so'], 
  defaultLocale: 'en',
  directory: path.join(__dirname, '../locales'),
  objectNotation: true,
  autoReload: true,
  updateFiles: false,
  syncFiles: true,
});

module.exports = i18n;
