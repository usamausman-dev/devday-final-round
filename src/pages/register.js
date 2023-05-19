import React, { useState } from 'react'
import { register_validation } from '../../lib/validation'
import { useFormik } from 'formik';
import { HiAtSymbol, HiFingerPrint, HiUser } from 'react-icons/hi'
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react'
import axios from 'axios';
import { useRouter } from "next/router";

const Register = () => {

    const [show, setShow] = useState(false)
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            organizationName: ''
        },
        onSubmit,
        validate: register_validation
    });

    async function onSubmit(values) {

        const payload = {
            firstname: values.firstName,
            lastname: values.lastName,
            organization: values.organizationName,
            email: values.email,
            password: values.password
        }
        const headers = {
            'Content-Type': 'application/json',
        }

        axios.post('/api/auth/signup', payload, {
            headers: headers
        })
            .then(function (response) {
                if (response.status === 201) {
                    alert("Register Successful")
                    router.push('/')
                }
            })
            .catch(function (error) {
                console.log(error.response);
            });

    }
    return (
        <div className='flex h-screen bg-green-500'>
            <div className='m-auto bg-slate-50 rounded-md w-3/5  grid lg:grid-cols-2'>

                <div className='sm:hidden rounded  lg:block bg-[url("https://media.wired.com/photos/63d1b65584464089ca2fc5fb/master/w_2560%2Cc_limit/ChatGPT-Is-Coming-To-Classrooms-Business-1298396060.jpg")] '>
                </div>

                <div className='right flex flex-col justify-evenly'>
                    <div className='text-center py-10'>
                        <section className='w-3/4 mx-auto flex flex-col gap-5'>
                            <div className='title'>
                                <h1 className='text-gray text-4xl font-bold py-4'>Register</h1>
                                <p className='w-3/4 mx-auto text-gray-400'>lorem ipsum text goes from here</p>
                            </div>
                            <form className='flex flex-col gap-3' onSubmit={formik.handleSubmit}>


                                <div className={formik.errors.firstName && formik.touched.firstName ? "flex border rounded-xl relative border-red-700 " : "flex border rounded-xl relative"}>
                                    <input className="w-full py-4 px-6 rounded-xl bg-transparent focus:outline-none border-none peer" type='text' name='firstName' placeholder='First Name'
                                        {...formik.getFieldProps('firstName')}
                                    />
                                    <span className='icon flex items-center px-4 peer-focus:text-green-500'>  <HiUser size={25} /></span>
                                </div>

                                <div className={formik.errors.lastName && formik.touched.lastName ? "flex border rounded-xl relative border-red-700 " : "flex border rounded-xl relative"}>
                                    <input className="w-full py-4 px-6 rounded-xl bg-transparent focus:outline-none border-none peer" type='text' name='lastName' placeholder='Last Name'
                                        {...formik.getFieldProps('lastName')}
                                    />
                                    <span className='icon flex items-center px-4 peer-focus:text-green-500'>  <HiUser size={25} /></span>
                                </div>


                                <div className={formik.errors.organizationName && formik.touched.organizationName ? "flex border rounded-xl relative border-red-700 " : "flex border rounded-xl relative"}>
                                    <input className="w-full py-4 px-6 rounded-xl bg-transparent focus:outline-none border-none peer" type='text' name='lastName' placeholder='Organization Name'
                                        {...formik.getFieldProps('organizationName')}
                                    />
                                    <span className='icon flex items-center px-4 peer-focus:text-green-500'>  <HiUser size={25} /></span>
                                </div>

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
                                    <button className='w-full bg-gradient-to-r from-green-500 to-green-600 rounded-md py-3 text-gray-50 text-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:text-green-500 hover:border-green-500  hover:border' type='submit'>Sign Up</button>
                                </div>
                            </form>
                            <p className='text-center text-gray-400'>
                                Already have an Account?
                                <Link className='ml-2 text-green-500' href="/login">Sign In</Link>
                            </p>
                        </section>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Register