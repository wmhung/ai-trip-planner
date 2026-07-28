'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader, Send } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import EmptyBoxState from './EmptyBoxState';
import GroupSizeUi from './GroupSizeUi';
import BudgetUi from './BudgetUi';
import SelectDaysUi from './SelectDaysUi';
import FinalUi from './FinalUi';
import { useMutation } from 'convex/react';
import { v4 as uuidv4 } from 'uuid';
import { api } from '@/convex/_generated/api';
import { useTripDetail, useUserDetail } from '@/app/provider';
import { useSearchParams, useRouter } from 'next/navigation';

type Message = {
  role: string;
  content: string;
  ui?: string;
};

export type TripInfo = {
  budget: string;
  destination: string;
  duration: string;
  group_size: string;
  origin: string;
  hotels: Hotel[];
  itinerary: Itinerary[];
};

export type Hotel = {
  hotel_name: string;
  hotel_address: string;
  price_per_night: string;
  hotel_image_url: string;
  geo_coordinates: {
    latitude: number;
    longitude: number;
  };
  rating: number;
  description: string;
};

export type Activity = {
  place_name: string;
  place_details: string;
  place_image_url: string;
  geo_coordinates: {
    latitude: number;
    longitude: number;
  };
  place_address: string;
  ticket_pricing: string;
  time_travel_each_location: string;
  best_time_to_visit: string;
};

export type Itinerary = {
  day: number;
  day_plan: string;
  best_time_to_visit_day: string;
  activities: Activity[];
};

function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFinal, setIsFinal] = useState(false);
  const [tripDetail, setTripDetail] = useState<TripInfo>();

  const hasAutoSent = useRef(false);

  const SaveTripDetail = useMutation(api.tripDetail.CreateTripDetail);
  const { userDetail } = useUserDetail();
  const { setTripDetailInfo } = useTripDetail();

  const searchParams = useSearchParams();
  const router = useRouter();
  const prompt = searchParams.get('prompt');

  const onSend = async () => {
    if (!userInput.trim()) return;

    setIsLoading(true);

    const newMsg: Message = {
      role: 'user',
      content: userInput,
    };

    setMessages((prev) => [...prev, newMsg]);
    setUserInput('');

    const result = await axios.post('/api/aimodel', {
      messages: [...messages, newMsg],
      isFinal,
    });

    !isFinal &&
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: result?.data?.resp,
          ui: result?.data?.ui,
        },
      ]);

    if (isFinal) {
      setTripDetail(result?.data?.trip_plan);
      setTripDetailInfo(result?.data?.trip_plan);
      setIsFinal(false);

      await SaveTripDetail({
        tripDetail: result?.data?.trip_plan,
        tripId: uuidv4(),
        uid: userDetail?._id,
      });
    }

    setIsLoading(false);
  };

  /* ===========================
     AUTO START FROM HERO
     =========================== */
  useEffect(() => {
    if (prompt && !hasAutoSent.current) {
      hasAutoSent.current = true;
      setUserInput(prompt);
      router.replace('/create-new-trip'); // clear URL
    }
  }, [prompt]);

  useEffect(() => {
    if (hasAutoSent.current && userInput && messages.length === 0) {
      onSend();
    }
  }, [userInput]);

  /* ===========================
     FINAL STEP HANDLING
     =========================== */
  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg?.ui === 'final') {
      setIsFinal(true);
      setUserInput('Great. Thanks!');
    }
  }, [messages]);

  useEffect(() => {
    if (isFinal && userInput) {
      onSend();
    }
  }, [isFinal]);

  const RenderGenerativeUi = (ui: string | undefined) => {
    if (ui == 'budget') {
      return (
        <BudgetUi
          onSelectedOption={(v: string) => {
            setUserInput(v);
            onSend();
          }}
        />
      );
    } else if (ui == 'groupSize') {
      return (
        <GroupSizeUi
          onSelectedOption={(v: string) => {
            setUserInput(v);
            onSend();
          }}
        />
      );
    } else if (ui == 'TripDuration') {
      return (
        <SelectDaysUi
          onSelectedOption={(v: string) => {
            setUserInput(v);
            onSend();
          }}
        />
      );
    } else if (ui == 'final') {
      return <FinalUi viewTrip={() => console.log()} disable={!tripDetail} />;
    }
    return null;
  };

  return (
    <div className='h-[85vh] flex flex-col border shadow rounded-2xl p-4'>
      {messages.length === 0 && (
        <EmptyBoxState
          onSelectOption={(v: string) => {
            setUserInput(v);
            onSend();
          }}
        />
      )}

      <section className='flex-1 overflow-y-auto p-4'>
        {messages.map((msg, index) =>
          msg.role === 'user' ? (
            <div key={index} className='flex justify-end mt-2'>
              <div className='max-w-lg bg-primary text-white px-4 py-2 rounded-lg'>
                {msg.content}
              </div>
            </div>
          ) : (
            <div key={index} className='flex justify-start mt-2'>
              <div className='max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg'>
                {msg.content}
                {RenderGenerativeUi(msg.ui)}
              </div>
            </div>
          )
        )}

        {isLoading && (
          <div className='flex justify-start mt-2'>
            <div className='bg-gray-100 px-4 py-2 rounded-lg'>
              <Loader className='animate-spin' />
            </div>
          </div>
        )}
      </section>

      <section>
        <div className='relative border rounded-2xl p-4 shadow sm:p-1'>
          <Textarea
            placeholder='Start your trip plan...'
            className='w-full max-h-28 bg-transparent border-none resize-none'
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <Button
            size='icon'
            className='absolute bottom-6 right-6'
            onClick={onSend}
          >
            <Send className='h-4 w-4' />
          </Button>
        </div>
      </section>
    </div>
  );
}

export default ChatBox;
