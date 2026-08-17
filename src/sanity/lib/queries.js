const PROJECT_FIELDS = `
  "slug": slug.current,
  title, tagline, status, featured, order, summary,
  configurations, priceFrom, approvals, loanPartners, reraNumber,
  location, highlights, specs, amenities,
  "gallery": gallery[]{ "image": image.asset->url, label, alt, imageType },
  floorPlans, progress,
  "brochureUrl": brochure.asset->url
`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  name, tagline, description, phones, whatsapp, email, address, geo,
  officeHours, reraNumber, heroVideoUrl, plansVideoUrl, social
}`;

export const projectsQuery = `*[_type == "project"] | order(order asc){${PROJECT_FIELDS}}`;

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0]{${PROJECT_FIELDS}}`;

export const testimonialsQuery = `*[_type == "testimonial"] | order(order asc){ quote, author, role }`;

export const faqsQuery = `*[_type == "faq"] | order(order asc){ question, answer }`;
