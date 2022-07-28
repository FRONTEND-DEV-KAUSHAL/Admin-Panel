import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function Doctors(props) {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([])
    const [dopen, setDopen] = useState(false);
    const [deleteid, setDeleteid] = useState(0);
    const [update, setUpdate] = useState(false)
    const [search, setSearch] = useState([])

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClickDopen = () => {
        setDopen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDopen(false);
        setUpdate(false);
        formik.resetForm()
    };

    const handleInsert = (values) => {
        console.log(values);
        let localData = JSON.parse(localStorage.getItem("doctors"))
        let id = Math.floor(Math.random() * 10000);
        console.log(id);
        let data = {
            id: id,
            ...values
        }
        if (localData === null) {
            localStorage.setItem("doctors", JSON.stringify([data]))
        } else {
            localData.push(data)
            localStorage.setItem("doctors", JSON.stringify(localData))
        }
        handleClose()
        loadData()
    }
    const handleUpdateData = (values) => {
        let localData = JSON.parse(localStorage.getItem("doctors"))
        let uData = localData.map((u) => {
            if (u.id === values.id) {
                return values;
            } else {
                return u;
            }
        })
        // console.log(values);
        localStorage.setItem("doctors", JSON.stringify(uData))
        handleClose()
        loadData()
    }

    let schema = yup.object().shape({
        code: yup.number().required("please enter doctor's code number").positive().integer(),
        fname: yup.string().required("please enter first name"),
        lname: yup.string().required("please enter last name"),
        specialty: yup.string().required("please enter doctor's specialty"),
    });

    const formik = useFormik({
        initialValues: {
            code: '',
            fname: '',
            lname: '',
            specialty: '',
        },
        validationSchema: schema,
        onSubmit: values => {
            if (update) {
                handleUpdateData(values)
            } else {
                handleInsert(values);
            }
        },
    });
    const { handleBlur, handleSubmit, handleChange, values, errors, touched } = formik

    const handleDelete = () => {
        // console.log(params.id);
        let localData = JSON.parse(localStorage.getItem("doctors"))
        let fData = localData.filter((l) => l.id !== deleteid)
        localStorage.setItem("doctors", JSON.stringify(fData))
        loadData()
        handleClose()
    }

    const handleEdit = (params) => {
        handleClickOpen()
        formik.setValues(params.row)
        // console.log(params.row);
        setUpdate(true)
    }

    const columns = [
        { field: 'code', headerName: 'Code', width: 180 },
        { field: 'fname', headerName: 'First name', width: 180 },
        { field: 'lname', headerName: 'Last name', width: 180 },
        { field: 'specialty', headerName: 'Specialty', width: 180 },
        {
            field: 'action',
            headerName: 'Action',
            width: 180,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="edit" onClick={() => handleEdit(params)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => { handleClickDopen(); setDeleteid(params.id) }}>
                        <DeleteIcon />
                    </IconButton>
                </>

            )
        },
    ];

    const loadData = () => {
        let localData = JSON.parse(localStorage.getItem("doctors"));
        if (localData !== null) {
            setData(localData);
        }
    }
    useEffect(() => {
        loadData()
    }, [])

    const handleSearch = (val) => {
        let localData = JSON.parse(localStorage.getItem("doctors"));
        let fData = localData.filter((d) => (
            d.code.toString().includes(val) ||
            d.fname.toLowerCase().includes(val.toLowerCase()) ||
            d.lname.toLowerCase().includes(val.toLowerCase()) ||
            d.specialty.toLowerCase().includes(val.toLowerCase())
        ))
        console.log(fData);
        setSearch(fData)
    }
    const finalData =  search.length > 0 ? search :  data 

    return (
        <div>
            <h2>Doctors</h2>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Details
            </Button>
            <TextField
                margin="dense"
                name="Search"
                label="Search Doctor's Details"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => handleSearch(e.target.value)}
            />
            <Dialog
                open={dopen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={handleDelete} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={open} onClose={handleClose} fullWidth>
                {
                    update ? <DialogTitle>Edit Doctors Details</DialogTitle>
                        : <DialogTitle>Doctors Details</DialogTitle>
                }
                <Formik values={formik}>
                    <Form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField
                                value={values.code}
                                margin="dense"
                                name="code"
                                label="Doctor's Code"
                                type="number"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.code && touched.code ? <p>{errors.code}</p> : ''}
                            <TextField
                                value={values.fname}
                                margin="dense"
                                name="fname"
                                label="Doctor First Name"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.fname && touched.fname ? <p>{errors.fname}</p> : ''}
                            <TextField
                                value={values.lname}
                                margin="dense"
                                name="lname"
                                label="Doctor Last Name"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.lname && touched.lname ? <p>{errors.lname}</p> : ''}
                            <TextField
                                value={values.specialty}
                                margin="dense"
                                name="specialty"
                                label="Doctor Specialty"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.specialty && touched.specialty ? <p>{errors.specialty}</p> : ''}
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                {
                                    update ? <Button type='submit'>Update</Button>
                                        : <Button type='submit'>Add</Button>
                                }
                            </DialogActions>
                        </DialogContent>
                    </Form>
                </Formik>
            </Dialog>
            <h3>Doctor's Details</h3>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={finalData}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>
        </div>
    );
}

export default Doctors;