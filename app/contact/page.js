import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';
import { site } from '@/lib/site';

export const metadata = {
  title: 'Contact | GCO Foundation Pakistan',
  description: `Contact ${site.fullName} in Gujranwala, Punjab.`,
};

export default function ContactPage() {
  const cards = [
    { icon: 'fa-location-dot', t: 'Our Address', v: site.address, c: 'bg-navy' },
    { icon: 'fa-phone', t: 'Phone Number', v: site.phone, href: `tel:${site.phoneHref}`, c: 'bg-leaf' },
    { icon: 'fa-envelope', t: 'Email Address', v: site.email, href: `mailto:${site.email}`, c: 'bg-navy' },
  ];

  return (
    <>
      <PageHero
        title="Get in Touch"
        bgImage="/assets/hero-contact-bg.jpg"
        bgAlt="Compassionate care and community support at GCO Foundation Pakistan"
        bgPosition="center 45%"
      />

      <section className="py-10 sm:py-14 px-4 sm:px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr,380px] gap-8 lg:gap-10">
        <div className="rounded-2xl p-6 sm:p-8 card-shadow border border-slate-100 bg-white">
          <h3 className="font-display font-bold text-xl sm:text-2xl mb-1 text-navy">Send Us a Message</h3>
          <div className="w-10 h-0.5 mb-6 bg-silver"></div>
          <ContactForm />
        </div>

        <aside>
          <h3 className="font-display font-bold text-xl sm:text-2xl mb-1 text-navy">Contact Information</h3>
          <div className="w-10 h-0.5 mb-6 bg-silver"></div>
          <div className="space-y-4">
            {cards.map((c) => (
              <div key={c.t} className="flex gap-4 rounded-xl border border-slate-100 p-4 sm:p-5 card-shadow bg-white items-start">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center text-white shrink-0 ${c.c}`}>
                  <i className={`fa-solid ${c.icon}`}></i>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-sm sm:text-base text-navy">{c.t}</div>
                  {c.href ? (
                    <a href={c.href} className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed block break-all hover:text-navy font-medium">
                      {c.v}
                    </a>
                  ) : (
                    <div className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">{c.v}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
        <div className="rounded-2xl overflow-hidden card-shadow border border-slate-100 h-72 sm:h-80 md:h-96">
          <iframe
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
            title="Location Map"
            src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`}
          ></iframe>
        </div>
      </section>
    </>
  );
}
