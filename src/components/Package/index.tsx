import React from 'react';
import { BsArrowUpRight } from 'react-icons/bs';
import TickIcon from '../../assets/tick-icon.svg';
import { Packageinterface } from '../../utils/type';
import './style.css';
const Package: React.FC<Packageinterface> = (props) => {
    const {
        _id,
        type,
        features = [],
        handlePlanVisibilty
    } = props;

  return (
    <div className='package-container p-4 flex flex-col pr-8'>
        <p className='text-styled-2'>{type}</p>
        <div className='package-divider mb-8'/>
        <div className='flex flex-col gap-3'>
        {
            features?.map((feature: string) => {
                return (
                    <div className='flex items-center gap-1'>
                        <img  src={TickIcon} height={18} width={18}/>
                        <p style={{fontSize: '17px'}} className='left'>{feature}</p>
                    </div>
                )
            })
        }
        </div>
        <div className='flex items-center gap-2 absolute select-plan text-styled' onClick={() => handlePlanVisibilty(_id)}>
            <div>
                <p style={{opacity: '1', paddingBottom: '5px', color: 'brown !important'}}>
                {'Select ' + type}     
                </p>
                <div className='package-divider select-package-divider'/>
            </div>
            <div className='mt-1'>
                <BsArrowUpRight/>
            </div>
        </div>
    </div>
  )
}

export default Package;
