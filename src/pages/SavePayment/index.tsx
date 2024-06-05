import React from 'react';
import { Waveform } from "@uiball/loaders";
import swal from 'sweetalert';
import Cookies from 'js-cookie';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { savePaymentDetail } from '../../utils/helper';
import './style.css';
import { useBookingContext } from '../../contexts/Booking';

const SavePayment: React.FC = () => {
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const {bookingData, setBookingData} = useBookingContext();
  const paymentId = searchParams.get('payment_id');
  React.useEffect(() => {
    if(!paymentId){
    //     //TODO: handle it
    }else{
        processPaymentData();
    }
  }, []);

  const processPaymentData = async () => {
    try{
      const paymentRespnse = await savePaymentDetail(paymentId, bookingData);
      
      if(paymentRespnse?.success){
        swal({
          title: "Payment information saved successfully",
          text: "Click Ok to proceed further",
          icon: "success",
          dangerMode: false,
          // timer: 10000
        }).then((result) => {
          if (result) {
            navigate('/dashboard')
          } 
        });
      }else{
        throw new Error('Payment saving unsuccessfull');
      }
    }catch(error){
      swal({
        title: "Payment unsuccessfull",
        text: "Click Ok to proceed further",
        icon: "error",
        dangerMode: true,
        // timer: 10000
      }).then((result) => {
        if (result) {
          navigate('/')
        } 
      });
    }finally{
      localStorage.removeItem('booking-details');
    }
  }

  React.useEffect(() => {
    if(!loading){
        navigate('/dashboard');
    }
  }, [loading]);
  return (
    <div className='save-payment-data'>
        {  loading &&  
            <div className='payment-loader loader flex justify-center items-center flex-col gap-2'>
                <p className='font-bold'>Saving your payment information</p>
                <Waveform />
            </div>
        }
    </div>
  )
}

export default SavePayment;
