export type Category = "Food" | "Automotive" | "Fashion & Beauty" | "Branding" | "Events" | "Social Films";
export type Project = { title: string; slug: string; filename: string; id: string; year: string; category: Category };

const raw: Omit<Project, "slug">[] = [
  { title: "Salon Film", filename: "SALON VIDEO-copy.MOV", id: "1eWjypGUZzW0wrG8np8kxxyVic5_FyEc1", year: "2026", category: "Fashion & Beauty" },
  { title: "Salon Reel", filename: "SALON REEL.MOV", id: "1s3ASKGIOaXBl4JFOF5sYgiXBeqDhauj-", year: "2026", category: "Fashion & Beauty" },
  { title: "Portrait Study", filename: "E7F68031-A12E-42EB-9563-CF9C11DCD387.MOV", id: "1p9IUgJKRNskz670brSbsEY8cXak_50K4", year: "2026", category: "Fashion & Beauty" },
  { title: "June / 23", filename: "0623.MP4", id: "1ziUOGE93xBfzRxcj8ynM2HPU_XnMbFyi", year: "2026", category: "Social Films" },
  { title: "June / 17", filename: "0617.MP4", id: "1TcmZs-76S1sl2OdDL8x9HUFbQnnz2d16", year: "2026", category: "Automotive" },
  { title: "June / 11", filename: "0611-copy(3).mp4", id: "10Iv9ZXhZ1UYPnrnsnpY22g6TrRIEVQgN", year: "2026", category: "Food" },
  { title: "May / 28 — Cut II", filename: "0528 (2)-copy-copy.MP4", id: "1mVPgO7MDzzLrfn9ma3Jyjz6f4-HeY4iA", year: "2026", category: "Branding" },
  { title: "DJ Poli", filename: "dj poli.MP4", id: "1WFr64g9YJQLcs9ML_lksHq_1MUf-VPcA", year: "2026", category: "Events" },
  { title: "May / 28", filename: "0528.MP4", id: "1FF7JXnIkJe_vG1bA7w2wSHvvilLK7Jqu", year: "2026", category: "Branding" },
  { title: "May / 21", filename: "0521-copy-copy-copy(1).mp4", id: "1I0tzka047wj4K5hlBha9rQ8CVWVQfCJA", year: "2026", category: "Automotive" },
  { title: "May / 24", filename: "0524.MP4", id: "1oRzSOZPdiA8TirV4pjzdyuF2MJKmWgGH", year: "2026", category: "Food" },
  { title: "Thaachi", filename: "Thaachi.mp4", id: "1aHuqEIeXxWqefo2ndCSkyi-OSLWgewRV", year: "2026", category: "Food" },
  { title: "May / 01", filename: "0501 (3)(2).MP4", id: "1SoXO0NhTbSls9dajrqdoWlUa0kzBuosp", year: "2026", category: "Social Films" },
  { title: "April / 11", filename: "0411(2).mp4", id: "1pM_t4iFed_7aP387sOmzU4wzcwis-8vh", year: "2026", category: "Automotive" },
  { title: "December / 30", filename: "1230(1) 2.MP4", id: "1NVjqmtzN1pGPU6GthASekX-iCNVwBcWR", year: "2025", category: "Events" },
  { title: "AW", filename: "aw.mov", id: "1G4nYwNul9deCK0I8iiKrzDZLuPcEYuNy", year: "2025", category: "Branding" },
  { title: "December / 26", filename: "1226.mov", id: "1lP8-q1NqPRUYXz4hy-B3Wx1QN_hjxbpL", year: "2025", category: "Events" },
  { title: "Hanan Karama", filename: "HANAN KARAMA.mov", id: "16AsIR07xXgyq04z4ofwDa0cwG9vLELRv", year: "2025", category: "Fashion & Beauty" },
  { title: "Hanan Shaah", filename: "HANAN SHAAH(1).mov", id: "1G7oHH6dgLBECUGUdiTy2FpCQJR6fUmLi", year: "2025", category: "Fashion & Beauty" },
  { title: "Hanan / Cut IV", filename: "HANAN(4).mov", id: "1Vo3jFD6GNYY0LDOV3RX_XsqTFEWbXvNB", year: "2025", category: "Fashion & Beauty" },
  { title: "Hanan", filename: "HANAN.mov", id: "1oqyVPh-2eNf0ufiilDcvhzOSLUBMMFiz", year: "2025", category: "Fashion & Beauty" },
  { title: "October / 14", filename: "1014.MOV", id: "1mYn_gyx0C5RIuwFt0DNU0j__TMStrpmx", year: "2025", category: "Events" },
  { title: "Story", filename: "Story .MP4", id: "1K9vZERz-6YbCNIeOfbl64Jb_3UtdrKqm", year: "2025", category: "Branding" },
  { title: "September / 19", filename: "0919 (1).MP4", id: "1fKQ7wXhRKa2y7uG2tbAE5TDPpdmVJNu6", year: "2025", category: "Social Films" },
  { title: "Fafa", filename: "fafa copy.MOV", id: "11MKHLGelMo0np2cwIoXQ5-85HWiLk7JG", year: "2025", category: "Fashion & Beauty" },
  { title: "August / 04", filename: "0804(1).MOV", id: "1ZN9mq3Z5Gumy0dzk0g_cQtAZn4WK8QRe", year: "2025", category: "Social Films" },
];
const slugify = (value: string) => value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
export const projects: Project[] = raw.map((project, index) => ({ ...project, slug: `${slugify(project.title)}-${String(index + 1).padStart(2, "0")}` }));
export const categories: Category[] = ["Food", "Automotive", "Fashion & Beauty", "Branding", "Events", "Social Films"];
export const categoryAsset: Record<Category, string> = {
  Food: "/assets/categories/food.png",
  Automotive: "/assets/categories/automotive.png",
  "Fashion & Beauty": "/assets/categories/fashion-beauty.png",
  Branding: "/assets/categories/branding.png",
  Events: "/assets/categories/events.png",
  "Social Films": "/assets/categories/social-films.png",
};
export const categoryHeadline: Record<Category, string> = {
  Food: "Stories You Can Taste",
  Automotive: "Motion, Engineered",
  "Fashion & Beauty": "Form. Texture. Presence.",
  Branding: "Identity in Motion",
  Events: "Moments, Magnified",
  "Social Films": "Built for the Scroll",
};
export const projectStatement: Record<Category, string> = {
  Food: "Texture, appetite and atmosphere shaped into a precise visual rhythm.",
  Automotive: "Machine, movement and road presence directed through cinematic detail.",
  "Fashion & Beauty": "Character, light and gesture composed with an editorial point of view.",
  Branding: "A brand idea translated into a moving visual world with clarity and recall.",
  Events: "Live energy captured with pace, presence and a strong sense of place.",
  "Social Films": "Short-form stories cut for immediate impact without losing craft.",
};
