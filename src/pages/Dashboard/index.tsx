import React from 'react'
import './style.css';

const Dashboard: React.FC = () => {
  return (
    <div id='dashboard-container' className='flex flex-col justify-center items-center'>
      <div className='flex flex-col gap-1 items-center pt-8 pb-8 dashboard-header'>
        <p className='text-styled-2 mt-8'>Welcome Neha</p>
        <p className='pb-8'>Track Details and Progress of Your Projects</p>
      </div>
        <p className='text-styled m-8'>Your Projects</p>
        <div className='flex flex-col justify-center items-center'>
            <div className='p-8 flex gap-3 table-header justify-between items-center'>
                <p>Project Details</p>
                <p>Starting Date</p>
                <p>Estimated Completion</p>
                <p>Status</p>
                <p>Fees</p>
            </div>
            <div className='table-body flex flex-col justify-center items-center'>
                {
                    [1, 2, 3, 4, 5, 6, 7].map((curr: number) => {
                        return (
                            <div key={curr} className='p-8 flex gap-3 justify-between items-center table-row'>
                                <p>Project Details</p>
                                <p>Starting Date</p>
                                <p>Estimated Completion</p>
                                <p>Status</p>
                                <p>Fees</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
      <div>

    </div>
    </div>
  )
}

export default Dashboard;
