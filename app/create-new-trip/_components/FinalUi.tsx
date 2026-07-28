'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';

export default function Final({ viewTrip, disable }: any) {
  return (
    <div className='flex flex-col items-center justify-center mt-1 p-1 text-center'>
      <div className='flex flex-col mt-3 p-4 border rounded-xl bg-white gap-3 '>
        <h2 className='text-xl font-semibold'>
          I'm planning a trip for you...
        </h2>
        <p className='text-sm text-muted-foreground max-w-md'>
          Once the plan is fully generated, you can press the{' '}
          <strong>View</strong> button to see the final itinerary.
        </p>

        <Button onClick={viewTrip} disabled={disable}>
          View
        </Button>
      </div>
    </div>
  );
}
