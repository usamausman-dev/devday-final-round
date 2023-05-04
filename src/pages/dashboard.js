import React from 'react'
import CreateClass from '../Components/CreateClass'
import JoinStdclass from '@/Components/JoinClass'
import ClassCards from '@/Components/ClassCards'
import Link from 'next/link'


const dashboard = () => {

    let classData = [
        {
            _id: '123',
            stdclassName: 'hello'
        },
        {
            _id: '123',
            stdclassName: 'hello'
        }
    ]
    return (
        <>
            <nav className='bg-green-600 flex justify-between text-white px-10 py-5'>
                <div className='text-2xl'>
                    Google Classroom
                </div>

                <div className='flex gap-10'>
                    <JoinStdclass />
                    <CreateClass />
                </div>

            </nav>

            <div className='px-10 py-5'>
                <div className='text-3xl text-semibold text-green-500'>
                    Your Classes
                </div>

                <div className='grid grid-cols-4 p-10 gap-10'>

                    {
                        classData.map((val, key) => <Link key={key} href={`/StudentClass/${val._id}`}><ClassCards stdclassName={val.stdclassName} /></Link>)
                    }




                </div>

            </div>
        </>
    )
}

export default dashboard