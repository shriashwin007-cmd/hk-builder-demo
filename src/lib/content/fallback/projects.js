/**
 * Fallback project data, reshaped from the demo's single hardcoded project
 * into the multi-project model the real site needs.
 *
 * PLACEHOLDER IMAGERY: every `image` below is AI-generated (Higgsfield) and is
 * flagged `imageType: 'artists-impression'`. Real site photography must replace
 * these before launch — presenting generated imagery as photographs of an
 * actual property is misleading advertising.
 */

const layoutA = {
  hall: [90, 55],
  bed1: [90, 150],
  bed2: [90, 250],
  kitchen: [210, 85],
  bed3: [210, 185],
  lines: [
    [10, 90, 170, 90],
    [170, 10, 170, 290],
    [170, 150, 250, 150],
    [10, 200, 170, 200],
  ],
};

const layoutB = {
  hall: [85, 60],
  dining: [85, 160],
  bed1: [85, 255],
  bed2: [205, 90],
  bed3: [205, 190],
  lines: [
    [10, 100, 160, 100],
    [160, 10, 160, 290],
    [160, 160, 250, 160],
    [10, 210, 160, 210],
  ],
};

export const layouts = { A: layoutA, B: layoutB };

const spGalaxySpecs = [
  { key: 'Structure', value: 'Seismic Zone III, ductile detailing per IS 13920 / IS 456 / SP 16. 9" outer walls, 4.5" partitions.' },
  { key: 'Doors & Windows', value: 'Premium teakwood main door with brass fittings; UPVC-framed windows for insulation and durability.' },
  { key: 'Paint', value: 'Berger interior emulsion over putty and primer; weatherproof exterior emulsion, two coats.' },
  { key: 'Flooring', value: '600×600mm vitrified tiles (Kajaria / Somany), matched grout, approved make throughout.' },
  { key: 'Kitchen', value: 'Durable quartz sink with polished granite countertop.' },
  { key: 'Water Supply', value: 'Dual source — submersible motor pump + Metro connection — with 12,000L underground tank.' },
  { key: 'Lift & Security', value: 'Automatic-closure passenger lift; smart digital lock access system for the building.' },
];

const spGalaxy = {
  slug: 'sp-galaxy',
  title: 'SP Galaxy',
  tagline: 'Elegant & premium, comfort meets class.',
  status: 'ongoing',
  featured: true,
  order: 1,
  summary:
    'A premium 3BHK residence built for long-term comfort — from the structural frame down to the tap fittings.',
  configurations: ['3 BHK'],
  priceFrom: null, // TODO(client): confirm starting price
  approvals: ['CMDA Approved'],
  loanPartners: ['HDFC Bank', 'SBI'],
  reraNumber: null, // TODO(client)
  location: {
    area: 'Nolambur',
    city: 'Chennai',
    state: 'Tamil Nadu',
    geo: { lat: 13.0698, lng: 80.1748 },
    nearby: [
      { category: 'Schools', places: [
        { name: 'D A V Senior Secondary', distanceKm: 3.9 },
        { name: 'Velammal Academy', distanceKm: 1.6 },
        { name: 'Maharishi Vidya Mandir', distanceKm: 2.0 },
      ]},
      { category: 'Hospitals', places: [
        { name: 'Madras Medical Mission', distanceKm: 4.5 },
        { name: 'Apollo Speciality', distanceKm: 3.0 },
      ]},
      { category: 'Colleges & Work', places: [
        { name: 'MGR University', distanceKm: 1.9 },
        { name: 'Mar Gregorios College', distanceKm: 2.0 },
        { name: 'Ambit IT Park', distanceKm: 5.6 },
      ]},
      { category: 'Everyday', places: [
        { name: 'VR Mall', distanceKm: 6.0 },
        { name: 'Reliance Smart Bazaar', distanceKm: 1.6 },
        { name: 'Decathlon Sports', distanceKm: 3.2 },
      ]},
    ],
  },
  highlights: [
    { value: 'III', label: 'Seismic Zone Rated' },
    { value: '12,000 L', label: 'Underground Water Tank' },
    { value: '6', label: '3BHK Configurations' },
  ],
  specs: spGalaxySpecs,
  amenities: [
    { label: 'Automatic passenger lift' },
    { label: 'Smart digital lock' },
    { label: '12,000L underground tank' },
    { label: 'Dual water source' },
    { label: 'Covered parking' },
    { label: 'Vitrified tile flooring' },
  ],
  gallery: [
    { image: '/img/gal-construction.jpg', label: 'Structure', alt: 'Concrete and brick structural frame', imageType: 'artists-impression' },
    { image: '/img/gal-masonry.jpg', label: 'Masonry', alt: 'Sunlit terracotta brick wall', imageType: 'artists-impression' },
    { image: '/img/gal-painting.jpg', label: 'Paint & Finish', alt: 'Paint roller against a freshly painted wall', imageType: 'artists-impression' },
    { image: '/img/gal-interiors.jpg', label: 'Kitchen', alt: 'Granite counter and teak cabinetry', imageType: 'artists-impression' },
    { image: '/img/gal-living.jpg', label: 'Living', alt: 'Sunlit living room with emerald wall and brass fittings', imageType: 'artists-impression' },
  ],
  floorPlans: [
    { id: 'F1', floor: 'First Floor',  plinth: '1094 sq.ft', saleableArea: '1370 sq.ft', uds: '471.8', bedrooms: 3, toilets: 3, facing: 'East / South Facing', layout: 'A' },
    { id: 'F2', floor: 'First Floor',  plinth: '1070 sq.ft', saleableArea: '1340 sq.ft', uds: '461.5', bedrooms: 3, toilets: 3, facing: 'East / North Facing', layout: 'B' },
    { id: 'S1', floor: 'Second Floor', plinth: '1094 sq.ft', saleableArea: '1370 sq.ft', uds: '471.8', bedrooms: 3, toilets: 3, facing: 'East / South Facing', layout: 'A' },
    { id: 'S2', floor: 'Second Floor', plinth: '1070 sq.ft', saleableArea: '1340 sq.ft', uds: '461.5', bedrooms: 3, toilets: 3, facing: 'East / North Facing', layout: 'B' },
    { id: 'T1', floor: 'Third Floor',  plinth: '1094 sq.ft', saleableArea: '1370 sq.ft', uds: '471.8', bedrooms: 3, toilets: 3, facing: 'East / South Facing', layout: 'A' },
    { id: 'T2', floor: 'Third Floor',  plinth: '1070 sq.ft', saleableArea: '1340 sq.ft', uds: '461.5', bedrooms: 3, toilets: 3, facing: 'East / North Facing', layout: 'B' },
  ],
  progress: [], // TODO(client): construction milestones
  brochureUrl: null,
};

export const projects = [spGalaxy];
