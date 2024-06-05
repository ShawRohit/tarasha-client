import React from 'react'
import { useSiteData } from '../../contexts/DataContext';
import { Packageinterface } from '../../utils/type';
import Package from '../../components/Package';
import Image from '../../components/Image';
import CallConsultancy from '../../components/CallConsultancy';
import Modal from '../../components/Modal';
import ChoosePackagePlan from '../../components/ChoosePackagePlan';
import './style.css';
import useScreenSize from '../../hooks/useMediaQuery';
import Banner from '../../assets/Images/package-banner.jpg';
const Packages: React.FC = () => {
  const {data} = useSiteData();
  const [isPlanVisible, setPlanVisibilty] = React.useState(false);
  const [selectedPackage, setSelectedPackage] = React.useState<number>(1);
  const packages = data?.packages || [];
  const screenSize = useScreenSize();
  const packageSelectionHandler = (index: number) => {
    setSelectedPackage(index);
  }
  return (
    <div id='home-container' className='packages-container'>
        <Image src={Banner} className='home-img first-image'>
          <div className={`text-image-background flex justify-between items-center absolute bottom  right left sizing-border  flex wrap ${screenSize === 'sm' ? 'gap-1 p-4' : 'gap-3 p-8'}`}>
            <div className={` flex justify-between items-center absolute bottom  right left sizing-border  flex wrap ${screenSize === 'sm' ? 'gap-1 p-4' : 'gap-3 p-8'}`} style={{maxWidth: '1500px', margin: 'auto'}}>
                    <div className='flex flex-col home-main-body-text'>
                        <p className='text-styled'>Our Packages</p>
                    </div>
            </div>
          </div>
        </Image>
        <div className='flex flex-col m-2 pl-4 pr-4 p-8 m-8' style={{maxWidth: '1450px', margin: 'auto'}}>
            <p className='text-styled-3 mb-8 pb-8'>Select A Package</p>
            <div className='flex flex-row wrap justify-between'>
            {
                packages?.map((currPackage: Packageinterface, index: number) => {
                    return (
                        <Package 
                            key={index}
                            _id={index}
                            type={currPackage?.type}
                            features={currPackage?.features}
                            handlePlanVisibilty={(index: number) => {
                                setPlanVisibilty(true);
                                packageSelectionHandler(index + 1);
                            } } ranges={[]}                />
                    )
                })
            }
            </div>
        </div>
        <CallConsultancy />
        <Modal isOpen={isPlanVisible} onClose={() => setPlanVisibilty(false) }>
            <ChoosePackagePlan selectedPackage={selectedPackage}/>
        </Modal>
    </div>
  )
}

export default Packages;
