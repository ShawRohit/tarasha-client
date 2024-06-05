import React from 'react';
import {BsArrowRight} from 'react-icons/bs';
import './style.css';
import { Link } from 'react-router-dom';
import eventBus from '../../utils/eventBus';
import { useSiteData } from '../../contexts/DataContext';

const ChoosePackagePlan: React.FC<{selectedPackage: number}> = (props) => {
  const {data} = useSiteData();
  const currentPackagesRanges = data?.packages?.find(currPackage => currPackage?._id === props?.selectedPackage)?.ranges || [];
 const [selected, setSelected] = React.useState(-1);
 const planSelectHandler = (index: number) => {
    if(index === selected){
        setSelected(-1);
        return;
    }
    setSelected(index);
 }

  return (
    <div className='flex flex-col gap-5'>
      <p className='text-styled'>Choose Package Option</p>
      <div className='flex flex-row wrap gap-3 pl-2'>
        {
            currentPackagesRanges.map((curr: {range: string, price: string}, index: number) => {
                return (
                    <div key={index} className={`plan mt-2 mb-2 box-shadow plan-price-range-container flex flex-col justify-center pl-8 gap-2 ${selected === index && 'selected-plan'}`} onClick={() => planSelectHandler(index)}>
                        <p className='plan-total-area'>{curr.range}</p>
                        <p className='plan-total-price'>₹ {curr.price}</p>        
                    </div>
                )
            })
        }
      </div>
      {selected > -1 && <Link className='link' to={'/questionare'}>
        <button className='button button-dark flex gap-1 ml-2 mb-4'>
            <p>Continue</p>
            <BsArrowRight />
        </button>
      </Link>}
      {selected === -1 && 
        <button className='button button-dark flex gap-1 ml-2 mb-4 disable' onClick={ () => {
          eventBus.emit("toast:error", "Please select a package!!")
        }}>
            <p>Continue</p>
            <BsArrowRight />
        </button>
      }
    </div>
  )
}

export default ChoosePackagePlan;
