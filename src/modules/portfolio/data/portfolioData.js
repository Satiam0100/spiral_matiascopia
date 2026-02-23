export const portfolioData = [
  {
    id: 'p01',
    title: 'CAMPAIGN CREATIVE',
    category: 'Content + Strategy',
    imageUrl:
      'https://images.unsplash.com/photo-1520975682030-1a5b0d97f0df?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'p02',
    title: 'BRAND IDENTITY',
    category: 'Design System',
    imageUrl:
      'https://images.unsplash.com/photo-1520975958225-27d5d70b28ee?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'p03',
    title: 'SOCIAL LAUNCH',
    category: 'Social Media',
    imageUrl:
      'https://images.unsplash.com/photo-1520975916555-1f0b7a4bf6d1?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'p04',
    title: 'PRODUCT SHOOT',
    category: 'Photography',
    imageUrl:
      'https://images.unsplash.com/photo-1520975867597-0b273a1a613a?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'p05',
    title: 'EDITORIAL LAYOUTS',
    category: 'Graphic Design',
    imageUrl:
      'https://images.unsplash.com/photo-1520975832904-0e0a6e8b3b1f?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'p06',
    title: 'CONTENT DAY',
    category: 'All Access',
    imageUrl:
      'https://images.unsplash.com/photo-1520975900651-5f8b9c9f3f5b?auto=format&fit=crop&w=1600&q=80',
  },
];

const makePlaceholders = (prefix, count) =>
  Array.from({ length: count }, (_, idx) => ({ id: `${prefix}${idx + 1}` }));

export const portfolioVideosRows = [
  { id: 'vrow-01', label: '2024', items: makePlaceholders('v01-', 3) },
  { id: 'vrow-02', label: '2023', items: makePlaceholders('v02-', 3) },
  { id: 'vrow-03', label: '2022', items: makePlaceholders('v03-', 3) },
];

export const portfolioPhotosRows = [
  { id: 'prow-01', label: '2024', items: makePlaceholders('p01-', 4) },
  { id: 'prow-02', label: '2023', items: makePlaceholders('p02-', 4) },
  { id: 'prow-03', label: '2022', items: makePlaceholders('p03-', 4) },
];

