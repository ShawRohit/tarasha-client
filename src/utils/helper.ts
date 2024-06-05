import Cookies from 'js-cookie';
import { BookingType } from "../contexts/Booking/type";
import { API_ENDPOINT } from "./constant";

export const isLeapYear = (year: number) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};

export const generateCalendarDates = (year: number, month: number) => {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    const dates: Date[] = [];

    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
        dates.push(new Date(date));
    }

    return dates;
};



export const getFirstDayOfWeek = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1);
  
    const dayOfWeek = firstDay.getDay();
  
    return dayOfWeek;
  };

const loadScript =  (src: string, paymentButtonId: string) => {
    return new Promise((resolve) => {
        const form = document.createElement('form');
        const script = document.createElement('script');
        form.appendChild(script);
        script.src = src;
        script.setAttribute('data-payment_button_id', paymentButtonId);
        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => {
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

export const displayRazorpay = async () => {
    const res = await loadScript('https://checkout.razorpay.com/v1/payment-button.js', 'pl_MawY7xfRYudvoj');
    if(!res) {
        alert('Payment failed');   
    }
}

export const savePaymentDetail = async (paymentId: string | null, bookingData: BookingType, ) => {
    try{
        if(!paymentId){
            throw new Error('Invalid payment Id');
        }
        const paymentResponse = await fetch(API_ENDPOINT.PAYMENT_INFO, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                paymentId: paymentId
            })
        })
        const paymentData = await paymentResponse.json();
        if(paymentData.success){
            const selectedDate = new Date(paymentData?.paymentDetails?.created_at * 1000);
            const bookingData = JSON.parse(localStorage.getItem('booking-details') || '{}');
            const savedPaymentResponse = await fetch(API_ENDPOINT.SAVE_PAYMENT_INFO, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('token')}`
                },
                body: JSON.stringify({
                    payment_details: {
                        number: paymentData?.paymentDetails?.notes?.phone,
                        payment_id: paymentId,
                        amount: paymentData?.paymentDetails?.amount / 100,
                        isPaymentSuccess: true,
                        payment_method: paymentData?.paymentDetails?.method,
                        slot: `${bookingData?.slot?.start} - ${bookingData?.slot?.end}`,
                        booking_date: bookingData?.booking_date,
                        payment_date: ((selectedDate.getMonth() + 1).toString().length === 1 ? "0"+(selectedDate.getMonth() + 1) : selectedDate.getMonth() + 1)+ '-' +selectedDate.toDateString().split(" ")[2]+'-'+selectedDate.getFullYear() ,                   
                    },
                    eventId: bookingData?.slot?.eventId
                })
            })
            return savedPaymentResponse.json();
        }else{
            throw new Error('Payment unsuccessfull');
        }
    }catch(error: any){
        throw new Error(error.message);
    }
}
