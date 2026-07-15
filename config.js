// ============================================================
// CS HUB - Site Configuration
// ============================================================

const siteConfig = {
  maintenanceMode: false,
  adminEmails: [
    "lewiseinstein15@gmail.com",
    "unscriptedusa@gmail.com"
  ],
  announcement: "Welcome to CS HUB - New Interface!",
  siteName: "CS HUB",
  defaultTheme: "dark",
  version: "2.0.0"
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = siteConfig;
}
