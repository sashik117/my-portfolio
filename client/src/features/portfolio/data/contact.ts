export const contactSocials = [
  {
    label: "GitHub",
    href: "https://github.com/sashik117",
    icon: "github"
  },
  {
    label: "Telegram",
    href: "https://t.me/Cinnamonroll69",
    icon: "telegram"
  },
  {
    label: "Email",
    href: "mailto:sanyoklolik@gmail.com",
    icon: "email"
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/_o.suhova/",
    icon: "instagram"
  }
] as const;

export type ContactSocialIcon = (typeof contactSocials)[number]["icon"];
