import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { GlobalProps } from '../../utils/type';
import { AuthContextType } from './type';
import eventBus from '../../utils/eventBus';
import { API_ENDPOINT } from '../../utils/constant';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<GlobalProps> = ({ children }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<{
    _id?: string;
    name?: string;
    email?: string;
    number?: string;
    countryCode?: string;
  }>({})
  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };
  useEffect(() => {
    const fetchMyProfile = async () => {
      try{
        const userResponse = await fetch(API_ENDPOINT.ME, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
          })
        const userInfo = await userResponse.json();
        if(userInfo.success){
          eventBus.emit("toast:success", "Welcome Back " + userInfo?.data?.name + "!")
          setUser(prev => ({_id: userInfo?.data?._id, name:  userInfo?.data?.name, email: userInfo?.data?.email, number: userInfo?.data?.mobiles[0]?.mobile, countryCode: userInfo?.data?.mobiles[0]?.countrycode}))
        }else{
          Cookies.remove('token');
          setAuthenticated(false);
        }
      }catch(error){
          Cookies.remove('token');
          setAuthenticated(false);
      }
      }
      if(Cookies.get('token')){
        fetchMyProfile()
      }
    }, [])
  const handleAuthentication = () => {
    if((isAuthenticated && Cookies.get('token')) || isAuthenticated){
      Cookies.remove('token');
      setAuthenticated(false);
      eventBus.emit('toast:success', 'Logged out!')
      setUser(prev => {})
    }else if(Cookies.get('token')){
      setAuthenticated(true);
    }
  }

  return (
    <AuthContext.Provider value={{isAuthModalOpen, openAuthModal, closeAuthModal, isAuthenticated, handleAuthentication, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


