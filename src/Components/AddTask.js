import React, { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import { useRouter } from "next/router";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddTask({ stddataid }) {

    // useEffect(() => {
    //     axios.get('http://localhost:3000/api/getusers')
    //         .then(function (response) {
    //             setMembers(response.data.users)
    //         }).catch((e) => {
    //             console.log(e)
    //         })


    // }, [])

    let members = [
        'uusman004@gmail.com',
        'babar@gmail.com'
    ]

    // const [members, setMembers] = useState([])
    const router = useRouter();


    const [open, setOpen] = useState(false);
    const [taskName, setTaskName] = useState('');
    const [Description, setDescription] = useState('');

    const [enddate, setEndDate] = useState(new Date())

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function AddTaskHandler() {

        let payload = { classID: stddataid, name: taskName, description: Description, enddate }
        console.log(payload)

        axios.post('/api/createtask', payload)
            .then(function (response) {
                if (response.status === 201) {
                    setOpen(false);
                    router.reload();
                }
            })
            .catch(function (error) {
                console.log(error.response);
            });

    }

    return (
        <div>
            <button onClick={handleClickOpen} className='bg-green-500 text-white px-10 py-2 rounded'> + <span className='sm:hidden md:hidden lg:inline-block'>  Assign Task </span></button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                maxWidth="xl"
                fullScreen={true}
            >
                <DialogTitle>
                    <div className='flex   justify-between'>
                        <h1 className='text-xl'>Assign Task</h1>
                        <button onClick={handleClose}>x</button>

                    </div>
                </DialogTitle>



                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description" component="span">

                        <div className='grid grid-cols-1 gap-5'>
                            <div className='flex flex-col  '>
                                <label htmlFor="name">Task Name</label>
                                <input required value={taskName} onChange={(e) => setTaskName(e.target.value)} type="text" name="taskname" id="taskname" placeholder='Task Name' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" />
                            </div>
                            <div className='flex flex-col  '>
                                <label htmlFor="name">Description</label>
                                <textarea required value={Description} onChange={(e) => setDescription(e.target.value)} type="text" name="Description" id="Description" placeholder='Description' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" />
                            </div>

                            <div className='flex flex-col  '>
                                <label htmlFor="enddate">Deadline</label>
                                <input required type='datetime-local' onChange={(e) => setEndDate(e.target.value)} name="enddate" id="enddate" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" />
                            </div>

                            <button onClick={AddTaskHandler} className='bg-green-600 px-3 py-2 rounded text-white'>Add Task</button>
                        </div>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
}