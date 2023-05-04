import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useSession, signIn, signOut } from "next-auth/react"
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function JoinStdclass() {
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

    function JoinStdclassHandler(e) {
        e.preventDefault();
        const payload = {
            person: session.user.email,
            stdclassdataid: stdclass
        }

        console.log(payload)

        // axios.post('/api/addmembers', payload)
        //     .then(function (response) {
        //         if (response.status === 201) {
        //             setOpen(false)
        //             alert('added Successfully')
        //             console.log(response)
        //         }
        //     })
        //     .catch(function (error) {
        //         console.log("while getting", error.response);
        //     });

    }

    return (
        <div>
            <button onClick={handleClickOpen} className='bg-white text-green-500 font-bold px-10 py-2 rounded'> <i className="fa-solid fa-plus lg:mr-3"></i>  <span>  Join Class </span></button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-xl'>Join Class</h1>
                        <button onClick={handleClose}> <i className="fa-solid fa-multiply"></i></button>

                    </div>
                </DialogTitle>
                <form onSubmit={JoinStdclassHandler} >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description" component="span">
                            <div className='m-5'>Please Enter the Class ID in the below Input Field</div>

                            <div className=" border rounded-xl ">
                                <input value={stdclass} onChange={(e) => setStdclass(e.target.value)} className=" py-4 px-6 rounded-xl bg-transparent focus:outline-none border-none peer" type='text' name='stdclassName' placeholder='Class ID' required />
                            </div>

                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <button type='submit' className='bg-green-600 px-3 py-2 rounded text-white'>Join</button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}