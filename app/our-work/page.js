import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import Link from 'next/link';

export const metadata = {
  title: 'Our Work | GCO Foundation Pakistan',
  description:
    'At Global Connection Welfare Organization, our work goes beyond providing temporary assistance. We focus on practical support, empowerment, and sustainable improvements in people’s lives.',
};

export default function OurWorkPage() {
  const programs = [
    {
      num: '1',
      title: 'Food Distribution Program',
      desc: 'Providing food assistance to poor and deserving families.',
      icon: 'fa-bowl-food',
    },
    {
      num: '2',
      title: 'Education Support Program',
      desc: 'Supporting children through free education and educational materials.',
      icon: 'fa-graduation-cap',
    },
    {
      num: '3',
      title: 'Orphan Care Program',
      desc: 'Providing shelter, food, healthcare, and education to orphaned children.',
      icon: 'fa-child',
    },
    {
      num: '4',
      title: 'Elderly Care Program',
      desc: 'Supporting vulnerable elderly people with accommodation, food, medicine, and companionship.',
      icon: 'fa-person-cane',
    },
    {
      num: '5',
      title: 'Brick Kiln Freedom Program',
      desc: 'Helping families affected by bonded labour and exploitation.',
      icon: 'fa-dove',
    },
    {
      num: '6',
      title: 'Women’s Empowerment Program',
      desc: 'Providing vocational training and opportunities for financial independence.',
      icon: 'fa-scissors',
    },
    {
      num: '7',
      title: 'Healthcare and Medical Support Program',
      desc: 'Organizing medical camps and supporting poor patients through ambulance services.',
      icon: 'fa-kit-medical',
    },
    {
      num: '8',
      title: 'Community Outreach Program',
      desc: 'Reaching underserved communities with humanitarian assistance and spiritual support.',
      icon: 'fa-hand-holding-hand',
    },
  ];

  const trustees = [
    {
      name: 'Pastor Qaiser Saleem',
      role: 'President / CEO',
      icon: 'fa-user-tie',
    },
    {
      name: 'Saleem Veru',
      role: 'Vice President',
      icon: 'fa-user-gear',
    },
    {
      name: 'Pastor Nazish Qaiser',
      role: 'Director / Secretary Finance',
      icon: 'fa-user-shield',
    },
  ];

  const documentsToDisplay = [
    'Punjab Charity Commission Registration Certificate.',
    'Societies Registration Certificate.',
    'FBR Registration Certificate.',
    'Tax exemption certificate, if applicable.',
  ];

  return (
    <>
      <PageHero
        title="Our Work"
        crumb="Our Work"
        bgImage="/assets/hero-mission-bg.jpg"
        bgAlt="Our Work - Global Connection Welfare Organization"
        bgPosition="center 32%"
      />

      {/* 4. OUR WORK - OUR PROGRAMS (PDF Section 4: Page 8 - 9) */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1180px] mx-auto px-6">
          <SectionTitle eyebrow="Humanitarian Service" title="Our Programs" />
          <p className="text-slate-700 text-center max-w-3xl mx-auto mt-5 mb-12 text-base md:text-lg leading-relaxed">
            At Global Connection Welfare Organization, our work goes beyond providing temporary assistance. We focus on practical support, empowerment, and sustainable improvements in people&apos;s lives.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((p) => (
              <div
                key={p.num}
                className="bg-white rounded-2xl p-6 border border-silver/40 card-shadow flex flex-col justify-between hover:border-brand/40 transition-colors"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-brand text-white flex items-center justify-center text-xl mb-4 shadow-sm">
                    <i className={`fa-solid ${p.icon}`}></i>
                  </div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Program {p.num}
                  </div>
                  <h3 className="font-display font-bold text-base md:text-lg text-navy mb-2">
                    {p.num}. {p.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR COMMITMENT (PDF Section 4: Page 9) */}
      <section className="py-16 px-5 bg-bgsoft border-y border-silver/30">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 card-shadow border border-silver/40 text-center">
          <span className="eyebrow">Dedication &amp; Integrity</span>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-navy mb-4">
            Our Commitment
          </h2>
          <p className="text-slate-700 text-base md:text-lg leading-relaxed mb-4">
            We are committed to serving humanity with honesty, compassion, and dedication. Every project reflects our belief that even a small act of kindness can make a meaningful difference in someone&apos;s life.
          </p>
          <p className="text-navy font-bold text-lg md:text-xl leading-relaxed">
            Together, we can build a future filled with hope, dignity, freedom, and opportunity.
          </p>
        </div>
      </section>

      {/* 5. OUR ORGANIZATION – OFFICIAL PROFILE (PDF Section 5: Page 9 - 10) */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1180px] mx-auto px-6 space-y-16">
          {/* Organization Introduction */}
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="eyebrow">Official Profile</span>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-navy mb-4">
                Organization Introduction
              </h2>
              <div className="space-y-4 text-slate-700 text-sm md:text-base leading-relaxed">
                <p>
                  Global Connection Welfare Organization (GCWO), led by its Founder and President, Pastor Qaiser Saleem, is a non-profit, non-political Christian welfare and development organization based in Gujranwala, Punjab, Pakistan.
                </p>
                <p>
                  The organization has been serving marginalized and vulnerable communities since 2014 and was officially established in 2023.
                </p>
                <p>
                  GCWO works to uplift disadvantaged individuals and families through humanitarian assistance, education, healthcare, shelter, community development, spiritual guidance, and initiatives addressing bonded labour.
                </p>
                <p className="font-semibold text-navy">
                  GCWO is committed to serving vulnerable communities in Pakistan and contributing to humanitarian development internationally.
                </p>
              </div>
            </div>

            {/* Registration and Legal Information */}
            <div className="bg-bgsoft rounded-2xl p-7 md:p-9 border border-silver/40 card-shadow">
              <h3 className="font-display font-bold text-xl text-navy mb-5 pb-3 border-b border-silver/30 flex items-center gap-2.5">
                <i className="fa-solid fa-stamp text-brand"></i>
                <span>Registration and Legal Information</span>
              </h3>
              <ul className="space-y-3.5 text-slate-700 text-sm">
                <li className="flex items-start gap-3">
                  <i className="fa-solid fa-circle-check text-leaf mt-1 shrink-0"></i>
                  <span><strong>Punjab Charity Commission:</strong> Registration No. PB.GRW-9839694700975093</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fa-solid fa-circle-check text-leaf mt-1 shrink-0"></i>
                  <span><strong>Societies Registration Act, XXI of 1860:</strong> Registration No. RJSC/GRW/RG/S-702/81</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fa-solid fa-circle-check text-leaf mt-1 shrink-0"></i>
                  <span><strong>Federal Board of Revenue (FBR):</strong> Registration No. A937156</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fa-solid fa-location-dot text-brand mt-1 shrink-0"></i>
                  <span><strong>Head Office:</strong> Gujranwala, Punjab, Pakistan.</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fa-solid fa-user-tie text-brand mt-1 shrink-0"></i>
                  <span><strong>Founder and President:</strong> Pastor Qaiser Saleem.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* OUR BOARD OF TRUSTEES (Our Team - PDF Page 10) */}
          <div className="pt-6 border-t border-silver/30">
            <SectionTitle eyebrow="Leadership &amp; Governance" title="Our Board of Trustees" />
            <div className="grid md:grid-cols-3 gap-6 mt-10">
              {trustees.map((t) => (
                <div
                  key={t.name}
                  className="bg-white rounded-2xl p-7 border border-silver/40 card-shadow text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-navy text-white flex items-center justify-center text-2xl mx-auto mb-4 shadow-sm">
                    <i className={`fa-solid ${t.icon}`}></i>
                  </div>
                  <h3 className="font-display font-bold text-lg md:text-xl text-navy mb-1.5">
                    {t.name}
                  </h3>
                  <p className="text-brand font-semibold text-sm">{t.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* OUR RECOGNITIONS AND CERTIFICATIONS (PDF Page 10) */}
          <div className="bg-bgsoft rounded-3xl p-8 md:p-12 border border-silver/40 card-shadow">
            <div className="max-w-3xl">
              <span className="eyebrow">Transparency &amp; Governance</span>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-navy mb-3">
                Our Recognitions and Certifications
              </h2>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-6 font-medium">
                We believe in transparency, accountability, and responsible humanitarian service.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                This section will display the organization&apos;s official registration certificates, government approvals, recognition documents, and other relevant certifications.
              </p>

              <h4 className="font-display font-bold text-sm text-navy uppercase tracking-wider mb-4">
                Documents to Display:
              </h4>
              <div className="grid sm:grid-cols-2 gap-3.5">
                {documentsToDisplay.map((doc) => (
                  <div
                    key={doc}
                    className="bg-white rounded-xl p-3.5 border border-silver/40 flex items-start gap-3 text-sm text-slate-700"
                  >
                    <i className="fa-solid fa-file-circle-check text-leaf mt-0.5 text-base shrink-0"></i>
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
