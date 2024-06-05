import React from 'react'
import { Serviceinterface } from '../../utils/type';
import './style.css';

const Service: React.FC<Serviceinterface> = (props) => {
  const {
    src,
    text
  } = props;
  return (
    <div className='service relative mb-8'>
      <img  src={src} style={{objectFit: 'cover'}}/>
      <div className='absolute'></div>
      <p className='absolute'>{text}</p>
    </div>
  )
}

export default Service;
