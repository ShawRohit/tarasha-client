import React from 'react'
import { useSiteData } from '../../contexts/DataContext';
import { Faqinterface } from '../../utils/type';
import Accordion from '../Accordion';

const FAQ: React.FC = () => {
    const {data} = useSiteData();
    const faqs = data?.faq || [];
    return (
        <div id="faq">
            {
                faqs.map((faq: Faqinterface) => {
                    return (
                        <Accordion key={faq._id} title={faq.que}>
                            <p className='ml-2 mt-2 mb-8'>{faq.ans}</p>
                        </Accordion>
                    )
                })
            }
        </div>
    )
}

export default FAQ;
