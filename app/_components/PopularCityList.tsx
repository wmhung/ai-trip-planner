'use client';

import React from 'react';
import { Carousel, Card } from '@/components/ui/apple-cards-carousel';

/* ---------------------------------------
 * Main Component
 * ------------------------------------- */
export function PopularCityList() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <section className='w-full h-full py-20'>
      <h2 className='max-w-7xl pl-4 mx-auto text-2xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 text-center'>
        Popular destinations to inspire your next trip
      </h2>
      <Carousel items={cards} />
    </section>
  );
}

/* ---------------------------------------
 * Reusable Content Component
 * ------------------------------------- */
type DummyContentProps = {
  headline: string;
  description: string;
  image: string;
};

const DummyContent = ({ headline, description, image }: DummyContentProps) => {
  return (
    <div className='bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl'>
      <h3 className='text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 mb-4'>
        {headline}
      </h3>

      <p className='text-neutral-600 dark:text-neutral-400 text-base md:text-xl max-w-3xl mb-6'>
        {description}
      </p>

      <img
        src={image}
        alt={headline}
        className='w-full h-[400px] mx-auto rounded-xl object-cover'
      />
    </div>
  );
};

/* ---------------------------------------
 * Data Source (Modified Content)
 * ------------------------------------- */
const data = [
  {
    category: 'Biei, Japan',
    title: 'Nature, snow, and seasonal beauty',
    src: 'https://images.unsplash.com/photo-1648131128130-e9b10c6b21c8?q=80&w=1200&auto=format&fit=crop',
    content: (
      <DummyContent
        headline='Discover Hokkaido'
        description='From powder snow in Niseko to lavender fields in Furano, Hokkaido offers breathtaking nature, fresh seafood, and a slower pace of travel throughout every season.'
        image='https://images.unsplash.com/photo-1694155011869-6ec870281cfa?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?q=80&w=1200&auto=format&fit=crop'
      />
    ),
  },
  {
    category: 'Hawaii, USA',
    title: 'Island life and aloha spirit',
    src: 'https://images.unsplash.com/photo-1509934053274-6ef492293340?q=80&w=1200&auto=format&fit=crop',
    content: (
      <DummyContent
        headline='Experience Hawaii'
        description='Relax on golden beaches, hike volcanic landscapes, and enjoy ocean adventures while embracing the warm and welcoming aloha lifestyle.'
        image='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop'
      />
    ),
  },
  {
    category: 'Paris, France',
    title: 'Art, romance, and timeless charm',
    src: 'https://images.unsplash.com/photo-1566865204669-c7b93be298bd?q=80&w=1200&auto=format&fit=crop',
    content: (
      <DummyContent
        headline='Fall in Love with Paris'
        description='Stroll along the Seine, explore world-famous museums, and enjoy café culture in a city known for art, history, and romance.'
        image='https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop'
      />
    ),
  },
  {
    category: 'Venice, Italy',
    title: 'A city built on water',
    src: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=1200&auto=format&fit=crop',
    content: (
      <DummyContent
        headline='Explore Venice'
        description='Glide through historic canals, discover hidden piazzas, and experience the unique charm of one of the world’s most unforgettable cities.'
        image='https://plus.unsplash.com/premium_photo-1661953180092-94e620a0d1ba?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?q=80&w=1200&auto=format&fit=crop'
      />
    ),
  },
  {
    category: 'New York, USA',
    title: 'The city that never sleeps',
    src: 'https://images.unsplash.com/photo-1496588152823-86ff7695e68f?q=80&w=1200&auto=format&fit=crop',
    content: (
      <DummyContent
        headline='Experience New York'
        description='From iconic skylines and Broadway shows to diverse neighborhoods and global cuisine, New York delivers nonstop energy and inspiration.'
        image='https://images.unsplash.com/photo-1587161584760-f51779fb276a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?q=80&w=1200&auto=format&fit=crop'
      />
    ),
  },
  {
    category: 'Copenhagen, Denmark',
    title: 'Nordic design and cozy living',
    src: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?q=80&w=1200&auto=format&fit=crop',
    content: (
      <DummyContent
        headline='Discover Copenhagen'
        description='Enjoy bike-friendly streets, modern Scandinavian design, and cozy cafés while exploring one of Europe’s most livable cities.'
        image='https://images.unsplash.com/photo-1563786785225-620a2528d611?q=80&w=1180&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?q=80&w=1200&auto=format&fit=crop'
      />
    ),
  },
];
