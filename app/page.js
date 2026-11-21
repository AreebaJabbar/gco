export const dynamic = 'force-dynamic';

import Link from 'next/link';
import SectionTitle from '@/components/SectionTitle';
import AppealTable from '@/components/AppealTable';
import { getProjects } from '@/lib/db-projects';
import { site, appeal, appealTotals, fmt } from '@/lib/site';

export default async function HomePage() {
  const allProjects = await getProjects();
  const total = appealTotals();
  const stats = [
    { n: String(site.daughters), l: 'Daughters in our home' },
    { n: String(allProjects.length), l: 'Active welfare projects' },
    { n: `PKR ${fmt(total.pkr)}`, l: 'Christmas appeal target' },
    { n: 'Gujranwala', l: 'Punjab, Pakistan' },
  ];

  // 7 projects highlighted in Section 1 of Final Written Website Material
  const homeProjects = [
    {
      num: '1',
      title: 'Source of Life Friendly Church',
      desc: 'Promoting faith, spiritual growth, worship, and fellowship through church services, Bible studies, and community outreach.',
      icon: 'fa-church',
    },
    {
      num: '2',
      title: 'Source of Life Friendly Home Orphanage',
      desc: 'Providing orphaned children with shelter, nutritious food, education, healthcare, protection, and loving care.',
      icon: 'fa-house',
    },
    {
      num: '3',
      title: 'Source of Life Friendly Old Age Home',
      desc: 'The building and material are already ready. We have not started yet because this project needs regular medical support, medicines, and care staff, which is very expensive in Pakistan.',
      icon: 'fa-person-cane',
    },
    {
      num: '4',
      title: 'Source of Life Friendly Brick Kiln Freedom Project',
      desc: 'Supporting families affected by bonded labour through freedom initiatives, education, vocational training, and healthcare.',
      icon: 'fa-dove',
    },
    {
      num: '5',
      title: 'Fullness Reformed Community Development Institute',
      desc: 'Empowering youth and women through computer education, English language courses, and vocational skills training.',
      icon: 'fa-chalkboard-user',
    },
    {
      num: '6',
      title: 'Source of Life Friendly Outreach',
      desc: 'Brings love, prayer and practical help to families and villages through evangelism, prayer visits, food and Bible distribution, health and education awareness, support for widows, disabled and homeless families, youth fellowship, and emergency relief.',
      icon: 'fa-hands-holding-child',
    },
    {
      num: '7',
      title: 'Free Ambulance Service – Saving Lives in Time',
      desc: 'Provides fast, free, 24/7 emergency transport with first aid for poor families, orphans, elderly, pregnant women, children, accident victims, brick kiln workers and villagers, in coordination with local hospitals, to save lives with love, speed and dignity, free of cost.',
      icon: 'fa-truck-medical',
    },
  ];

  return (
    <>
      {/* HERO SECTION - PDF Section 1: Headline & Subheading */}
      <section className="relative overflow-hidden border-b-2 border-silver/40 bg-navy-dark">
        <img
          src="/assets/hero-home-bg.jpg"
          alt="Global Connection Welfare Organization"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(rgba(220,224,229,.10) 2px, transparent 2px), linear-gradient(105deg, rgba(1,22,72,0.90) 0%, rgba(6,36,99,0.72) 48%, rgba(5,78,160,0.40) 100%)',
            backgroundSize: '24px 24px, 100% 100%',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-5 py-20 md:py-28">
          <div className="max-w-3xl text-white">
            <div className="text-xs tracking-[3px] font-semibold text-silver-light mb-4 uppercase drop-shadow-sm">
              Global Connection Welfare Organization
            </div>
            <h1 className="font-display font-extrabold text-4xl md:text-6xl leading-tight drop-shadow-sm">
              Spreading Love, Restoring Hope, Transforming Lives
            </h1>
            <p className="text-slate-100 mt-5 max-w-2xl drop-shadow-sm text-base md:text-lg leading-relaxed">
              Serving vulnerable communities across Pakistan through education, shelter, healthcare, community development, and freedom from bonded labour.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <Link href="/donate" className="btn-primary px-7 py-3 inline-flex items-center gap-2">
                <i className="fa-solid fa-heart"></i> Donate Now
              </Link>
              <Link href="/projects" className="btn-outline-white px-7 py-3 inline-flex items-center gap-2">
                Our Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white shadow-md border-b border-silver/30 relative z-10">
        <div className="max-w-6xl mx-auto px-5 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.l}>
              <div className="text-2xl md:text-3xl font-display font-extrabold text-navy">{s.n}</div>
              <div className="text-muted text-sm mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* OUR JOURNEY – SERVING SINCE 2014 (PDF Page 1) */}
      <section className="py-16 px-5 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
            <span className="eyebrow">Serving Since 2014</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-navy mb-4">
              Our Journey – Serving Since 2014
            </h2>
            <p>
              Global Connection Welfare Organization (GCWO) has been serving vulnerable communities in Pakistan since 2014 with a heartfelt commitment to helping the poor, the forgotten, and the oppressed.
            </p>
            <p>
              Our journey began in the rural areas of Punjab with simple yet meaningful initiatives, including Bible distribution, food assistance for hungry families, and free education for underprivileged children who had little or no access to schooling.
            </p>
            <p>
              With limited resources but strong faith and determination, we travelled from village to village and brick kiln to brick kiln, sharing love, hope, compassion, and the Word of God.
            </p>
            <p>
              In 2023, by the grace of God, we officially established our organization and developed our own centre, marking an important milestone in our journey.
            </p>
            <p>
              Today, our organization operates several humanitarian initiatives, including a Church Ministry, Orphanage, Old Age Home, Community Development Centre, Free Ambulance Service, Outreach Program
            </p>
            <p>
              We are also actively working in brick kiln communities through various outreach initiatives, helping families overcome bonded labour, providing free education to children, empowering women through vocational training, and offering medical assistance to vulnerable communities.
            </p>
            <p className="font-semibold text-navy">
              Our commitment is to continue transforming lives through compassion, service, faith, and sustainable development.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border-4 border-white ring-1 ring-silver/50 card-shadow bg-white">
              <img
                src="/assets/about-story.jpg"
                alt="Our Journey – Serving Since 2014"
                className="w-full h-80 lg:h-[420px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* OUR MAIN OBJECTIVE (PDF Page 1 - 2) */}
      <section className="py-14 px-5 bg-bgsoft border-y border-silver/30">
        <div className="max-w-5xl mx-auto text-center">
          <span className="eyebrow">Purpose &amp; Goals</span>
          <h2 className="font-display font-bold text-3xl text-navy mb-6">Our Main Objective</h2>
          <div className="bg-white rounded-2xl p-8 md:p-10 card-shadow border border-silver/40 text-left space-y-4">
            <p className="text-slate-700 text-base md:text-lg leading-relaxed">
              To uplift the most vulnerable people in Pakistan, including orphaned children, neglected elderly people, families affected by bonded labour, disadvantaged women, and underprivileged communities.
            </p>
            <p className="text-slate-700 text-base md:text-lg leading-relaxed">
              We strive to provide essential needs, education, healthcare, shelter, freedom, and opportunities for empowerment so that every individual can live with dignity, independence, and hope for a better future.
            </p>
          </div>
        </div>
      </section>

      {/* OUR PROJECTS - Section 1: Serving With Love – Our 7 Life-Changing Projects */}
      <section className="py-16 px-5 max-w-7xl mx-auto">
        <SectionTitle eyebrow="What We Do" title="Serving With Love – Our 7 Life-Changing Projects" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {homeProjects.map((p) => (
            <div
              key={p.num}
              className="bg-white rounded-2xl p-6 border border-silver/40 card-shadow flex flex-col justify-between hover:border-brand/40 transition-colors"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-brand text-white flex items-center justify-center text-xl mb-4 shadow-sm">
                  <i className={`fa-solid ${p.icon}`}></i>
                </div>
                <h3 className="font-display font-bold text-lg text-navy mb-2">
                  {p.num}. {p.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">{p.desc}</p>
              </div>
              <Link
                href="/projects"
                className="text-sm font-semibold mt-4 pt-3 border-t border-slate-100 inline-flex items-center gap-1.5 text-brand hover:text-navy transition-colors"
              >
                <span>Learn More</span>
                <i className="fa-solid fa-arrow-right text-xs"></i>
              </Link>
            </div>
          ))}
          <div className="bg-navy rounded-2xl p-6 text-white flex flex-col justify-between shadow-lg">
            <div>
              <span className="text-silver-light font-bold text-xs uppercase tracking-wider block mb-2 font-display">
                Explore All 7 Initiatives
              </span>
              <h3 className="font-display font-bold text-xl mb-3">All Our Projects</h3>
              <p className="text-slate-200 text-sm leading-relaxed">
                Discover our full range of 7 projects including Church Ministry, Orphanage, Old Age Home, Brick Kiln Freedom, Community Development, Outreach Ministry, and Free Ambulance Service.
              </p>
            </div>
            <Link
              href="/projects"
              className="btn-outline-white text-center py-2.5 mt-5 inline-flex items-center justify-center gap-2 text-sm"
            >
              <span>View All Projects</span>
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* A MESSAGE FROM OUR FOUNDER (PDF Page 2 - 3) */}
      <section className="py-16 px-5 bg-bgsoft border-y border-silver/30">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 md:p-12 card-shadow border border-silver/40">
          <div className="max-w-3xl">
            <span className="eyebrow">Leadership</span>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-navy mb-2">
              A Message from Our Founder
            </h2>
            <div className="text-slate-700 text-sm font-semibold mb-6">
              Pastor Qaiser Saleem<br />
              Founder &amp; President / CEO<br />
              Global Connection Welfare Organization
            </div>

            <div className="space-y-4 text-slate-700 text-sm md:text-base leading-relaxed border-l-4 border-brand pl-5">
              <p className="font-semibold text-navy">God bless you!</p>
              <p>My name is Pastor Qaiser Saleem, and I am from Gujranwala, Pakistan.</p>
              <p>
                When I witnessed a brick kiln child with wounded hands, an elderly mother abandoned on the roadside, and an orphaned girl without food, my heart was deeply moved. I prayed, &quot;God, make me a channel of Your love and blessings.&quot;
              </p>
              <p>From that prayer, Global Connection Welfare Organization was born.</p>
              <p>
                We started with one meal, one child, and one family. Through God&apos;s grace, our work has grown into seven areas of service: Church Ministry, Orphanage, Old Age Home, Brick Kiln Freedom Project, Community Development Centre, Free Medical Ambulance Service, and Outreach Programs.
              </p>
              <p>
                My dream is simple: No child should go hungry, no elderly person should feel alone, no family should live in slavery, and every woman should have the opportunity to become financially independent.
              </p>
              <p>I cannot achieve this mission alone. I need your prayers, love, generosity, and support.</p>
              <p className="font-semibold text-navy">
                Together, we can change lives – one heart, one life, and one act of kindness at a time.
              </p>
              <p className="font-bold text-navy pt-2">Pastor Qaiser Saleem</p>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION (PDF Page 3) */}
      <section className="py-16 px-5">
        <div className="max-w-5xl mx-auto rounded-3xl p-8 md:p-12 text-center bg-navy text-white shadow-xl relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-silver-light font-bold text-xs uppercase tracking-widest block mb-3 font-display">
              Call to Action
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl mb-4">
              Be the Reason Someone Smiles Today!
            </h2>
            <p className="text-slate-200 text-base md:text-lg leading-relaxed mb-8">
              Your support can provide food, education, shelter, healthcare, and hope to someone in need.
            </p>
            <Link
              href="/donate"
              className="bg-leaf hover:bg-leaf-dark text-white font-bold text-base px-8 py-3.5 rounded-lg shadow-lg inline-flex items-center gap-2 transition-transform hover:-translate-y-0.5"
            >
              <i className="fa-solid fa-heart"></i> Donate Now
            </Link>
          </div>
        </div>
      </section>

      {/* CHRISTMAS APPEAL */}
      <section className="py-16 px-5 max-w-5xl mx-auto border-t border-silver/30">
        <SectionTitle eyebrow="Christmas 2026" title={appeal.title} />
        <p className="text-slate-600 leading-relaxed text-center max-w-3xl mx-auto mt-6 mb-8">
          We humbly invite you to share the joy of Christmas with {appeal.forWhom}, by providing new clothes, warm wear and a special festive celebration. Contribute whatever you can easily give.
        </p>
        <AppealTable />
        <div className="text-center mt-8">
          <Link href="/donate" className="btn-primary px-7 py-3 inline-flex items-center gap-2">
            <i className="fa-solid fa-heart"></i> I Want to Help
          </Link>
        </div>
      </section>
    </>
  );
}
