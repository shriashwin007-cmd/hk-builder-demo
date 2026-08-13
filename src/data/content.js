export const services = [
  {
    idx: '01',
    title: 'Construction',
    desc: 'Seismic Zone III-rated structures, brick masonry, teakwood doors and UPVC framing — built to IS 13920 / IS 456 / SP 16 standards.',
    icon: 'M6 34V14L20 6L34 14V34 M14 34V20H26V34',
    img: '/img/service-construction.jpg',
    alt: 'Concrete and brick structural frame detail',
  },
  {
    idx: '02',
    title: 'Painting & Finish',
    desc: 'Premium-grade emulsion interiors and weatherproof exteriors, finished with putty and primer — a full painting arm, not outsourced.',
    icon: 'M20 4C20 4 10 16 10 24C10 29.5 14.5 34 20 34C25.5 34 30 29.5 30 24C30 16 20 4 20 4Z',
    img: '/img/service-painting.jpg',
    alt: 'Paint roller and brush against a freshly painted wall',
  },
  {
    idx: '03',
    title: 'Interiors & Fit-out',
    desc: 'Quartz-and-granite kitchens, vitrified tiling, and smart digital access — move-in ready, not just handover-ready.',
    icon: 'M6,10 h28 v22 h-28 z M6,18 h28 M16,18 v14',
    img: '/img/service-interiors.jpg',
    alt: 'Granite counter and teak cabinetry in a finished kitchen',
  },
];

export const specs = [
  { k: 'Structure', v: 'Seismic Zone III, ductile detailing per IS 13920 / IS 456 / SP 16. 9" outer walls, 4.5" partitions.' },
  { k: 'Doors & Windows', v: 'Premium teakwood main door with brass fittings; UPVC-framed windows for insulation and durability.' },
  { k: 'Paint', v: 'Berger interior emulsion over putty and primer; weatherproof exterior emulsion, two coats.' },
  { k: 'Flooring', v: '600×600mm vitrified tiles (Kajaria / Somany), matched grout, approved make throughout.' },
  { k: 'Kitchen', v: 'Durable quartz sink with polished granite countertop.' },
  { k: 'Water Supply', v: 'Dual source — submersible motor pump + Metro connection — with 12,000L underground tank.' },
  { k: 'Lift & Security', v: 'Automatic-closure passenger lift; smart digital lock access system for the building.' },
];

export const projectCaptions = [
  ...specs.map((s) => ({ title: s.k, body: s.v })),
  {
    title: 'Trusted & Approved',
    body: 'CMDA-approved project with home loan partners already in place.',
    badges: ['CMDA Approved', 'HDFC Home Loan', 'SBI Home Loan'],
  },
];

const layoutA = { hall: [90, 55], bed1: [90, 150], bed2: [90, 250], kitchen: [210, 85], bed3: [210, 185], lines: [[10, 90, 170, 90], [170, 10, 170, 290], [170, 150, 250, 150], [10, 200, 170, 200]] };
const layoutB = { hall: [85, 60], dining: [85, 160], bed1: [85, 255], bed2: [205, 90], bed3: [205, 190], lines: [[10, 100, 160, 100], [160, 10, 160, 290], [160, 160, 250, 160], [10, 210, 160, 210]] };

export const floorPlans = [
  { id: 'F1', flat: 'F1', plinth: '1094 sq.ft', area: '1370 sq.ft', uds: '471.8', floor: 'First Floor', bedrooms: 3, toilets: 3, facingShort: 'East / South Facing', layout: 'A' },
  { id: 'F2', flat: 'F2', plinth: '1070 sq.ft', area: '1340 sq.ft', uds: '461.5', floor: 'First Floor', bedrooms: 3, toilets: 3, facingShort: 'East / North Facing', layout: 'B' },
  { id: 'S1', flat: 'S1', plinth: '1094 sq.ft', area: '1370 sq.ft', uds: '471.8', floor: 'Second Floor', bedrooms: 3, toilets: 3, facingShort: 'East / South Facing', layout: 'A' },
  { id: 'S2', flat: 'S2', plinth: '1070 sq.ft', area: '1340 sq.ft', uds: '461.5', floor: 'Second Floor', bedrooms: 3, toilets: 3, facingShort: 'East / North Facing', layout: 'B' },
  { id: 'T1', flat: 'T1', plinth: '1094 sq.ft', area: '1370 sq.ft', uds: '471.8', floor: 'Third Floor', bedrooms: 3, toilets: 3, facingShort: 'East / South Facing', layout: 'A' },
  { id: 'T2', flat: 'T2', plinth: '1070 sq.ft', area: '1340 sq.ft', uds: '461.5', floor: 'Third Floor', bedrooms: 3, toilets: 3, facingShort: 'East / North Facing', layout: 'B' },
];

export const layouts = { A: layoutA, B: layoutB };

export const location = [
  { title: 'Schools', items: [['D A V Senior Secondary', '3.9 km'], ['Velammal Academy', '1.6 km'], ['Maharishi Vidya Mandir', '2.0 km']] },
  { title: 'Hospitals', items: [['Madras Medical Mission', '4.5 km'], ['Apollo Speciality', '3.0 km']] },
  { title: 'Colleges & Work', items: [['MGR University', '1.9 km'], ['Mar Gregorios College', '2.0 km'], ['Ambit IT Park', '5.6 km']] },
  { title: 'Everyday', items: [['VR Mall', '6.0 km'], ['Reliance Smart Bazaar', '1.6 km'], ['Decathlon Sports', '3.2 km']] },
];
