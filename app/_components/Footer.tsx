'use client';

import Link from 'next/link';
import {
  IconBrandX,
  IconBrandYoutube,
  IconBrandInstagram,
} from '@tabler/icons-react';
import { Github, Linkedin } from 'lucide-react';

const footerLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Privacy', path: '/privacy' },
  { name: 'Terms', path: '/terms' },
];

const socialLinks = [
  {
    name: 'X',
    path: 'https://x.com',
    icon: IconBrandX,
  },
  {
    name: 'YouTube',
    path: 'https://youtube.com',
    icon: IconBrandYoutube,
  },
  {
    name: 'Instagram',
    path: 'https://instagram.com',
    icon: IconBrandInstagram,
  },
  {
    name: 'GitHub',
    path: 'https://github.com',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    path: 'https://linkedin.com',
    icon: Linkedin,
  },
];

export default function Footer() {
  return (
    <footer className='border-t mt-10'>
      <div className='max-w-7xl mx-auto px-5 py-10 space-y-10'>
        {/* Subscribe + Follow Us (Top) */}
        <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
          {/* Subscribe */}
          <div className='flex flex-col md:flex-row items-center gap-4'>
            <h3 className='font-semibold text-lg whitespace-nowrap'>
              Subscribe to the latest update
            </h3>

            <div className='flex w-full max-w-md gap-2'>
              <input
                type='email'
                placeholder='Enter your email'
                className='flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500'
              />
              <button className='border rounded-md px-4 py-2 text-sm hover:bg-muted transition whitespace-nowrap'>
                Subscribe
              </button>
            </div>
          </div>

          {/* Follow Us */}
          <div className='flex items-center gap-4'>
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.path}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={social.name}
                  className='text-muted-foreground transition duration-300 hover:scale-110'
                >
                  <Icon size={19} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom Section */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-start'>
          {/* Contact Us */}
          <div className='text-sm space-y-2 text-center md:text-left'>
            <h3 className='font-semibold text-base'>Contact Us</h3>
            <p className='text-muted-foreground'>
              Email:{' '}
              <a
                href='mailto:support@findingneverland.com'
                className='hover:font-bold'
              >
                support@findingneverland.com
              </a>
            </p>
          </div>

          {/* Links + Copyright */}
          <div className='flex flex-col items-center md:items-end gap-4 text-sm'>
            <div className='flex flex-wrap justify-center md:justify-end gap-4'>
              {footerLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className='hover:font-bold'
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className='text-sm text-muted-foreground'>
              © {new Date().getFullYear()} Finding Neverland.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
