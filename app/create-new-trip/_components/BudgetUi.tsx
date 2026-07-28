import React from 'react';

export const SelectBudgetOptions = [
  {
    id: 1,
    title: 'Affordable',
    desc: 'Stay conscious of costs',
    icon: '💸',
    color: 'bg-green-100 text-green-800',
  },
  {
    id: 2,
    title: 'Average',
    desc: 'Keep cost on the average side',
    icon: '💰',
    color: 'bg-blue-100 text-blue-800',
  },
  {
    id: 3,
    title: 'Pricey',
    desc: 'Don’t worry about cost',
    icon: '💎',
    color: 'bg-purple-100 text-purple-800',
  },
];

function BudgetUi({ onSelectedOption }: any) {
  return (
    <div>
      <div className='grid grid-cols-3 md:grid-cols-3 gap-2 items-center mt-1'>
        {SelectBudgetOptions.map((item, index) => (
          <div
            key={index}
            className='p-3 border rounded-2xl bg-white hover:border-primary curesor-pointer  items-center text-center'
            onClick={() => {
              onSelectedOption(item.title + ':' + item.desc);
            }}
          >
            <div className={`text-3xl p-3 rounded-full ${item.color}`}>
              {item.icon}
            </div>
            <h2 className='text-sm font-semibold mt-2'>{item.title}</h2>
            <p className='text-xs text-gray-500'>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BudgetUi;
