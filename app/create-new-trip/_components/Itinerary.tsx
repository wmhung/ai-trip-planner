'use client';
import React, { useState, useEffect } from 'react';
import { Timeline } from '@/components/ui/timeline';
import HotelCardItem from './HotelCardItem';
import PlaceCardItem from './PlaceCardItem';
import { useTripDetail } from '@/app/provider';
import { TripInfo } from './ChatBox';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

// const TRIP_DATA = {
//   destination: 'Hiroshima, Japan',
//   duration: '6 days',
//   origin: 'Taipei, Taiwan',
//   budget: 'Average',
//   group_size: '4',
//   hotels: [
//     {
//       hotel_name: 'Hotel Granvia Hiroshima',
//       hotel_address:
//         '1-5 Matsubaracho, Minami Ward, Hiroshima, 732-0822, Japan',
//       price_per_night: 'Approx. $120 - $150 USD',
//       hotel_image_url:
//         'https://cf.bstatic.com/xdata/images/hotel/max1024x768/22523937.jpg',
//       geo_coordinates: {
//         latitude: 34.3956,
//         longitude: 132.4596,
//       },
//       rating: 4.3,
//       description:
//         'Located above Hiroshima Station, Hotel Granvia offers convenient accessibility with spacious, modern rooms and great city views. Ideal for families exploring Hiroshima.',
//     },
//     {
//       hotel_name: 'RIHGA Royal Hotel Hiroshima',
//       hotel_address: '6-78 Motomachi, Naka Ward, Hiroshima, 730-0011, Japan',
//       price_per_night: 'Approx. $110 - $140 USD',
//       hotel_image_url:
//         'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/e9/ff/f3/photo0jpg.jpg',
//       geo_coordinates: {
//         latitude: 34.3968,
//         longitude: 132.4581,
//       },
//       rating: 4.1,
//       description:
//         'A classic hotel with traditional Japanese hospitality, located near Peace Memorial Park with family-friendly amenities and comfortable rooms.',
//     },
//     {
//       hotel_name: 'Mitsui Garden Hotel Hiroshima',
//       hotel_address:
//         '1-2-1 Nishi-Kanyocho, Naka-ku, Hiroshima, 730-0015, Japan',
//       price_per_night: 'Approx. $90 - $120 USD',
//       hotel_image_url:
//         'https://cache.priceline.com/7/8dd9df43-b482-4109-acb7-45b63a7f24d8/09446-9fc9b2b8_z.jpg',
//       geo_coordinates: {
//         latitude: 34.3984,
//         longitude: 132.4605,
//       },
//       rating: 4,
//       description:
//         'A budget-friendly eco-hotel with modern décor located in central Hiroshima, offering easy access to major attractions and comfortable family rooms.',
//     },
//   ],
//   itinerary: [
//     {
//       day: 1,
//       day_plan: 'Arrival and local exploration',
//       best_time_to_visit_day: 'Afternoon and Evening',
//       activities: [
//         {
//           place_name: 'Hiroshima Peace Memorial Park',
//           place_details:
//             'A park dedicated to the legacy of Hiroshima as the first city in the world to suffer a nuclear attack. It features monuments, museums, and memorials to promote peace.',
//           place_image_url:
//             'https://upload.wikimedia.org/wikipedia/commons/7/7d/Hiroshima_Peace_Memorial_Park_01.jpg',
//           geo_coordinates: {
//             latitude: 34.3955,
//             longitude: 132.4536,
//           },
//           place_address:
//             '1-2 Nakajimacho, Naka Ward, Hiroshima, 730-0811, Japan',
//           ticket_pricing:
//             'Free entry (Peace Memorial Park), Museum approx. $2.50 USD',
//           time_travel_each_location: '10 minutes from central hotel',
//           best_time_to_visit:
//             '3 PM - 6 PM to avoid crowds and have peaceful visit',
//         },
//         {
//           place_name: 'Shukkeien Garden',
//           place_details:
//             'A beautiful historic Japanese garden with ponds, tea houses, and walking paths, perfect for a serene afternoon stroll.',
//           place_image_url:
//             'https://upload.wikimedia.org/wikipedia/commons/1/19/Shukkeien_Hiroshima_2008_2.jpg',
//           geo_coordinates: {
//             latitude: 34.3939,
//             longitude: 132.4549,
//           },
//           place_address:
//             '2-11 Kaminoboricho, Naka Ward, Hiroshima, 730-0014, Japan',
//           ticket_pricing: 'Approx. $3 USD',
//           time_travel_each_location: '15 minutes walk from Peace Memorial Park',
//           best_time_to_visit: 'Late afternoon (4 PM - 6 PM) for cool lighting',
//         },
//       ],
//     },
//     {
//       day: 2,
//       day_plan: 'Explore Miyajima Island',
//       best_time_to_visit_day: 'Morning to Afternoon',
//       activities: [
//         {
//           place_name: 'Itsukushima Shrine',
//           place_details:
//             'Iconic floating torii gate shrine famous for its unique architecture and scenic views. A UNESCO World Heritage site.',
//           place_image_url:
//             'https://upload.wikimedia.org/wikipedia/commons/1/1d/Itsukushima_Shrine_torii.jpg',
//           geo_coordinates: {
//             latitude: 34.296,
//             longitude: 132.3195,
//           },
//           place_address:
//             '1-1 Miyajimacho, Hatsukaichi, Hiroshima, 739-0588, Japan',
//           ticket_pricing: 'Approx. $3 USD',
//           time_travel_each_location: '45 min ferry from Hiroshima port',
//           best_time_to_visit:
//             '9 AM to 12 PM to enjoy low tide and fewer crowds',
//         },
//         {
//           place_name: 'Mount Misen',
//           place_details:
//             'The highest peak on Miyajima Island offering panoramic views accessible by hiking or cable car.',
//           place_image_url:
//             'https://upload.wikimedia.org/wikipedia/commons/3/3d/Mount_Misen_in_Miyajima.jpg',
//           geo_coordinates: {
//             latitude: 34.2883,
//             longitude: 132.32,
//           },
//           place_address: 'Miyajimacho, Hatsukaichi, Hiroshima',
//           ticket_pricing: 'Cable car approx. $8 USD one way',
//           time_travel_each_location: '15 minutes from Itsukushima Shrine',
//           best_time_to_visit: 'Afternoon (1 PM - 4 PM) for hiking and views',
//         },
//       ],
//     },
//     {
//       day: 3,
//       day_plan: 'Hiroshima City Museum and Local Shopping',
//       best_time_to_visit_day: 'Morning and Afternoon',
//       activities: [
//         {
//           place_name: 'Hiroshima Museum of Art',
//           place_details:
//             'An art museum housing European Renaissance and modern Japanese art collections.',
//           place_image_url:
//             'https://upload.wikimedia.org/wikipedia/commons/5/59/Hiroshima_Museum_of_Art_02.jpg',
//           geo_coordinates: {
//             latitude: 34.3989,
//             longitude: 132.46,
//           },
//           place_address: '7-42 Kaminoboricho, Naka Ward, Hiroshima',
//           ticket_pricing: 'Approx. $6 USD',
//           time_travel_each_location: '10 minutes walk from central hotel',
//           best_time_to_visit: '10 AM - 2 PM',
//         },
//         {
//           place_name: 'Hondori Shopping Street',
//           place_details:
//             'A lively pedestrian shopping street with shops, cafes, and local food stalls.',
//           place_image_url:
//             'https://upload.wikimedia.org/wikipedia/commons/8/8a/Hondori_Street_Hiroshima.jpg',
//           geo_coordinates: {
//             latitude: 34.3971,
//             longitude: 132.4608,
//           },
//           place_address: 'Hondori, Naka Ward, Hiroshima',
//           ticket_pricing: 'Free',
//           time_travel_each_location: '5 minutes walk from museum',
//           best_time_to_visit: 'Afternoon (2 PM - 6 PM) for shopping and dining',
//         },
//       ],
//     },
//     {
//       day: 4,
//       day_plan: 'Day trip to Okunoshima Island (Rabbit Island)',
//       best_time_to_visit_day: 'Morning to Evening',
//       activities: [
//         {
//           place_name: 'Okunoshima Island',
//           place_details:
//             'Famous as Rabbit Island, this lush island is home to hundreds of friendly wild rabbits roaming freely.',
//           place_image_url:
//             'https://upload.wikimedia.org/wikipedia/commons/d/d3/Okunoshima_Rabbit_Island.jpg',
//           geo_coordinates: {
//             latitude: 34.3556,
//             longitude: 132.7759,
//           },
//           place_address: 'Takehara, Hiroshima Prefecture, Japan',
//           ticket_pricing: 'Ferry approx. $10 USD round trip',
//           time_travel_each_location: '1.5 hours train + ferry from Hiroshima',
//           best_time_to_visit: '10 AM - 4 PM for best rabbit interactions',
//         },
//       ],
//     },
//     {
//       day: 5,
//       day_plan: 'Hiroshima Castle and Surroundings',
//       best_time_to_visit_day: 'Morning to Early Afternoon',
//       activities: [
//         {
//           place_name: 'Hiroshima Castle',
//           place_details:
//             'Also known as Carp Castle, this reconstructed castle offers historical exhibitions and lovely garden grounds.',
//           place_image_url:
//             'https://upload.wikimedia.org/wikipedia/commons/a/a1/Hiroshima_Castle_2013.jpg',
//           geo_coordinates: {
//             latitude: 34.3999,
//             longitude: 132.4624,
//           },
//           place_address: '21-1 Motomachi, Naka Ward, Hiroshima',
//           ticket_pricing: 'Approx. $4 USD',
//           time_travel_each_location: '15 minutes walk from city center',
//           best_time_to_visit: '9 AM - 12 PM to enjoy cooler morning hours',
//         },
//         {
//           place_name: 'Hijiyama Park',
//           place_details:
//             'A scenic park with walking trails, art museum, and panoramic city views.',
//           place_image_url:
//             'https://upload.wikimedia.org/wikipedia/commons/f/f9/Hijiyama_park_1.jpg',
//           geo_coordinates: {
//             latitude: 34.3901,
//             longitude: 132.4537,
//           },
//           place_address: 'Hijiyamacho, Minami Ward, Hiroshima',
//           ticket_pricing: 'Free',
//           time_travel_each_location: '10 minutes walk from Hiroshima Castle',
//           best_time_to_visit:
//             'Afternoon (1 PM - 4 PM) for wandering and photos',
//         },
//       ],
//     },
//     {
//       day: 6,
//       day_plan: 'Shopping and Departure',
//       best_time_to_visit_day: 'Morning',
//       activities: [
//         {
//           place_name: 'AEON Mall Hiroshima Fuchu',
//           place_details:
//             'Large modern mall featuring international brands, dining options, and entertainment.',
//           place_image_url:
//             'https://cdn.japantoday.com/images/posts/aeonmall-fuchu-hiroshima-1.jpg',
//           geo_coordinates: {
//             latitude: 34.3807,
//             longitude: 132.4644,
//           },
//           place_address:
//             '1 Chome-1 Furuichicho, Fuchu, Hiroshima 735-0012, Japan',
//           ticket_pricing: 'Free entry',
//           time_travel_each_location: '20 minutes by car from central Hiroshima',
//           best_time_to_visit: '9 AM - 12 PM before heading to airport',
//         },
//       ],
//     },
//   ],
// };

function Itinerary() {
  const { tripDetailInfo, setTripDetailInfo } = useTripDetail();
  const [tripData, setTripData] = useState<TripInfo | null>(null);

  useEffect(() => {
    tripDetailInfo && setTripData(tripDetailInfo);
  }, [tripDetailInfo]);

  const data = tripData
    ? [
        {
          title: 'Hotels',
          content: (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {tripData?.hotels.map((hotel, index) => (
                <HotelCardItem hotel={hotel} />
              ))}
            </div>
          ),
        },
        ...tripData?.itinerary.map((dayData) => ({
          title: `Day ${dayData?.day}`,
          content: (
            <div>
              <p className='mb-2 font-bold text-xl text-primary'>
                Best Time :{dayData?.best_time_to_visit_day}
              </p>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {dayData?.activities.map((activity, index) => (
                  <PlaceCardItem activity={activity} />
                ))}
              </div>
            </div>
          ),
        })),
      ]
    : [];
  return (
    <div className='relative w-full h-[83vh] overflow-auto'>
      {/* @ts-ignore */}
      {tripData ? (
        <Timeline data={data} tripData={tripData} />
      ) : (
        <div>
          <h2 className='flex gap-2 text-3xl text-white left-20 items-center absolute bottom-20'>
            {' '}
            <ArrowLeft /> Getting to know you to build perfect trip here...
          </h2>

          <Image
            src={'/travel.png'}
            alt='travel'
            width={'800'}
            height={800}
            className='w-full h-full object-cover rounded-3xl'
          />
        </div>
      )}
    </div>
  );
}

export default Itinerary;
