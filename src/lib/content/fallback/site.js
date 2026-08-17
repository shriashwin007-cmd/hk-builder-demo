/**
 * Fallback site settings.
 *
 * PLACEHOLDER CONTENT — every field here must be confirmed with the client
 * before launch. Real values move into Sanity (siteSettings singleton).
 */
export const siteSettings = {
  name: 'HK Builder',
  tagline: 'Crafting Communities',
  description:
    'HK Builder designs, constructs, paints and finishes homes in Chennai — full-stack, under one roof.',
  phones: ['9940669066', '9790712222'],
  whatsapp: '9940669066',
  email: 'hk7builder@gmail.com',
  address: {
    line1: 'No.8, Arcot Road, Shop 4&5',
    line2: 'Visalatchi Street, Thandavamurthy Nagar',
    city: 'Valasaravakkam, Chennai',
    postalCode: '600087',
    country: 'IN',
  },
  geo: { lat: 13.0447, lng: 80.1729 },
  officeHours: 'Mon–Sun, 9:00–19:00',

  // TODO(client): Tamil Nadu RERA registration number. Legally required on all
  // marketing material for qualifying projects. Blocks launch — see README.
  reraNumber: null,

  // TODO(client): re-host on the client's own account before launch. These
  // currently point at a personal free-tier Cloudinary; production traffic
  // will exhaust the quota and 429 both videos with no warning.
  heroVideoUrl:
    'https://res.cloudinary.com/dxvui0xkz/video/upload/v1786643789/backround_video_etoohg.mp4',
  plansVideoUrl:
    'https://res.cloudinary.com/dxvui0xkz/video/upload/v1786646852/second_backround_video_dtlciv.mp4',

  social: { instagram: null, facebook: null, youtube: null },
};
