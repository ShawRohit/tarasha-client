import React from 'react'
import { ElementProps } from './type';
import './style.css';

const Element: React.FC<ElementProps> = (props) => {
  const {
    src,
    text
  } = props;

  return (
    <div className='flex flex-col gap-1 element-container items-center'>
      <div>
        <img  className='element-img' src={src}/>
      </div>
      <p className='text-bold font-bold'>{text}</p>
    </div>
  )
}

export default Element;
