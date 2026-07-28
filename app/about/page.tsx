import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | AI Trip Planner',
  description:
    'Learn more about AI Trip Planner — our mission, vision, and how we help travelers plan smarter trips in minutes.',
};

export default function About() {
  return (
    <main className='mx-auto max-w-5xl px-6 py-20'>
      {/* Header */}
      <section className='mb-16 text-center'>
        <h2 className='mb-4 text-3xl font-bold tracking-tight'>
          About Finding Neverland
        </h2>
      </section>

      {/* Intro */}
      <section className='mb-16 space-y-6'>
        <p className='text-base leading-relaxed text-muted-foreground'>
          <span className='font-medium text-foreground'>AI Trip Planner</span>{' '}
          helps you plan smarter trips in less time. Instead of juggling maps,
          notes, and endless tabs, you tell us your destination, dates, budget,
          and travel style — and our AI creates a personalized itinerary for you
          in seconds.
        </p>
        <p className='text-base leading-relaxed text-muted-foreground'>
          Built for modern travelers, AI Trip Planner combines intelligent
          recommendations, interactive maps, and flexible itinerary management
          to turn travel ideas into real, usable plans.
        </p>
      </section>

      <hr className='my-16 border-border/50' />

      {/* Mission */}
      <section className='mb-16'>
        <h2 className='mb-4 text-2xl font-semibold'>Our Mission</h2>
        <p className='max-w-3xl text-base text-muted-foreground'>
          Make travel planning{' '}
          <span className='font-medium text-foreground'>
            fast, simple, and personal
          </span>
          . We use AI to turn ideas into smart itineraries — so you spend less
          time planning and more time traveling.
        </p>
      </section>

      {/* Vision */}
      <section className='mb-16'>
        <h2 className='mb-4 text-2xl font-semibold'>Our Vision</h2>
        <p className='max-w-3xl text-base text-muted-foreground'>
          A world where{' '}
          <span className='font-medium text-foreground'>
            anyone can plan a great trip in minutes
          </span>
          . AI Trip Planner aims to be your go-to travel companion, adapting to
          your style and helping you explore with confidence.
        </p>
      </section>

      <hr className='my-16 border-border/50' />

      {/* Why */}
      <section className='mb-16'>
        <h2 className='mb-6 text-2xl font-semibold'>Why AI Trip Planner?</h2>
        <ul className='grid gap-4 sm:grid-cols-2'>
          <li className='rounded-xl border border-border/50 p-5'>
            ⚡ <span className='font-medium'>Instant itineraries</span> tailored
            to your preferences
          </li>
          <li className='rounded-xl border border-border/50 p-5'>
            🧭 <span className='font-medium'>Smart recommendations</span> based
            on real travel data
          </li>
          <li className='rounded-xl border border-border/50 p-5'>
            🗺️ <span className='font-medium'>Interactive maps</span> for clear,
            visual planning
          </li>
          <li className='rounded-xl border border-border/50 p-5'>
            🔄 <span className='font-medium'>Flexible plans</span> that adapt as
            your trip changes
          </li>
        </ul>
      </section>

      {/* CTA */}
      <section className='rounded-2xl border border-border/50 bg-muted/40 p-10 text-center'>
        <h3 className='mb-3 text-2xl font-semibold'>Start Planning Smarter</h3>
        <p className='mb-6 text-muted-foreground'>
          Your next trip doesn’t need weeks of planning. Let AI Trip Planner
          handle the details.
        </p>
        <a
          href='/create-new-trip'
          className='inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90'
        >
          Plan your trip in minutes
        </a>
      </section>
    </main>
  );
}
