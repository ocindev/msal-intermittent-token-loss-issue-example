/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    azureAdClientId: process.env.AZURE_AD_CLIENT_ID,
    azureAdAuthority: process.env.AZURE_AD_AUTHORITY,
    azureAdResource: process.env.AZURE_AD_RESOURCE,
  }
};

export default nextConfig;
