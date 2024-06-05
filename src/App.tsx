import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import eventBus from './utils/eventBus';
import './App.css'
import Navigation from './Navigation';
import Auth from './components/Auth';
import { useAuth } from './contexts/AuthContext';
import 'react-toastify/dist/ReactToastify.css'; 
import ReactGA from 'react-ga';
const TRACKING_ID = "G-Z89HC5EJMQ";
ReactGA.initialize(TRACKING_ID);
function App() {
  const {handleAuthentication, isAuthModalOpen } = useAuth();
  React.useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
    handleAuthentication();
  }, [])
  
  React.useEffect(() => {
     eventBus.on("toast:success", (message: string) => {
      toast.success(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
  })
      eventBus.on("toast:error", (message: string) => {
        toast.error(message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
      return () => {
        eventBus.removeAllListeners()

      }
    }, [])
  return (
      <>
        <Navigation />
        {
          isAuthModalOpen &&
          <Auth />
        }
        <ToastContainer />
      </>
  )
}

export default App
