// GRAPHIC DESIGN GALLERY — pulls from your Canva work.
// Canva has no public API for auto-syncing, so this list is manually updated (takes 30 seconds per project).
//
// HOW TO ADD A NEW CANVA PROJECT:
// 1. Open the design in Canva → click "Share" (top right).
// 2. Toggle "Anyone with the link" ON, set permission to "Can view" → click "Copy link".
//    (Alternative: Share → More → "Website" to publish it as its own public page.)
// 3. Download the design as a PNG/JPG (Share → Download) for the thumbnail image.
// 4. Drop that image into /public/designs/  (e.g. public/designs/poster-01.jpg)
// 5. Copy the object below, fill in the fields, add it to the array.

// ⚠️ THE 3 ENTRIES BELOW ARE PLACEHOLDER EXAMPLES ONLY — they will NOT show your
// real Canva work until you replace the thumbnail + canvaLink with your actual ones.
// This is why your real designs aren't appearing yet — swap these out following
// the steps above, or delete them and add your own using the same format.
const designProjects = [
  {
    title: "EXAMPLE — 3 Click Rule Carousel Post",
    category: "Social Media Design",
    thumbnail: "/designs/placeholder-1.jpg",
    description: "Replace this with your real project — see steps above.",
    canvaLink: "https://www.canva.com/design/REPLACE_WITH_YOUR_LINK/view",
  },
  {
    title: "EXAMPLE — Campaign Graphic",
    category: "Marketing Design",
    thumbnail: "/designs/placeholder-2.jpg",
    description: "Replace this with your real project — see steps above.",
    canvaLink: "https://www.canva.com/design/REPLACE_WITH_YOUR_LINK/view",
  },
  {
    title: "EXAMPLE — Offer Letter Template",
    category: "Print / Document Design",
    thumbnail: "/designs/placeholder-3.jpg",
    description: "Replace this with your real project — see steps above.",
    canvaLink: "https://www.canva.com/design/REPLACE_WITH_YOUR_LINK/view",
  },
];

export default designProjects;
