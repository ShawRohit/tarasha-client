import React, { useState } from 'react'
import { AccordionProps } from './type';
import useScreenSize from '../../hooks/useMediaQuery';
import './style.css';


const Accordion: React.FC<AccordionProps> = (props) => {
    const { title, children } = props;
    const [isOpen, setIsOpen] = useState(false);
    const screenSize = useScreenSize();

    const toggleAccordion = () => {
      setIsOpen(!isOpen);
    };
    
    return (
        <div className={`accordion-container ${screenSize === 'sm' ? 'ml-4 mr-4 mt-4' : 'ml-8 mr-8 pr-8 pl-8 mt-4'}`}>
            <div
                className="flex justify-between items-center bg-gray-200 p-2 cursor-pointer"
                onClick={toggleAccordion}
            >
            <p className="text-bold pr-2">{title}</p>
            <svg
                className={`w-5 h-5 ${!isOpen ? 'down' : 'up'}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
            <path
                fillRule="evenodd"
                d="M11.293 5.293a1 1 0 011.414 0L18 10l-5.293 5.293a1 1 0 01-1.414-1.414L15.586 10 11.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
            />
            </svg>
        </div>
        {isOpen && (
            <div className="font-small">{children}</div>
        )}
        <div className='ml-2 mr-2 mt-2 border-bottom'/>
        </div>
    )
}

export default Accordion;
