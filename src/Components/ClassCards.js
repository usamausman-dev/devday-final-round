import React from 'react'

const ClassCards = ({ stdclassName, teacherName }) => {
    return (
        <div className='shadow-lg rounded-lg flex-col flex justify-between border-black-600/20 border-2'>
            <div>
                <img className='rounded' src="https://img.freepik.com/premium-vector/pattern-geometric-line-circle-abstract-seamless-blue-line_60284-53.jpg?w=2000" alt="cardImg" srcSet="" />
            </div>
            <div className='flex flex-col justify-around p-5 text-bold'>
                <div>{stdclassName}</div>
                <div className='text-slate-500'>{teacherName}</div>

                {/* <div>Members<span className='ml-1 text-orange-600  text-xs'> - 10</span></div> */}
            </div>

        </div>
    )
}

export default ClassCards