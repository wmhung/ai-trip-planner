'use client';

import React, { useContext, useEffect, useState } from 'react';
import Header from './_components/Header';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { UserDetailContext } from '@/context/UserDetailContext';
import { TripInfo } from './create-new-trip/_components/ChatBox';
import {
  TripContextType,
  TripDetailContext,
} from '@/context/TripDetailContext';

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const CreateUser = useMutation(api.user.CreateNewUser);
  const [userDetail, setUserDetail] = useState<any>();
  const [tripDetailInfo, setTripDetailInfo] = useState<TripInfo | null>(null);

  const { user } = useUser();

  useEffect(() => {
    user && CreateNewUser();
  }, [user]);

  const CreateNewUser = async () => {
    if (user) {
      // Save new user if not exists
      const result = await CreateUser({
        email: user?.primaryEmailAddress?.emailAddress ?? '',
        imageUrl: user?.imageUrl,
        name: user?.fullName ?? '',
      });
      setUserDetail(result);
    }
  };
  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <TripDetailContext.Provider value={{ tripDetailInfo, setTripDetailInfo }}>
        <div>
          <Header />
          {children}
        </div>
      </TripDetailContext.Provider>
    </UserDetailContext.Provider>
  );
}

export default Provider;

export const useUserDetail = () => {
  return useContext(UserDetailContext);
};

// v1
// export const useTripDetail = (): TripContextType | undefined => {
//   return useContext(TripDetailContext);
// };

// v2
export const useTripDetail = (): TripContextType => {
  const context = useContext(TripDetailContext);

  if (!context) {
    throw new Error(
      'useTripDetail must be used within a TripDetailContext.Provider'
    );
  }

  return context;
};
