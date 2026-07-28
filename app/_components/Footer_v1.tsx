'use client';

import Image from 'next/image';
import Link from 'next/link';

const footerLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Privacy', path: '/privacy' },
  { name: 'Terms', path: '/terms' },
];

export default function Footer() {
  return (
    <footer className='border-t mt-10'>
      <div className='max-w-7xl mx-auto px-5 py-8 flex flex-col items-center text-center gap-6'>
        {/* Links */}
        <div className='flex flex-wrap justify-center gap-4 text-sm'>
          {footerLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className='hover:text-primary'
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Bottom Text */}
        <div className='text-sm text-muted-foreground'>
          © {new Date().getFullYear()} Finding Neverland.
        </div>
      </div>
    </footer>
  );
}
