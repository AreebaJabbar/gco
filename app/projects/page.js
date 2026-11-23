export const dynamic = 'force-dynamic';

import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { getProjects } from '@/lib/db-projects';
import { resolveImage } from '@/lib/media';

export const metadata = {
  title: 'Our Projects | GCO Foundation Pakistan',
  description:
    'Our Seven main projects are designed to address the essential needs of vulnerable communities and create lasting positive change.',
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <PageHero
        title="Our Projects"
        bgImage="/assets/hero-projects-bg.jpg"
        bgAlt="Our Projects - Global Connection Welfare Organization"
        bgPosition="center 25%"
      />

      <section className="py-12 sm:py-16 px-4 sm:px-6 max-w-7xl mx-auto space-y-12 sm:space-y-16">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-slate-700 text-sm sm:text-base md:text-lg font-medium leading-relaxed">
            Our Seven main projects are designed to address the essential needs of vulnerable communities and create lasting positive change.
          </p>
        </div>

        {projects.map((p, i) => {
          const img = resolveImage(p.image);
          const icon = p.icon || 'fa-hand-holding-heart';
          const highlights = Array.isArray(p.highlights) ? p.highlights : [];

          return (
            <div key={p.slug || p.id} className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-center">
              <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                {img ? (
                  <img
                    src={img}
                    alt={p.title}
                    className="rounded-2xl w-full h-56 sm:h-72 md:h-80 object-cover card-shadow border border-silver/30"
                  />
                ) : (
                  <div className="rounded-2xl w-full h-56 sm:h-72 md:h-80 card-shadow dots-bg bg-gradient-to-br from-navy to-brand flex items-center justify-center text-white/90 text-6xl sm:text-7xl">
                    <i className={`fa-solid ${icon}`}></i>
                  </div>
                )}
              </div>
              <div>
                <span
                  className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 ${
                    p.status === 'Appeal open'
                      ? 'bg-bgsilver text-navy border border-silver/70'
                      : 'bg-bggreen text-leaf border border-leaf/20'
                  }`}
                >
                  {p.status || 'Ongoing'}
                </span>
                <h2 className="font-display font-bold text-xl sm:text-2xl md:text-3xl mb-1 text-navy">
                  {p.title}
                </h2>
                {p.subtitle && (
                  <div className="text-brand font-semibold text-xs sm:text-sm mb-3">
                    {p.subtitle}
                  </div>
                )}
                <p className="text-slate-600 leading-relaxed mb-4 text-xs sm:text-sm md:text-base">
                  {p.description}
                </p>

                {highlights.length > 0 && (
                  <div className="mb-5">
                    {p.activityTitle && (
                      <div className="font-display font-bold text-xs uppercase tracking-wider text-slate-700 mb-2">
                        {p.activityTitle}
                      </div>
                    )}
                    <ul className="space-y-2">
                      {highlights.map((h) => (
                        <li key={h} className="flex gap-2.5 text-xs sm:text-sm text-slate-700">
                          <i className="fa-solid fa-circle-check mt-0.5 text-leaf shrink-0"></i>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {p.goalNote && (
                  <p className="text-xs sm:text-sm text-slate-500 italic mb-5 border-l-2 border-silver pl-3">
                    {p.goalNote}
                  </p>
                )}

                <Link
                  href="/donate"
                  className="w-full sm:w-auto btn-primary px-6 py-2.5 inline-flex items-center justify-center gap-2 text-xs sm:text-sm shadow-sm"
                >
                  <span>Support This Project</span>
                  <i className="fa-solid fa-arrow-right text-xs"></i>
                </Link>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
