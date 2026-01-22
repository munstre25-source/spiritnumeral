import Link from 'next/link';
import { Logo } from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: 'Meanings',
      links: [
        { name: 'Angel Numbers', href: '/meaning/angel-number/111' },
        { name: 'Life Path Numbers', href: '/meaning/life-path/life-path-1' },
        { name: 'Twin Flame Numbers', href: '/111-twin-flame' },
        { name: 'Spiritual Warnings', href: '/is-111-a-warning' },
      ],
    },
    {
      title: 'Tools',
      links: [
        { name: 'Life Path Calculator', href: '/calculator' },
        { name: 'Daily Predictions', href: '/' },
          { name: 'Personalized Reading', href: 'https://909dddwh682ivoeexkmjt5qacw.hop.clickbank.net/?cbpage=life-roadmap-37-Aff' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
      ],
    },
  ];

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-3 group">
              <Logo size={40} />
              <span className="text-xl font-bold bg-gradient-to-r from-amber-100 to-amber-500 bg-clip-text text-transparent tracking-tight">
                Spirit Numeral
              </span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
              Your spiritual guide to decoding the hidden messages of the universe through numerology and angel numbers.
            </p>
            <div className="flex space-x-4">
              {['Twitter', 'Instagram', 'YouTube'].map((social) => (
                <div
                  key={social}
                  className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:border-amber-500 transition-colors cursor-pointer group"
                >
                  <div className="w-4 h-4 bg-zinc-700 group-hover:bg-amber-500 transition-colors rounded-sm"></div>
                </div>
              ))}
            </div>
          </div>

          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-zinc-100 font-bold mb-6">{section.title}</h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-zinc-400 text-sm hover:text-amber-500 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Spiritual Disclaimer for EEAT */}
        <div className="mb-12 p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/50">
          <p className="text-zinc-500 text-[10px] md:text-xs leading-relaxed uppercase tracking-wider mb-2 font-bold">Spiritual Guidance Disclaimer</p>
          <p className="text-zinc-500 text-[10px] md:text-xs leading-relaxed">
            The interpretations and calculations provided by Spirit Numeral are for spiritual growth and entertainment purposes only. Numerology is a tool for self-reflection and should not be used as a substitute for professional medical, legal, financial, or psychological advice. We encourage you to use your own intuition and discernment when applying these insights to your life journey.
          </p>
        </div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-zinc-500 text-xs text-center md:text-left">
            © {currentYear} Spirit Numeral. All rights reserved.
          </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-zinc-500 hover:text-zinc-300 text-xs transition-colors">
                Privacy
              </Link>
            <Link href="/terms" className="text-zinc-500 hover:text-zinc-300 text-xs transition-colors">
              Terms
            </Link>
            <Link href="/about" className="text-zinc-500 hover:text-zinc-300 text-xs transition-colors">
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
