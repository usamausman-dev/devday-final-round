import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { green } from '@mui/material/colors';
import axios from 'axios';
import Head from 'next/head'
import { useRouter } from 'next/router'
import AddTask from '@/Components/AddTask';
import Tasks from '@/Components/Tasks';



function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography component="span" >{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



const stdId = () => {
    const router = useRouter()

    const [value, setValue] = useState(0);
    const [students, setStudents] = useState(['uusman004@gmail.com'])
    const [tasks, setTasks] = useState([])


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };





    useEffect(() => {
        if (router.query.studentid) {
            // axios.post('/api/fetchtask', { StudentClassId: router.query.studentid })
            //     .then(function (response) {
            //         if (response.status === 201) {
            //             // setStudents(response.data.data.students)
            //             console.log(response.data)
            //         }
            //     })
            //     .catch(function (error) {
            //         console.log(error.response);
            //     });

            axios.get('http://localhost:3000/api/fetchtask')
                .then(function (response) {
                    // setMembers(response.data)

                    setTasks(response.data.data)
                }).catch((e) => {
                    console.log(e)
                })

        }



    }, [router.query.studentid])





    return (
        <>
            <Head>
                <title>Stds - {router.query.studentid}</title>
            </Head>

            <div className='p-10 w-full'>
                <div className='flex justify-between mb-5'>
                    <div className='flex items-center '>
                        <div className='text-bold text-3xl mr-6'>Class -  {router.query.studentid} </div>
                        <AvatarGroup max={4}>
                            {
                                students.map((val, key) => <Avatar key={key} sx={{ bgcolor: green[500] }}>{val.charAt(0).toUpperCase()}</Avatar>)
                            }
                        </AvatarGroup>
                    </div>
                    <AddTask stddataid={router.query.studentid} />
                </div>


                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} textColor="inherit" aria-label="basic tabs example" TabIndicatorProps={{ style: { backgroundColor: "#16a34a", } }}>
                            <Tab label="Tasks"  {...a11yProps(0)} />
                            <Tab label="Submission" {...a11yProps(1)} />



                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <Tasks tasks={tasks} />
                        {/* <Workitems StdID={router.query.studentid} /> */}
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        {/* <Backlog StdID={router.query.studentid} /> */}
                    </TabPanel>
                    {/* <TabPanel value={value} index={2}>
                        <Board />
                    </TabPanel> */}
                </Box>
            </div>

        </>
    )
}

export default stdId