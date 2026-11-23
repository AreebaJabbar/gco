'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { site, navItems } from '@/lib/site';
import { projects } from '@/lib/projects';

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on all admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="pt-10 sm:pt-14 pb-6 px-4 sm:px-6 lg:px-8 bg-navy-dark text-slate-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 text-sm">
        <div>
          <Link href="/" className="flex items-center gap-3 mb-3">
            <span className="rounded-full bg-navy ring-1 ring-silver/50 p-0.5 shrink-0">
              <Image
                src="/assets/logo.png"
                alt={site.name}
                width={52}
                height={52}
                className="w-12 h-12 rounded-full object-contain"
              />
            </span>
            <div>
              <div className="font-display font-bold text-white text-base">
                GCO <span className="text-silver-light">Foundation</span>
              </div>
              <div className="text-[10px] text-slate-400">{site.fullName}</div>
            </div>
          </Link>
          <p className="text-slate-400 leading-relaxed text-xs sm:text-sm">
            {site.tagline} A non-profit welfare organization working in {site.location} to serve orphan children, elders, brick kiln families, women and communities.
          </p>
        </div>

        <div>
          <div className="text-white font-display font-semibold mb-3">Quick Links</div>
          <ul className="space-y-2 text-xs sm:text-sm">
            {navItems.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-white transition-colors">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/donate" className="hover:text-white transition-colors font-medium text-emerald-400">
                Donate Now
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-white font-display font-semibold mb-3">Our Projects</div>
          <ul className="space-y-2 text-xs sm:text-sm">
            {projects.map((p) => (
              <li key={p.slug}>
                <Link href="/projects" className="hover:text-white transition-colors">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-white font-display font-semibold mb-3">Contact Us</div>
          <ul className="space-y-3 text-xs sm:text-sm">
            <li className="flex gap-2.5 items-start">
              <i className="fa-solid fa-phone mt-1 text-leaf-light shrink-0"></i>
              <a href={`tel:${site.phoneHref}`} className="hover:text-white">
                {site.phone}
              </a>
            </li>
            <li className="flex gap-2.5 items-start">
              <i className="fa-regular fa-envelope mt-1 text-leaf-light shrink-0"></i>
              <a href={`mailto:${site.email}`} className="hover:text-white break-all">
                {site.email}
              </a>
            </li>
            <li className="flex gap-2.5 items-start">
              <i className="fa-solid fa-location-dot mt-1 text-leaf-light shrink-0"></i>
              <span>{site.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 mt-10 pt-5 flex flex-col sm:flex-row items-center justify-between text-slate-400 text-xs gap-3 sm:gap-2 text-center sm:text-left">
        <div>
          &copy; {new Date().getFullYear()} {site.fullName} ({site.name} {site.country}). All Rights Reserved.
        </div>
        <div>{site.tagline}</div>
      </div>
    </footer>
  );
}
