import { createContext, useContext, useState } from 'react';
import { BookingType, BookingContextType } from './type';

const BookingContext = createContext<BookingContextType>([]);

export const useBookingContext = () => {
  return useContext(BookingContext);
};

export const BookingProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState<BookingType>({
    slot: undefined,
    booking_date: undefined
  });

  return (
    <BookingContext.Provider value={{ bookingData, setBookingData }}>
      {children}
    </BookingContext.Provider>
  );
};
