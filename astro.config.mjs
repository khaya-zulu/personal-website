import { defineConfig } from "astro/config";
import osPlugin from "@builder-os/astro";

import mdx from "@astrojs/mdx";

import vercel from "@astrojs/vercel/serverless";

import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";

import everest from "./everest.json";

// https://astro.build/config
export default defineConfig({
  output: "server",
  markdown: {
    shikiConfig: {
      theme: everest,
    },
  },
  integrations: [
    mdx(),
    vercel({
      webAnalytics: {
        enabled: true,
      },
    }),
    osPlugin({
      customCSS: ["/src/os.css"],
      user: {
        background: {
          creditName: "Alexandru Acea",
          creditProfileUrl:
            "https://unsplash.com/@alexacea?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
        },
        name: "Khaya 🇿🇦",
        description: "Doing it for the fun of things.",
        avatar: "/avatar.webp",
        socials: {
          github: "https://github.com/khaya-zulu",
          linkedin: "https://www.linkedin.com/in/khaya-zulu-910760153/",
          twitter: "https://twitter.com/khaya_zulu",
        },
        coords: {
          lat: -26.195246,
          lng: 28.034088,
          name: "Johannesburg, South Africa",
        },
      },
      isBioEnabled: true,
      isProjectsEnabled: true,
      isMusicEnabled: true,
      isNotesEnabled: true,
      page: {
        ogImage: "/og-image.png",
      },
    }),
    react(),
    markdoc(),
    keystatic(),
  ],
});
