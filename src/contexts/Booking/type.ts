interface BookingType {
    slot?: any;
    booking_date?: string;
}

interface BookingContextType {
    bookingData: BookingType;
    setBookingData: any;
}

export type {
    BookingType,
    BookingContextType
}