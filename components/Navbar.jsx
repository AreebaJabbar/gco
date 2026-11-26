'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { navItems, site } from '@/lib/site';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close drawer on path change or escape
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  // Hide public navbar on all admin routes (placed after hooks to prevent hook count mismatch)
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between h-18 sm:h-20 md:h-24 gap-2 sm:gap-4">
        {/* Logo & Foundation Name */}
        <Link href="/" className="flex items-center gap-1.5 sm:gap-3 shrink-0 min-w-0">
          <Image
            src="/assets/logo.png"
            alt={`${site.name} ${site.country}`}
            width={80}
            height={80}
            className="object-contain w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full shrink-0"
            priority
          />
          <div className="leading-tight">
            <div className="font-display font-bold text-[11px] sm:text-base md:text-lg text-navy tracking-tight">
              Global Connection
              <span className="text-leaf block text-[10px] sm:text-sm md:text-base font-semibold">
                Welfare Organization
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links (>= lg: 1024px) */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link font-medium py-1 ${
                isActive(item.href) ? 'active text-navy font-semibold' : 'text-slate-700 hover:text-navy'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Action Buttons & Mobile Hamburger */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Desktop Only: Donate Now Button (>= lg: 1024px) */}
          <Link
            href="/donate"
            className="hidden lg:inline-flex items-center gap-2 btn-primary text-xs md:text-sm px-4 md:px-5 py-2 md:py-2.5 rounded-lg shadow-sm font-semibold"
          >
            <i className="fa-solid fa-heart"></i>
            <span>Donate Now</span>
          </Link>

          {/* Login as Admin Button (Visible on Mobile, Tablet, and Desktop) */}
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-1 sm:gap-2 btn-primary text-[11px] sm:text-xs md:text-sm font-semibold px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-lg shadow-sm whitespace-nowrap"
          >
            <i className="fa-solid fa-user text-[10px] sm:text-xs"></i>
            <span>Login as Admin</span>
          </Link>

          {/* Hamburger Menu Button (< lg: 1024px) */}
          <button
            type="button"
            className="lg:hidden text-navy p-1 sm:p-2 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            <i className={`fa-solid ${open ? 'fa-xmark' : 'fa-bars'} text-xl sm:text-2xl block`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu (< lg) */}
      {open && (
        <>
          <div
            className="fixed inset-0 top-18 sm:top-20 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="relative z-50 lg:hidden border-t border-slate-100 px-4 sm:px-6 py-4 flex flex-col gap-3 bg-white text-sm shadow-xl animate-in slide-in-from-top-2 duration-150">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`font-medium py-2 px-2 rounded-md transition-colors ${
                  isActive(item.href) ? 'bg-bgsoft text-navy font-bold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5 mt-1">
              <Link
                href="/donate"
                onClick={() => setOpen(false)}
                className="btn-primary text-center px-4 py-2.5 inline-flex items-center justify-center gap-2 rounded-lg font-semibold text-sm"
              >
                <i className="fa-solid fa-heart"></i> Donate Now
              </Link>
              <Link
                href="/admin/login"
                onClick={() => setOpen(false)}
                className="btn-primary text-center px-4 py-2.5 inline-flex items-center justify-center gap-2 rounded-lg font-semibold text-sm"
              >
                <i className="fa-solid fa-user"></i> Login as Admin
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
