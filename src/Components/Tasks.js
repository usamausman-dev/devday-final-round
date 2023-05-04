import React from 'react'

const Tasks = () => {
    return (
        <div className='border border-slate-200'>
            <div className='p-10 shadow-md m-10 rounded'>
                <div className='flex justify-between'>
                    <div className='text-2xl text-green-500 text-bold'>
                        Task Name
                    </div>
                    <div>
                        Dealine
                    </div>

                </div>

                <div>
                    Description
                </div>

                <div>
                    Submitted By
                </div>

                <div>
                    <button className='bg-green-500 text-white px-10 py-3 mt-10 rounded'>Submit task</button>
                </div>

            </div>









        </div>
    )
}

export default Tasks