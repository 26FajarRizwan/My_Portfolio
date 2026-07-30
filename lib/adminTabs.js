// Central config for every admin-manageable section.
// To add a new manageable section later: add a new key here with its
// Firestore collection name + form fields — the admin page and components
// pick it up automatically, no other code changes needed.

import { ICON_OPTIONS } from "@/lib/icons";

export const TABS = {
  experience: {
    label: "Experience",
    collection: "experience",
    fields: [
      { key: "role", label: "Role / Title" },
      { key: "org", label: "Organization" },
      { key: "type", label: "Type (e.g. Internship · Hybrid)" },
      { key: "meta", label: "Dates (e.g. Jul 2026 – Present · 1 mo)" },
      { key: "desc", label: "Description (optional)" },
    ],
    checkbox: { key: "current", label: "Currently ongoing?" },
    summary: (d) => `${d.role} — ${d.org}`,
  },

  education: {
    label: "Education",
    collection: "education",
    fields: [
      { key: "school", label: "School / University" },
      { key: "degree", label: "Degree / Program" },
      { key: "years", label: "Years (e.g. Oct 2024 – Jun 2028)" },
      { key: "note", label: "Note (optional)" },
    ],
    summary: (d) => `${d.school} — ${d.degree}`,
  },

  certifications: {
    label: "Certifications",
    collection: "certifications",
    fields: [
      { key: "title", label: "Certificate Title" },
      { key: "issuer", label: "Issuer (e.g. Coursera, LinkedIn Learning)" },
      { key: "date", label: "Date (e.g. Jul 2026)" },
      { key: "url", label: "Credential URL (optional)" },
    ],
    summary: (d) => `${d.title} — ${d.issuer}`,
  },

  designs: {
    label: "Designs",
    collection: "designs",
    fields: [
      { key: "title", label: "Design Title" },
      { key: "category", label: "Category (e.g. Social Media Design)" },
      { key: "description", label: "Short description (optional)" },
      { key: "thumbnail", label: "Image URL(s) — comma-separated for a carousel (url1.jpg, url2.jpg)" },
      { key: "canvaLink", label: "Public Canva link (Share → Anyone with link → Copy)" },
    ],
    summary: (d) => d.title,
  },

  abilities: {
    label: "Abilities",
    collection: "abilities",
    fields: [
      { key: "icon", label: "Icon", type: "select", options: ICON_OPTIONS },
      { key: "name", label: "Skill name (e.g. Frontend Development)" },
      { key: "percent", label: "Skill level 0-100 (e.g. 90)" },
    ],
    summary: (d) => `${d.name} — ${d.percent}%`,
  },

  services: {
    label: "What I Do",
    collection: "services",
    fields: [
      { key: "icon", label: "Icon", type: "select", options: ICON_OPTIONS },
      { key: "title", label: "Service title" },
      { key: "desc", label: "Description" },
      { key: "tags", label: "Tags, comma-separated (e.g. Next.js, FastAPI)" },
    ],
    summary: (d) => d.title,
  },
};
