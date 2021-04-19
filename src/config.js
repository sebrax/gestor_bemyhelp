const config = {
  // api_url: process.env.VUE_APP_API_URL,
  api_url:
    process.env.NODE_ENV === 'development'
      ? process.env.VUE_APP_DEV_API_URL
      : process.env.VUE_APP_PRODUCTION_API_URL,
  base_url: window.location.origin,
};

export default config;
