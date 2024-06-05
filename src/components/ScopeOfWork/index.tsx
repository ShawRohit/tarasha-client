import React, {useState, useRef } from 'react'
import ChairImage from '../../assets/circular-chair.png';
import JoinerImage from '../../assets/joiner.png';
import useScreenSize from '../..//hooks/useMediaQuery';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
interface Slide {
    id: number;
    content:React.Node;
}
// import SwiperCore, { Autoplay, Navigation } from 'swiper/core';
// import 'swiper/swiper-bundle.min.css';
import './style.css';


const slides: Slide[] = [
    { id: 1, content: <div className='flex flex-wrap w-full justify-center w-75'>
    <div className='scope flex flex-col gap-1 justify-center'>
        <img className='element-img' src={ChairImage}/>
        <p className='text-bold'>Initial Consultation</p>
        <p > During this meeting, the designer gathers
information about the client's needs, preferences, budget, and goals for
the project.</p>
    </div>
</div> },
    { id: 2, content: <div className='flex flex-wrap w-full justify-start'>
    <div className='scope flex flex-col gap-1 justify-center '>
        <img className='element-img' src={ChairImage}/>
        <p className='text-bold'>Concept Development</p>
        <p >The designer creates a design concept that
captures the overall look, feel, and mood of the space.
</p>
    </div>
</div> },
    { id: 3, content: <div className='flex flex-wrap w-full justify-start'>
    <div className='scope flex flex-col gap-1 justify-center '>
        <img className='element-img' src={ChairImage}/>
        <p className='text-bold'>Space Planning</p>
        <p >The designer develops a space plan that outlines the
layout of furniture, fixtures, and other elements within the space.</p>
    </div>
</div> },

{ id: 4, content: <div className='flex flex-wrap w-full justify-start'>
<div className='scope flex flex-col gap-1 justify-center '>
    <img className='element-img' src={ChairImage}/>
    <p className='text-bold'>Budget & Estimation</p>
    <p >The designer provides cost estimates for the
project, considering materials, furnishings, labour, and other expenses.</p>
</div>
</div> },
{ id: 5, content: <div className='flex flex-wrap w-full justify-start'>
<div className='scope flex flex-col gap-1 justify-center '>
    <img className='element-img' src={ChairImage}/>
    <p className='text-bold'>Client Review & Approval </p>
    <p >Any necessary revisions or adjustments are
made based on client feedback until the design is approved.</p>
</div>
</div> },
{ id: 6, content: <div className='flex flex-wrap w-full justify-start'>
<div className='scope flex flex-col gap-1 justify-center '>
    <img className='element-img' src={ChairImage}/>
    <p className='text-bold'>Procurement & Ordering  </p>
    <p >Once the design is finalized, the designer
proceeds with procuring the necessary materials, furnishings, and
accessories. This involves coordinating with the suppliers, vendors,
contractors, etc.
</p>
</div>
</div> },
{ id: 7, content: <div className='flex flex-wrap w-full justify-start'>
<div className='scope flex flex-col gap-1 justify-center '>
    <img className='element-img' src={ChairImage}/>
    <p className='text-bold'>Installation & Styling </p>
    <p >As materials and furnishings arrive, the designer
oversees the installation process. Furniture is arranged, accessories are
placed, and the design comes to life.
</p>
</div>
</div> },
{ id: 8, content: <div className='flex flex-wrap w-full justify-start'>
<div className='scope flex flex-col gap-1 justify-center '>
    <img className='element-img' src={ChairImage}/>
    <p className='text-bold'>Final Reveal  </p>
    <p >The designer unveils the completed space to the client.

</p>
</div>
</div> },
{ id: 9, content: <div className='flex flex-wrap w-full justify-start'>
<div className='scope flex flex-col gap-1 justify-center '>
    <img className='element-img' src={ChairImage}/>
    <p className='text-bold'>Post Design Support </p>
    <p >This includes addressing any questions, providing
maintenance advice, and ensuring the long-term functionality and
aesthetics of the space.
</p>
</div>
</div> },
    // Add more slides as needed
  ];

const ScopeOfWork: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef<HTMLDivElement | null>(null);
  
    const prevSlide = () => {
      if (currentSlide > 0) {
        setCurrentSlide(currentSlide - 1);
      }
    };
  
    const nextSlide = () => {
      if (currentSlide < slides.length - 1) {
        setCurrentSlide(currentSlide + 1);
      }
    };
  
 const screenSize = useScreenSize();
  return (
    <>
       {screenSize === 'lg' && <div className='w-75 flex flex-col gap-3 items-center scope-of-work-lg' id='scope-of-work' style={{color: '#B87E1B !important'}}>
            <p className='text-styled-3 pb-8'>Scope Of Work</p>
            <div className='flex wrap justify-center gap-3 scope-container relative w-100'>
                <div className='flex flex-wrap'>
                    {
                        slides[0].content
                    }
                    <div className='joiner l-r-t-b-joiner'/>
                    {
                        slides[1].content
                    }
                    <div className='joiner l-r-b-t-joiner'/>
                    {
                        slides[2].content
                    }
                </div>
            </div>
            <div className='w-100 row-12-joiner flex items-center gap-3 flex justify-end items-center'>
                <div className='joiner t-b-r-l-joiner '/>
            </div>
            <div className='flex wrap justify-center gap-3 scope-container relative w-100'>
                <div className='flex flex-wrap'>
                    {
                        slides[3].content
                    }
                    <div className='joiner r-l-t-b-joiner'/>
                    {
                        slides[4].content
                    }
                    <div className='joiner r-l-b-t-joiner'/>
                    {
                        slides[5].content
                    }
                </div>
            </div>
            <div className='w-100 row-23-joiner flex items-center gap-3 flex-start'>
                <div className='joiner t-b-l-r-joiner '/>
            </div>
            <div className='flex wrap justify-center gap-3 scope-container relative w-100'>
                <div className='flex flex-wrap'>
                    {
                        slides[6].content
                    }
                    <div className='joiner l-r-t-b-joiner'/>
                    {
                        slides[7].content
                    }
                    <div className='joiner l-r-b-t-joiner'/>
                    {
                        slides[8].content
                    }
                </div>
            </div>
        </div>}
        {screenSize === 'md' && <div className='flex flex-col gap-1 items-center justify-center' id='scope-of-work' style={{color: '#B87E1B !important'}}>
            <p className='text-styled mb-8'>Scope Of Work</p>
            <div className='flex wrap justify-center gap-3 scope-container relative'>
                <div className='flex flex-wrap'>
                {
                        slides[0].content
                    }
                    <div className='joiner l-r-t-b-joiner'/>
                    {
                        slides[1].content
                    }
                </div>
            </div>
            <div className='w-75 row-12-joiner flex items-center gap-3'>
                <div className='joiner t-b-r-l-joiner '/>
            </div>
            <div className='flex wrap justify-center gap-3 scope-container relative pl-4'>
                <div className='flex flex-wrap'>
                {
                        slides[2].content
                    }
                    <div className='joiner r-l-t-b-joiner'/>
                    {
                        slides[3].content
                    }
                </div>
            </div>
            <div className='w-75 row-23-joiner flex items-center gap-3'>
                <div className='joiner t-b-l-r-joiner '/>
            </div>
            <div className='flex wrap justify-center gap-3 scope-container relative'>
                <div className='flex flex-wrap'>
                {
                        slides[4].content
                    }
                    <div className='joiner l-r-t-b-joiner'/>
                    {
                        slides[5].content
                    }
                </div>
            </div>
            
            <div className='w-75 row-12-joiner flex items-center gap-3'>
                <div className='joiner t-b-r-l-joiner '/>
            </div>
            <div className='flex wrap justify-center gap-3 scope-container relative'>
                <div className='flex flex-wrap'>
                {
                        slides[6].content
                    }
                    <div className='joiner r-l-t-b-joiner'/>
                    {
                        slides[7].content
                    }
                </div>
            </div>
            <div className='w-75 row-23-joiner flex items-center gap-3'>
                <div className='joiner t-b-l-r-joiner '/>
            </div>
            <div className='flex flex-wrap w-full justify-start ml-8 pl-8 r'>
            {
                        slides[8].content
                    }
            </div>
        </div>}
        {screenSize === 'sm' &&
        <><p className='text-styled mb-2'>Scope Of Work</p>
        <div className='flex flex-col items-center slider-container-scope pt-2 bt-2' >
            
            
                <div className=" flex gap-1 items-center" >
                    <FaChevronLeft onClick={prevSlide} color='#000000'/>
                    <div className="scope-of-work" style={{
    boxShadow: '0 0 2px 2px rgba(0, 0, 0, 0.2)',
    padding: '0.3rem, 2rem !important',
    margin: '1rem'
                }}>
                        {slides[currentSlide].content}
                    </div>
                    <FaChevronRight onClick={nextSlide} color='#000000'/>
            </div>
            </div>
            </>
        }
    </>
  )
}

export default ScopeOfWork;