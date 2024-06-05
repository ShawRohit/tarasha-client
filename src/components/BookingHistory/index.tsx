import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { debounce } from 'lodash';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { API_ENDPOINT } from '../../utils/constant';
import { Waveform } from '@uiball/loaders';
import useScreenSize from '../../hooks/useMediaQuery';
import './style.css';

interface Booking {
  bookingId?: string;
  paymentId?: string;
  scheduledDate?: string;
  status?: string;
  bookingTime?: string;
  booking_remarks?: string;
  booking_date?: string;
  _id?: string;
  razorpay_payment_id?: string;
}


const options = { year: 'numeric', month: 'short', day: 'numeric' };

const BookingHistory: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [page, setPage] = useState<number>(1); // Current page
  const [limit, setLimit] = useState<number>(5); // Number of items per page
  const [loading, setLoading] = useState<boolean>(true);
  const screenSize = useScreenSize();
  const debouncedSearch = debounce((searchTerm: string) => {
    // Fetch data from your backend API with pagination and search
    fetch(`${API_ENDPOINT.TRANSACTION_HISTORY}?search=${searchTerm}&limit=${limit}&page=${page}`, {
      method: "POST",
        headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`
        }
    })
      .then((response) => response.json())
      .then((data) => {
        setBookings(data.transactions);
        setFilteredBookings(data.transactions);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      }).finally(() => {
        setLoading(false);
      });
  }, 500); // Adjust the delay time as needed

  useEffect(() => {
    // Trigger the debounced search when searchTerm changes
    debouncedSearch(searchTerm);
  }, [searchTerm, page, limit]);

  useEffect(() => {
    if(searchTerm?.length > 0){
      const filtered = bookings.filter((booking) =>
        booking?.bookingId?.includes(searchTerm) ||
        booking?.paymentId?.includes(searchTerm) ||
        booking?.scheduledDate?.includes(searchTerm) ||
        booking?.status?.includes(searchTerm) ||
        booking?.bookingTime?.includes(searchTerm)
      );
      setFilteredBookings(filtered);
    }
  }, [searchTerm, bookings]);

  // Handle pagination
  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  if(loading){
    return <div className='w-full pt-8 mt-8 text-bold flex items-center justify-center'>
      <Waveform />
    </div>
  }
  if(bookings?.length === 0){
    return (<div className='w-full pt-8 mt-8 text-bold flex items-center justify-center'>
      No booking found
    </div>)
  }
  return (
    <div className="booking-history">
      <h2>Booking History</h2>
      {/* <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      /> */}
      <table>
        <thead>
          <tr>
            {/* <th>Booking ID</th> */}
            <th>Payment ID</th>
            <th>Scheduled At</th>
            <th>Status</th>
            {/* <th>Booking Time</th> */}
          </tr>
        </thead>
        <tbody>
          {filteredBookings.map((booking) => (
            <tr key={booking._id}>
              {/* <td>{booking._id}</td> */}
              <td>{booking.razorpay_payment_id}</td>
              <td>{booking.booking_remarks?.split("  ")[1]},{new Date(booking?.booking_date || Date.now()).toLocaleDateString('en-US', options)}</td>
              <td className='flex gap-1 items-center justify-center status'>
                <div className={`${new Date(booking?.booking_date || Date.now()) >  Date.now() ? 'status-booking-pending' : 'status-booking-over'}`}></div>
                <p>{booking.status}</p>
              </td>
              {/* <td></td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={page === 1}><FaChevronLeft color="#000000"/></button>
        {/* <span className='text-bold'>Page {page}</span> */}
        <button onClick={handleNextPage}><FaChevronRight color="#000000"/></button>
      </div>
    </div>
  );
};

export default BookingHistory;
