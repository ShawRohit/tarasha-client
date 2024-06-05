import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Icon from '../../assets/icon.png';
import { ACTIVE_LINK_STYLE } from '../../utils/constant';
import { useAuth } from '../../contexts/AuthContext';
import useScreenSize from '../../hooks/useMediaQuery';
import { IoArrowBackOutline } from 'react-icons/io5';
import { GiHamburgerMenu } from 'react-icons/gi';
import HamburgerIcon from '../../assets/hamburger_icon.svg';
import './style.css';

const Header: React.FC = () => {
  const [isSidebarVisibile, setSidebarVisibility] = React.useState<boolean>(false);
  const location = useLocation();
  const { openAuthModal, isAuthenticated, handleAuthentication } = useAuth();
  const screenSize = useScreenSize();
  React.useEffect(() => {
    if(screenSize === 'lg'){
      setSidebarVisibility(false);
    }
  }, [screenSize]);
  const isLinkActive = (path: string) => {
    return location.pathname === path;
  };  
  const handleSidebar = () => {
    setSidebarVisibility(!isSidebarVisibile);
  }
  const handleNavLinkClick = () => {
    setSidebarVisibility(false)
  };
  return (
    <div id='header-container'>
      <div id='header-container-2'>
      <img   src={Icon} height={screenSize === 'sm' ? 55 : 60} alt="Logo" className={`${screenSize === 'sm' && 'small-logo'}`}/>
    { <div className={`flex gap-5 ${!isSidebarVisibile && screenSize !== 'lg' && 'hidden'} ${screenSize !== 'lg' && 'sidebar'}`}>
        <ul className='flex items-center text-white list-style-none gap-3'>
          <li className={`${!isSidebarVisibile && screenSize === 'lg' && 'hidden'}`}>
            <IoArrowBackOutline size={35} onClick={handleSidebar}/>
            
          </li>
          <li className='nav-item'>
            <NavLink 
              to={'/'} 
              className='link'
              onClick={handleNavLinkClick}
            >
              Home
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink 
              to={'/services'} 
              className='link' 
              
              onClick={handleNavLinkClick}
              // style={isLinkActive('/services') ? ACTIVE_LINK_STYLE : {}}
            >
              Services
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink 
              to={'/our-works'} 
              className='link'
              
              onClick={handleNavLinkClick}
            >
              Our Works
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink 
              to={'/packages'} 
              className='link' 
              
              onClick={handleNavLinkClick}
              style={screenSize === 'lg' ?  ACTIVE_LINK_STYLE : {}}>
              Packages
            </NavLink>
          </li>
          <li className='nav-item'>
          <NavLink 
            to={'/blog'} 
            className='link'
            
              onClick={handleNavLinkClick}
          >
              Blog
            </NavLink>
          </li>
        {isAuthenticated &&  <li className='nav-item'>
          <NavLink 
            to={'/dashboard'} 
            className='link'
            
            onClick={handleNavLinkClick}
          >
              Dashboard
            </NavLink>
          </li>}
        </ul>
        {!isAuthenticated && <button id='auth-button' className='normal-button-text' onClick={openAuthModal}>{`Login/Signup`}</button>}
      {isAuthenticated && <button id='auth-button' className='normal-button-text' onClick={handleAuthentication}>{`Logout`}</button>}
      </div>}
      {screenSize !== 'lg' &&
      // <GiHamburgerMenu size={40} style={{color: 'white'}} className={`mb-2 hamburger-icon ${isSidebarVisibile && 'hidden'}`} onClick={handleSidebar}/>}
      <img src={HamburgerIcon} height={35} width={35} onClick={handleSidebar}/>
  }
  </div>
      </div>
    
  );
};

export default Header;