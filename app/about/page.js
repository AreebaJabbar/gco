import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import Link from 'next/link';

export const metadata = {
  title: 'About Us | GCO Foundation Pakistan',
  description:
    'Global Connection Welfare Organization (GCWO) is a registered, non-profit, non-political Christian welfare and development organization based in Gujranwala, Punjab, Pakistan.',
};

export default function AboutPage() {
  const whyWeWorkBullets = [
    'Many children are deprived of quality education and a safe childhood.',
    'Families working in brick kilns face debt bondage and exploitation.',
    'Elderly people experience neglect, loneliness, and a lack of proper care.',
    'Women face limited access to education, employment, and financial independence.',
    'Poor families struggle to access healthcare and essential services.',
  ];

  const howWeWorkSteps = [
    {
      num: '1',
      title: 'Identify Real Needs',
      desc: 'We visit communities, meet vulnerable families, and assess their actual needs.',
      icon: 'fa-magnifying-glass-location',
    },
    {
      num: '2',
      title: 'Mobilize Support',
      desc: 'We connect with generous donors, supporters, churches, and partners to raise resources.',
      icon: 'fa-handshake-angle',
    },
    {
      num: '3',
      title: 'Deliver Direct Assistance',
      desc: 'We provide support directly to deserving individuals and families through our projects.',
      icon: 'fa-box-heart',
      fallbackIcon: 'fa-hand-holding-heart',
    },
    {
      num: '4',
      title: 'Share Progress Reports',
      desc: 'We provide photographs, videos, and project updates to donors and supporters, subject to appropriate consent and privacy protections.',
      icon: 'fa-file-lines',
    },
  ];

  const coreValues = [
    {
      title: 'Compassion',
      desc: 'Serving everyone with love and kindness.',
      icon: 'fa-heart',
    },
    {
      title: 'Dignity',
      desc: 'Respecting every human being.',
      icon: 'fa-hand-holding-heart',
    },
    {
      title: 'Faith',
      desc: 'Following Christian principles of love, service, and hope.',
      icon: 'fa-cross',
    },
    {
      title: 'Equality',
      desc: 'Helping people without discrimination.',
      icon: 'fa-scale-balanced',
    },
    {
      title: 'Transparency',
      desc: 'Maintaining accountability and responsible use of donations.',
      icon: 'fa-shield-halved',
    },
    {
      title: 'Empowerment',
      desc: 'Creating opportunities for sustainable and independent living.',
      icon: 'fa-seedling',
    },
  ];

  return (
    <>
      <PageHero
        title="About Us"
        bgImage="/assets/hero-about-bg.jpg"
        bgAlt="Global Connection Welfare Organization community outreach and care in Pakistan"
        bgPosition="center 52%"
      />

      {/* WHO WE ARE (PDF Section 2: Page 3) */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle eyebrow="Our Identity" title="Who We Are" align="left" />
              <div className="space-y-4 text-slate-700 text-[15.5px] leading-[1.85] mt-6">
                <p>
                  Global Connection Welfare Organization (GCWO) is a registered, non-profit, non-political Christian welfare and development organization based in Gujranwala, Punjab, Pakistan.
                </p>
                <p>
                  Since 2014, we have been working to support vulnerable and marginalized communities through humanitarian assistance, education, healthcare, shelter, spiritual guidance, and community development.
                </p>
                <p>
                  Our services are provided to people in need without discrimination based on  caste, ethnicity, or social background. We believe that every human being deserves love, respect, dignity, and equal opportunities.
                </p>
                <p className="font-semibold text-navy">
                  Our mission is guided by Christian values of compassion, kindness, service, and love for humanity.
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border-4 border-white ring-1 ring-silver/50 card-shadow bg-white">
              <img
                src="/assets/about-story.jpg"
                alt="Who We Are - Global Connection Welfare Organization"
                className="w-full h-80 md:h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* WHY WE WORK (PDF Section 2: Page 3 - 4) */}
      <section className="py-16 md:py-24 bg-bgsoft border-y border-silver/30">
        <div className="max-w-[1180px] mx-auto px-6">
          <SectionTitle eyebrow="Our Cause" title="Why We Work" />
          <p className="text-slate-700 text-base md:text-lg text-center max-w-3xl mx-auto mt-6 mb-10 leading-relaxed">
            Across Pakistan, many vulnerable communities continue to face poverty, illiteracy, social injustice, and a lack of basic opportunities.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {whyWeWorkBullets.map((bullet) => (
              <div
                key={bullet}
                className="bg-white rounded-2xl p-6 border border-silver/40 card-shadow flex gap-3.5 items-start"
              >
                <i className="fa-solid fa-circle-check text-leaf mt-1 text-base shrink-0"></i>
                <p className="text-slate-700 text-sm leading-relaxed">{bullet}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 max-w-3xl mx-auto bg-white rounded-2xl p-8 border border-silver/40 card-shadow text-center space-y-3">
            <p className="text-slate-800 font-medium text-base md:text-lg leading-relaxed">
              We believe that everyone deserves an opportunity to live a safe, healthy, and dignified life.
            </p>
            <p className="text-navy font-bold text-base md:text-lg leading-relaxed">
              Our purpose is to become a source of hope and positive change for those who need support the most.
            </p>
          </div>
        </div>
      </section>

      {/* HOW WE WORK (PDF Section 2: Page 4) */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1180px] mx-auto px-6">
          <SectionTitle eyebrow="Our Approach" title="How We Work" />
          <p className="text-slate-600 text-center max-w-2xl mx-auto mt-4 mb-12 text-sm md:text-base">
            We follow a transparent and community-focused approach to humanitarian service.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howWeWorkSteps.map((step) => (
              <div
                key={step.num}
                className="bg-white rounded-2xl p-7 border border-silver/40 card-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-brand text-white flex items-center justify-center text-xl mb-4 shadow-sm">
                    <i className={`fa-solid ${step.fallbackIcon || step.icon}`}></i>
                  </div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Step {step.num}
                  </div>
                  <h3 className="font-display font-bold text-lg text-navy mb-3">
                    {step.num}. {step.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR MISSION & OUR VISION (PDF Section 2: Page 4) */}
      <section className="py-16 md:py-24 bg-bgsoft border-y border-silver/30">
        <div className="max-w-[1180px] mx-auto px-6 grid md:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="rounded-2xl p-8 md:p-10 bg-white border border-silver/40 card-shadow">
            <div className="w-12 h-12 rounded-2xl bg-leaf text-white flex items-center justify-center text-xl mb-4">
              <i className="fa-solid fa-bullseye"></i>
            </div>
            <span className="text-leaf font-bold text-xs tracking-wider uppercase block mb-2 font-display">
              Guiding Purpose
            </span>
            <h3 className="text-navy font-bold text-2xl mb-4 font-display">Our Mission</h3>
            <p className="text-slate-700 text-[15px] leading-[1.85]">
              To serve orphaned children, vulnerable elderly people, brick kiln families, disadvantaged women, and underprivileged communities with love, dignity, and compassion by providing food, shelter, education, healthcare, empowerment opportunities, freedom from bonded labour, free emergency ambulance service, and outreach support to unreached villages and families in need.
            </p>
          </div>

          {/* Vision */}
          <div className="rounded-2xl p-8 md:p-10 bg-white border border-silver/40 card-shadow">
            <div className="w-12 h-12 rounded-2xl bg-brand text-white flex items-center justify-center text-xl mb-4">
              <i className="fa-solid fa-eye"></i>
            </div>
            <span className="text-brand font-bold text-xs tracking-wider uppercase block mb-2 font-display">
              Long-term Vision
            </span>
            <h3 className="text-navy font-bold text-2xl mb-4 font-display">Our Vision</h3>
            <p className="text-slate-700 text-[15px] leading-[1.85]">
              A world where no child goes to sleep hungry, no elderly person feels abandoned, no woman feels helpless, no family lives under the burden of slavery or exploitation, no sick or injured person suffers for lack of transport, and no village remains unreached by love, prayer, and help.
            </p>
          </div>
        </div>
      </section>

      {/* OUR CORE VALUES (PDF Section 2: Page 4 - 5) */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1180px] mx-auto px-6">
          <SectionTitle eyebrow="What We Stand For" title="Our Core Values" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {coreValues.map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-2xl p-7 border border-silver/40 card-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-brand/10 text-brand flex items-center justify-center text-xl mb-4">
                  <i className={`fa-solid ${v.icon}`}></i>
                </div>
                <h4 className="text-navy font-bold text-lg mb-2 font-display">{v.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link href="/donate" className="btn-primary px-8 py-3 text-sm inline-flex items-center gap-2">
              <i className="fa-solid fa-heart"></i> Support Our Cause
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
