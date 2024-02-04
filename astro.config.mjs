import { defineConfig } from "astro/config";
import osPlugin from "@builder-os/astro";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx(),
    osPlugin({
      customCSS: ["./src/os.css"],
      user: {
        background: {
          creditName: "Denys Striyeshyn",
          creditProfileUrl:
            "https://unsplash.com/@denysstriyeshyn?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
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
      isTravelEnabled: true,
      isProjectsEnabled: true,
      isMusicEnabled: true,
      isNotesEnabled: true,
      travel: {
        wishlist: [
          { name: "Botswana 🇧🇼", isChecked: false },
          { name: "Kenya 🇰🇪", isChecked: false },
          { name: "Nigeria 🇳🇬", isChecked: false },
          { name: "Rwanda 🇷🇼", isChecked: false },
          { name: "Zambia 🇿🇲", isChecked: false },
        ],
      },
    }),
  ],
});
