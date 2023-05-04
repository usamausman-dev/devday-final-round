import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import { useSession, signIn, signOut } from "next-auth/react"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddStdclass() {

    const { data: session } = useSession()



    const [open, setOpen] = React.useState(false);
    const [stdclass, setStdclass] = React.useState("")

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setStdclass("")
    };

    function AddStdclassHandler(e) {
        e.preventDefault();

        const payload = {
            classTeacher: session.user.email,
            className: stdclass,
            members: [session.user.email],
        }
        console.log(payload)


        axios.post('/api/createclass', payload)
            .then(function (response) {
                if (response.status === 201) {
                    alert("Stdclass Created Successfully")
                    setOpen(false)
                }
            })
            .catch(function (error) {
                alert(error.response);
            });
    }

    return (
        <div>
            <button onClick={handleClickOpen} className='text-green-500 bg-white text-bold px-10 py-2 rounded'> <i className="fa-solid fa-plus lg:mr-3"></i>  <span> Create Class </span></button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-xl'>Create Class</h1>
                        <button onClick={handleClose}> <i className="fa-solid fa-multiply"></i></button>

                    </div>
                </DialogTitle>
                <form onSubmit={AddStdclassHandler} >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description" component="span">
                            <div className='m-5'>Please Write the name of Class in the below Input Field</div>

                            <div className=" border rounded-xl ">
                                <input value={stdclass} onChange={(e) => setStdclass(e.target.value)} className=" py-4 px-6 rounded-xl bg-transparent focus:outline-none border-none peer" type='text' name='stdclassName' placeholder='Class Name' required />
                            </div>

                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <button type='submit' className='bg-green-600 px-3 py-2 rounded text-white'>Create</button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}