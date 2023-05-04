import React, { useState } from 'react'
import login_validate from '../../lib/validation';
import { useFormik } from 'formik';
import { HiAtSymbol, HiFingerPrint } from 'react-icons/hi'
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from "next/router";

function Login() {
    const [show, setShow] = useState(false)
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit,
        validate: login_validate
    });

    async function onSubmit(values) {
        const status = await signIn('credentials', {
            redirect: false,
            email: values.email,
            password: values.password,
            callbackUrl: '/dashboard'
        })

        if (status.ok) router.push(status.url)
    }



    return (
        <div className='flex h-screen bg-green-500'>
            <div className='m-auto bg-slate-50 rounded-md w-3/5  grid lg:grid-cols-2'>

                <div className='sm:hidden rounded  lg:block bg-[url("https://www.systemsltd.com/wp-content/uploads/2019/10/systems-limited-first-half-of-2019-img.jpg")] '>
                </div>

                <div className='right flex flex-col justify-evenly'>
                    <div className='text-center py-10'>
                        <section className='w-3/4 mx-auto flex flex-col gap-10'>
                            <div className='title'>
                                <h1 className='text-gray text-4xl font-bold py-4'>Login</h1>
                                <p className='w-3/4 mx-auto text-gray-400'>lorem ipsum text goes from here</p>
                            </div>
                            {/* 'flex border rounded-xl relative' */}

                            <form className='flex flex-col gap-5' onSubmit={formik.handleSubmit}>
                                <div className={formik.errors.email && formik.touched.email ? "flex border rounded-xl relative border-red-700 " : "flex border rounded-xl relative"}>
                                    <input className="w-full py-4 px-6 rounded-xl bg-transparent focus:outline-none border-none peer" type='email' name='email' placeholder='Email'
                                        {...formik.getFieldProps('email')}
                                    />
                                    <span className='icon flex items-center px-4 peer-focus:text-green-500'>  <HiAtSymbol size={25} /></span>
                                </div>

                                <div className={formik.errors.password && formik.touched.password ? "flex border rounded-xl relative border-red-700 " : "flex border rounded-xl relative"}>
                                    <input className="w-full py-4 px-6  rounded-xl bg-slate-50 focus:outline-none border-none peer" type={`${show ? "text" : "password"}`} name='password' placeholder='Password'
                                        {...formik.getFieldProps('password')}
                                    />
                                    <span className='icon flex items-center px-4 peer-focus:text-green-500 hover:cursor-pointer hover:text-green-500' onClick={() => setShow(!show)}> <HiFingerPrint size={25} /> </span>
                                </div>

                                <div>
                                    <button className='w-full bg-gradient-to-r from-green-500 to-green-600 rounded-md py-3 text-gray-50 text-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:border-green-500 hover:text-gray-700 hover:border' type='submit'>Login</button>
                                </div>
                            </form>
                            <p className='text-center text-gray-400'>
                                Don't have an account yet?
                                <Link className='ml-2 text-green-500' href="/register">Sign Up</Link>
                            </p>
                        </section>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Login