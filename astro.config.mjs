import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
    site: "https://joackob.github.io",
    base: "/haiku-reels-astro",
    integrations: [mdx(), sitemap(), tailwind(), react()],
    output: 'server',
    session: {
       cookie: {
     name: "my-session-cookie",
     //sameSite: "lax",
     secure: true,
     ttl: 60 * 60 * 24 * 7, // 7 days
   }
    },
  
});