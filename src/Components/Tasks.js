import React from 'react'

const Tasks = ({ tasks }) => {
    console.log(tasks)
    return (
        <div className='border border-slate-200'>

            {
                tasks.map((v, k) =>
                    <div key={k} className='p-10 shadow-md m-10 rounded'>
                        <div className='flex justify-between'>
                            <div className='text-2xl text-green-500 text-bold'>
                                Task Name : {v.name}
                            </div>
                            <div>
                                Dealine : {v.enddate}
                            </div>

                        </div>

                        <div>
                            Description : {v.description}
                        </div>

                        {/* <div>
                            Submitted By
                        </div> */}

                        <div>
                            <button className='bg-green-500 text-white px-10 py-3 mt-10 rounded'>Submit task</button>
                        </div>

                    </div>


                )
            }











        </div>
    )
}

export default Tasks