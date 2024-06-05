  import React, { useState } from 'react';
  import { useGoogleLogin } from '@react-oauth/google';
  import Cookies from 'js-cookie';
  import {generateCalendarDates, getFirstDayOfWeek} from '../../utils/helper';
  import PrevImage from '../../assets/prev-1.png';
  import NextImage from '../../assets/black-next.jpg';
  import './style.css';
  import { API_ENDPOINT } from '../../utils/constant';
  import { useBookingContext } from '../../contexts/Booking';
  import { useAuth } from '../../contexts/AuthContext';
import eventBus from '../../utils/eventBus';
import { Waveform } from '@uiball/loaders';

  const Calendar: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null | undefined>(null);
    const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
    const [isTimeSelectionEnabled, setTimeSelection] = useState<boolean>(false);
    const [selectedTime, setSelectedTime] = useState<boolean | undefined | string | number>();
    const [isPaymentStep, setPaymentStep] = useState<boolean>(false);
    const {isAuthenticated,  openAuthModal} = useAuth();
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [availableSlots, setAvailableSlots] = React.useState<[{
      "start": string,
      "end": string,
      "eventId": string
    }] | []>([]);
    const {bookingData, setBookingData} = useBookingContext();
    React.useEffect(() => {
      localStorage.removeItem('booking-details');
    }, []);
    React.useEffect(() => {
      if (isPaymentStep) {
        const paymentButton = document.getElementById('payment-button');
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
        script.dataset.payment_button_id = 'pl_MawY7xfRYudvoj';
        script.async = true;

        script.onload = () => {
        };

        paymentButton?.appendChild(script);

        return () => {
          paymentButton?.removeChild(script);
        };
      }
    }, [isPaymentStep]);
    React.useEffect(() => {
      localStorage.setItem('booking-details', JSON.stringify({
        ...bookingData,
        booking_date: selectedDate ? ( ((selectedDate.getMonth() + 1).toString().length === 1 ? "0"+(selectedDate.getMonth() + 1) : selectedDate.getMonth() + 1)+ '-' +selectedDate.toDateString().split(" ")[2]+'-'+selectedDate.getFullYear() ) : undefined
      }))
      setBookingData({
        ...bookingData,
        booking_date: selectedDate ? ( ((selectedDate.getMonth() + 1).toString().length === 1 ? "0"+(selectedDate.getMonth() + 1) : selectedDate.getMonth() + 1)+ '-' +selectedDate.toDateString().split(" ")[2]+'-'+selectedDate.getFullYear() ) : undefined
      })
    }, [selectedDate]);
    React.useEffect(() => {
      localStorage.setItem('booking-details', JSON.stringify({
        ...bookingData,
        slot: typeof(selectedTime) === typeof(2) ? availableSlots[selectedTime - 1] : undefined,
      }))
      setBookingData({
        ...bookingData,
        slot: typeof(selectedTime) === typeof(2) ? availableSlots[selectedTime - 1] : undefined,
      })
    }, [selectedTime])

    const fetchAvailableSlots = async () => {
      try{
      if(!selectedDate) return;
      setLoadingSlots(true);
      const response = await fetch(API_ENDPOINT.AVAILABLE_SLOTS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}`
        },
        body: JSON.stringify({
          "date": ((selectedDate.getMonth() + 1).toString().length === 1 ? "0"+(selectedDate.getMonth() + 1) : selectedDate.getMonth() + 1)+ '-' +selectedDate.toDateString().split(" ")[2]+'-'+selectedDate.getFullYear()
        // "date": selectedDate.toISOString()
        })
      });
      const data = await response.json();
      if(data.success){
          setAvailableSlots(data?.slotAvailable);
      }else{
        throw new Error('Unable to fetch slots')
      }
    }catch(error){
      eventBus.emit('toast:error', 'Unable to fetch slots')
    }finally{
      setLoadingSlots(false)
    }
    }
    React.useEffect(() => {
      if(selectedDate){
        fetchAvailableSlots();
      }else {
        setAvailableSlots([]);
      }
    }, [selectedDate]);

    const handleDateClick = (date: Date) => {
      if(new Date(date).getDate() < new Date().getDate() && currentMonth <= new Date().getMonth() + 1 && currentYear <= new Date().getFullYear()){
        return;
      }
      if(new Date(date).getTime() == new Date(selectedDate || Date.now()).getTime()){
        setSelectedDate(undefined);
      }else{
        setSelectedDate(date);
      }
    };
    const handleTimeSelectionEnable = () => {

      if(!selectedTime && selectedDate){
        setTimeSelection(true);
      }
      
      if(selectedTime){
        if(!isAuthenticated){
          openAuthModal();
        }else{
          setPaymentStep(true);
        }
      }
    }
    const handleTime = (curr: number) => {
      if(selectedDate){
        setSelectedTime(curr + 1);
      }
    }

    const renderDateCell = (date: Date | null) => {
      if (!date) {
        return <td key="empty"></td>;
      }
      return (
        <td
          className={`${new Date(date).getDate() < new Date().getDate() &&  currentMonth <= new Date().getMonth() && currentYear <= new Date().getFullYear() && currentYear <= new Date().getFullYear() + 1 && 'disable'} date-cell ${new Date(date).getTime() == new Date(selectedDate || Date.now()).getTime() ? 'selected' : ''}`}
          
          // className={`date-cell ${new Date(date).getTime() == new Date(selectedDate || Date.now()).getTime() ? 'selected' : ''}`}
          onClick={() => handleDateClick(date)}
          key={date.toString()}
        >
          <p className='flex justify-center items-center'>
          {date.getDate()}</p>
        </td>
      );
    };

    const goToPreviousMonth = () => {
      if(currentMonth <= new Date().getMonth() && currentYear <= new Date().getFullYear()){
        return;
      }
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    };

    const goToNextMonth = () => {
      if(isTimeSelectionEnabled){
        return;
      }
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    };

    const renderCalendar = () => {
      const dates = generateCalendarDates(currentYear, currentMonth);
      const firstDayOfWeek = getFirstDayOfWeek(currentYear, currentMonth);

      const calendarGrid: (Date | null)[][] = [];

      let currentRow: (Date | null)[] = [];

      for (let i = 0; i < firstDayOfWeek; i++) {
        currentRow.push(null);
      }

      for (const date of dates) {
        currentRow.push(date);

        if (currentRow.length === 7) {
          calendarGrid.push(currentRow);
          currentRow = [];
        }
      }

      while (currentRow.length < 7) {
        currentRow.push(null);
      }

      calendarGrid.push(currentRow);

      return (
        <div className="calendar">
          <div className="calendar-header flex items-center mt-2 p-4 justify-between">
            <img  src={PrevImage} onClick={goToPreviousMonth} className={`${currentMonth <= new Date().getMonth()  && currentYear <= new Date().getFullYear() && 'disable'}`}/>
            <p className='text-bold'>{`${new Date(currentYear, currentMonth).toLocaleDateString('default', { month: 'long' })} ${currentYear}`}</p>
            <img   src={PrevImage} onClick={goToNextMonth} className={`${isTimeSelectionEnabled && 'disable'}`}/>
          </div>
        {
          !isTimeSelectionEnabled &&  
          <table className="calendar-table mt-8">
              <thead>
                <tr>
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <th className="day-label" key={day}>
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className=''>
                {calendarGrid.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((date, columnIndex) => (
                      <React.Fragment key={columnIndex}>
                        {renderDateCell(date)}
                      </React.Fragment>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
        }
        {
          isTimeSelectionEnabled && !isPaymentStep && <div className='m-8 flex wrap gap-3 justify-center items-center time-selector'>
                  
                  {
                    availableSlots?.length > 0 &&  availableSlots?.map((curr, index: number) =>{
                          return (
                              <button className={`calender-time button button-dark ${selectedTime - 1 === index && 'selected-time'}`} key={index} onClick={() => handleTime(index)}>{`${curr.start} - ${curr.end}`}</button>
                          )
                      })
                  }
                  {
                    availableSlots?.length === 0 && !loadingSlots && <p>No Slots available</p>
                  }
                  {
                    loadingSlots && 
                    <div className='flex justify-center items-center'>
                      <Waveform />
                    </div>
                  }
          </div>
        }
        </div>
      );
    };

    return (
      <div className='relative flex flex-col justify-center items-center gap-1 time-picker'>
        
        {!isPaymentStep && <p className='text-styled heading-calender pt-2'>{!isTimeSelectionEnabled ? "Select A Consultation Date" : "Select Time Slot"}</p>
        }  
        {(selectedTime && isPaymentStep) ?  <p className='text-styled heading-calender mt-2'>Click below for payment</p> : <></>}  
        {(selectedTime && isPaymentStep) ?  <p className='text-red-500 heading-calender'>Please do not refresh</p> : <></>
        }  
      {(!selectedTime || (selectedTime && !isPaymentStep)) &&  <div className="calendar-container">
          {renderCalendar()}
          </div>}
        {!isPaymentStep && <button onClick={handleTimeSelectionEnable}  className={`relative mt-4 flex button button-dark gap-1 items-center justify-center ${!selectedDate && 'disable'}`}>
              <p className={`button-calender text-bold ${(!selectedDate) ?  'disable' : 'active'}`}>Continue</p>
              <img  src={NextImage} className='black-next' />
        </button>}
        {isPaymentStep &&
        <div className={`payment-component flex justify-center items-center ${!selectedTime && 'v-hidden'} ${!selectedTime ? 'absolute' : ''}`}>
            <form className={`'payment-button' ${!selectedTime && !isPaymentStep && 'v-hidden'}`} id='payment-button'>
            </form>
        </div>
        }
        {/* {isTimeSelectionEnabled && !isPaymentStep &&
            <button onClick={handlePaymentProcession} className='mt-4 flex button button-dark gap-1 items-center justify-center'>
                <p className='button-calender text-bold'>Continue</p>
                <img src={NextImage} className='black-next' />
            </button>
        } */}
    </div>
    
  );
};

export default Calendar;
