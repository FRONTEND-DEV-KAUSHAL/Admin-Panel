import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


function Patients(props) {
    const [open, setOpen] = useState(false);
    const [dopen, setDopen] = useState(false);
    const [data, setData] = useState([]);
    const [did, setDid] = useState(0);
    const [update, setUpdate] = useState(false);
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
        setUpdate(false)
        formikObj.resetForm()

    };
    const handleInsert = (values) => {
        console.log(values);
        let localData = JSON.parse(localStorage.getItem("Patients"))
        let id = Math.floor(Math.random() * 1000);
        console.log(id);
        let data = {
            id: id,
            ...values
        }
        if (localData === null) {
            localStorage.setItem("Patients", JSON.stringify([data]))
        } else {
            localData.push(data)
            localStorage.setItem("Patients", JSON.stringify(localData))
        }
        handleClose()
        loadData()
    }

    const handleUpdatedata = (values) => {
        let localData = JSON.parse(localStorage.getItem("Patients"));
        let update = localData.map((p) => {
            if (p.id === values.id) {
                return values;
            } else {
                return p;
            }
        })
        localStorage.setItem("Patients", JSON.stringify(update))
        loadData()
        handleClose();
    }
    let schema = yup.object().shape({
        name: yup.string().required("please enter patient Name"),
        age: yup.number().required("please enter age").positive().integer(),
        phone: yup.number().required("please enter phone number").positive().integer(),
        city: yup.string().required("please enter your city name"),
    });

    const formikObj = useFormik({
        initialValues: {
            name: '',
            age: '',
            phone: '',
            city: '',
        },
        validationSchema: schema,
        onSubmit: values => {
            if (update) {
                handleUpdatedata(values)
            } else {
                handleInsert(values)
            }
        },
        enableReinitialize: true,

    });

    const handleDelete = () => {
        // console.log(params.id);
        let localData = JSON.parse(localStorage.getItem("Patients"))
        let fData = localData.filter((l) => l.id !== did)
        localStorage.setItem("Patients", JSON.stringify(fData))
        loadData()
        handleClose()
    }

    const { handleChange, handleSubmit, handleBlur, errors, touched, values } = formikObj;

    const handleEdit = (params) => {
        handleClickOpen()
        formikObj.setValues(params.row)
        // console.log(params.row);
        setUpdate(true)
    }

    const columns = [
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'age', headerName: 'Age', width: 200 },
        { field: 'phone', headerName: 'Contact Number', width: 200 },
        { field: 'city', headerName: 'City', width: 200 },
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="edit" onClick={() => handleEdit(params)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => { handleClickDopen(); setDid(params.id) }}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        },
    ];

    const loadData = () => {
        let localData = JSON.parse(localStorage.getItem("Patients"));
        if (localData !== null) {
            setData(localData);
        }
    }
    useEffect(() => {
        loadData()
    }, [])

    const handleSearch = (value) => {
        let localData = JSON.parse(localStorage.getItem("Patients"));

        let fData = localData.filter((p) => (
            p.name.toLowerCase().includes(value.toLowerCase()) ||
            p.age.toString().includes(value) ||
            p.phone.toString().includes(value) ||
            p.city.toLowerCase().includes(value.toLowerCase())
        ))
        setSearch(fData)
        console.log(fData);
    }
    const finalData =  search.length > 0 ? search :  data 
    return (
        <div>
            <h2>Patients</h2>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Appointment
            </Button>
            <TextField
                margin="dense"
                name="search"
                label="search patient Details"
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
                    {"Are you sure to delete this data ?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={handleDelete} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={open} onClose={handleClose} fullWidth>
                {
                    update ?
                        <DialogTitle>Update Patient Details</DialogTitle>
                        :
                        <DialogTitle>patient Details</DialogTitle>
                }
                <Formik values={formikObj}>
                    <Form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField
                                value={values.name}
                                margin="dense"
                                name="name"
                                label="patient name"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.name && touched.name ? <p>{errors.name}</p> : ''}
                            <TextField
                                value={values.age}
                                margin="dense"
                                name="age"
                                label="patient age"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.age && touched.age ? <p>{errors.age}</p> : ''}
                            <TextField
                                value={values.phone}
                                margin="dense"
                                name="phone"
                                label="Contact Number"
                                type="tel"
                                fullWidth
                                variant="standard"
                                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                maxlength="10"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.phone && touched.phone ? <p>{errors.phone}</p> : ''}
                            <TextField
                                value={values.date}
                                margin="dense"
                                name="city"
                                label="City Name"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.city && touched.city ? <p>{errors.city}</p> : ''}
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                {
                                    update ?
                                        <Button type="submit">Update</Button> :
                                        <Button type="submit">Add</Button>
                                }
                            </DialogActions>
                        </DialogContent>
                    </Form>
                </Formik>
            </Dialog>
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

export default Patients;