import Link from 'next/link';
import { Logo } from './Logo';
import { DailyNumberSignup } from './DailyNumberSignup';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: 'Meanings',
      links: [
        { name: 'Meaning Hub', href: '/meaning' },
        { name: 'Angel Numbers', href: '/meaning/angel-number' },
        { name: 'Life Path Numbers', href: '/meaning/life-path' },
        { name: 'Twin Flame', href: '/twin-flame' },
        { name: 'Warnings', href: '/warning' },
      ],
    },
    {
      title: 'Topics',
      links: [
        { name: 'Money', href: '/money' },
        { name: 'Soulmate', href: '/soulmate' },
        { name: 'Breakup', href: '/breakup' },
        { name: 'Dreams', href: '/dreams' },
        { name: 'Psychic Readings', href: '/psychic-readings' },
      ],
    },
    {
      title: 'Tools',
      links: [
        { name: 'Life Path Calculator', href: '/calculator' },
        { name: 'Quiz', href: '/quiz' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About', href: '/about' },
        { name: 'Press Kit', href: '/press' },
        { name: 'Reviews', href: '/reviews' },
        { name: 'Contact', href: '/contact' },
        { name: 'Privacy', href: '/privacy' },
        { name: 'Terms', href: '/terms' },
      ],
    },
  ];

  const psychicOzLink = 'https://psychicoz.com?a_aid=697f030692a07';

  return (
    <footer className="bg-elevated border-t border-default pt-12 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <Logo size={32} />
              <span className="flex flex-col items-start leading-tight">
                <span className="text-base font-bold text-primary tracking-tight">Spirit</span>
                <span className="text-sm font-semibold text-primary/80 tracking-tight">Numeral</span>
              </span>
            </Link>
            <p className="text-muted text-sm mt-3 max-w-xs">
              Numerology and angel number meanings for your spiritual path.
            </p>
            <div className="mt-6">
              <DailyNumberSignup variant="inline" compact className="p-4" />
            </div>
          </div>
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-primary mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-secondary text-sm hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-default flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted text-xs">
            © {currentYear} Spirit Numeral. For entertainment and self-reflection only.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link href="/privacy" className="text-muted text-xs hover:text-primary">Privacy</Link>
            <Link href="/terms" className="text-muted text-xs hover:text-primary">Terms</Link>
            <Link href="/quick-report" className="text-muted text-xs hover:text-primary">Quick Report ($7)</Link>
            <a href={psychicOzLink} target="_blank" rel="noopener noreferrer sponsored" className="text-muted text-xs hover:text-amber-500 transition-colors">Psychic readings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
