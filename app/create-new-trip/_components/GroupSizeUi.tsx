import { color } from 'motion/react';
import React from 'react';

export const SelectTravelesList = [
  {
    id: 1,
    title: 'Solo',
    desc: 'Exploring the world on your own',
    icon: '🧳',
    people: '1 person',
    color: 'bg-blue-100 text-blue-800',
  },
  {
    id: 2,
    title: 'Couple',
    desc: 'A romantic getaway for two',
    icon: '💑',
    people: '2 people',
    color: 'bg-pink-100 text-pink-800',
  },
  {
    id: 3,
    title: 'Family',
    desc: 'A group of friends or family',
    icon: '👨‍👩‍👧‍👦',
    people: '3 to 5 people',
    color: 'bg-yellow-100 text-yellow-800',
  },
  {
    id: 4,
    title: 'Friends',
    desc: 'A big gathering or event',
    icon: '🎉',
    people: '6 to 10 people',
    color: 'bg-green-100 text-green-800',
  },
];

function GroupSizeUi({ onSelectedOption }: any) {
  return (
    <div>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-2 items-center mt-1'>
        {SelectTravelesList.map((item, index) => (
          <div
            key={index}
            className='p-3 border rounded-2xl bg-white hover:border-primary curesor-pointer items-center text-center'
            onClick={() => {
              onSelectedOption(item.title + ':' + item.people);
            }}
          >
            <div className={`text-3xl p-3 rounded-full ${item.color}`}>
              {item.icon}
            </div>
            <h2 className='text-sm font-semibold mt-2'>{item.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
export default GroupSizeUi;
