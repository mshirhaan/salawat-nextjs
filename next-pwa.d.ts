declare module "next-pwa" {
  import { NextConfig } from "next";

  interface WithPWA {
    dest?: string;
    disable?: boolean;
    register?: boolean;
    scope?: string;
    sw?: string;
    subdomainPrefix?: string;
    cacheOnFrontEndNav?: boolean;
    reloadOnOnline?: boolean;
    [key: string]: any;
  }

  const withPWA: (
    config: WithPWA
  ) => (phase: string, config: NextConfig) => NextConfig;

  export default withPWA;
}
