import Link from 'next/link';
import { Logo } from './Logo';

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
        { name: 'Contact', href: '/contact' },
        { name: 'Privacy', href: '/privacy' },
        { name: 'Terms', href: '/terms' },
      ],
    },
  ];

  return (
    <footer className="bg-elevated border-t border-default pt-12 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Logo size={32} />
              <span className="font-bold text-primary">Spirit Numeral</span>
            </Link>
            <p className="text-muted text-sm mt-3 max-w-xs">
              Numerology and angel number meanings for your spiritual path.
            </p>
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
          <div className="flex gap-6">
            <Link href="/privacy" className="text-muted text-xs hover:text-primary">Privacy</Link>
            <Link href="/terms" className="text-muted text-xs hover:text-primary">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
