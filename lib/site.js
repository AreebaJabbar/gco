// Poori site ki info yahan se aati hai. Kuch badalna ho to sirf yeh file edit karein.

export const site = {
  name: 'GCO Foundation',
  country: 'Pakistan',
  fullName: 'Global Connection Welfare Organization',
  shortName: 'GCWO',
  tagline: 'Spreading Love, Restoring Hope, Transforming Lives',
  subheading: 'Serving vulnerable communities across Pakistan through education, shelter, healthcare, community development, and freedom from bonded labour.',
  home: 'Hope Home Orphanage',
  location: 'Gujranwala, Punjab, Pakistan',
  whoWeAre:
    'Global Connection Welfare Organization (GCWO) is a registered, non-profit, non-political Christian welfare and development organization based in Gujranwala, Punjab, Pakistan. Since 2014, we have been working to support vulnerable and marginalized communities through humanitarian assistance, education, healthcare, shelter, spiritual guidance, and community development. Our services are provided to people in need without discrimination based on  caste, ethnicity, or social background. We believe that every human being deserves love, respect, dignity, and equal opportunities. Our mission is guided by Christian values of compassion, kindness, service, and love for humanity.',
  mission:
    'To serve orphaned children, vulnerable elderly people, brick kiln families, disadvantaged women, and underprivileged communities with love, dignity, and compassion by providing food, shelter, education, healthcare, empowerment opportunities, freedom from bonded labour, free emergency ambulance service, and outreach support to unreached villages and families in need.',
  vision:
    'A world where no child goes to sleep hungry, no elderly person feels abandoned, no woman feels helpless, no family lives under the burden of slavery or exploitation, no sick or injured person suffers for lack of transport, and no village remains unreached by love, prayer, and help.',
  promise:
    'Every donation reaches the real needy people. We share photos, videos and reports with full transparency.',
  values: [
    { icon: 'fa-heart', title: 'Compassion', description: 'Serving everyone with love and kindness.' },
    { icon: 'fa-hand-holding-heart', title: 'Dignity', description: 'Respecting every human being.' },
    { icon: 'fa-cross', title: 'Faith', description: 'Following Christian principles of love, service, and hope.' },
    { icon: 'fa-scale-balanced', title: 'Equality', description: 'Helping people without discrimination.' },
    { icon: 'fa-shield-halved', title: 'Transparency', description: 'Maintaining accountability and responsible use of donations.' },
    { icon: 'fa-seedling', title: 'Empowerment', description: 'Creating opportunities for sustainable and independent living.' },
  ],
  email: 'globalconnectionwelfareorg@gmail.com',
  phone: '+92 344 255 1102',
  phoneHref: '+923442551102',
  address: 'Nadeem Town, Apex College Near Awan Chowk, Gujranwala, Punjab, Pakistan',
  mapQuery: 'Nadeem Town Apex College Awan Chowk Gujranwala Punjab Pakistan',
  leaders: ['Pastor Qaiser Saleem', 'Pastor Nazish Qaiser'],
  daughters: 29,
  whatsapp: '923442551102',
  paymentMethods: [
    {
      id: 'bank',
      label: 'Bank Account',
      subtitle: 'Bank Alfalah Limited',
      modalTitle: 'Bank Account Details',
      headerColor: 'navy',
      icon: 'fa-building-columns',
      fields: [
        { label: 'Account Holder Name', value: 'GLOBAL CONNECTION WELFARE ORGANIZATION', copyable: false },
        {
          label: 'Bank Name',
          value: 'Bank Alfalah Limited',
          subvalue: 'Branch: 0048 - Abbot Road Branch, Lahore (Current Plus Account)',
          copyable: false,
        },
        {
          label: 'Account Number',
          value: '1011516653',
          copyable: true,
        },
        {
          label: 'IBAN Number',
          value: 'PK96ALFH0048001011516653',
          copyable: true,
        },
      ],
    },
    {
      id: 'easypaisa',
      label: 'Easypaisa',
      subtitle: 'Mobile Wallet Account',
      modalTitle: 'Easypaisa Account Details',
      headerColor: 'leaf',
      icon: 'fa-wallet',
      fields: [
        { label: 'Account Holder Name', value: 'Qaiser Saleem', copyable: false },
        { label: 'Easypaisa Number', value: '03446585686', copyable: true },
        { label: 'Platform', value: 'Easypaisa', copyable: false },
      ],
    },
  ],
  bank: null,
};

export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Our Work', href: '/our-work' },
  { label: 'Our Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
];

export const appeal = {
  title: 'Christmas Joy Appeal 2026',
  forWhom: `the ${site.daughters} daughters of ${site.home}`,
  items: [
    { item: 'Dresses', qty: 29, unitPkr: 5000, totalPkr: 145000, unitUsd: 18.07, totalUsd: 524.14 },
    { item: 'Under Garments', qty: 29, unitPkr: 3000, totalPkr: 87000, unitUsd: 10.85, totalUsd: 314.61 },
    { item: 'Shoes', qty: 29, unitPkr: 5000, totalPkr: 145000, unitUsd: 18.07, totalUsd: 524.14 },
  ],
  totalOverride: null,
};

export const appealTotals = () => {
  const pkr = appeal.items.reduce((s, x) => s + x.totalPkr, 0);
  const usd = appeal.items.reduce((s, x) => s + x.totalUsd, 0);
  return appeal.totalOverride || { pkr, usd };
};

export const fmt = (n) => Number(n).toLocaleString('en-US');
