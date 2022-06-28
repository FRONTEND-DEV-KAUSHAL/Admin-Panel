import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';


function Medicines(props) {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formikObj.resetForm()

    };

    const handleInsert = (values) => {
        console.log(values);
        let localData = JSON.parse(localStorage.getItem("medicine"))

        let id = Math.floor(Math.random() * 1000);
        console.log(id);

        let data = {
            id: id,
            ...values
        }

        if (localData === null) {
            localStorage.setItem("medicine", JSON.stringify([data]))
        } else {
            localData.push(data)
            localStorage.setItem("medicine", JSON.stringify(localData))
        }
        handleClose()
        loadData()
    }

    let schema = yup.object().shape({
        name: yup.string().required("please enter Medicine Name"),
        price: yup.number().required("please enter Medicine price").positive().integer(),
        quantity: yup.string().required("please enter Medicine quantity"),
        expiry: yup.string().required("please enter Medicine expiry"),
    });

    const formikObj = useFormik({
        initialValues: {
            name: '',
            price: '',
            quantity: '',
            expiry: ''
        },
        validationSchema: schema,
        onSubmit: values => {
            handleInsert(values);
            //  alert(JSON.stringify(values, null, 2));
        },
        enableReinitialize: true,
    });

    const { handleChange, errors, handleSubmit, handleBlur, touched } = formikObj;


    const handleDelete =(params)=>{
        // console.log(params.id);
        let localData =JSON.parse(localStorage.getItem("medicine"));
        let fData = localData.filter((l)=> l.id !== params.id)
        localStorage.setItem("medicine", JSON.stringify(fData))
        loadData()
    }


    const columns = [
        { field: 'name', headerName: 'Medicine Name', width: 130 },
        { field: 'price', headerName: 'Price', width: 130 },
        { field: 'quantity', headerName: 'Quantity', width: 130 },
        { field: 'expiry', headerName: 'Expiry', width: 130 },
        {
            field: 'action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => (
                <IconButton aria-label="delete" onClick={()=>handleDelete(params)}>
                    <DeleteIcon />
                </IconButton>
            )
        }
    ];

    const loadData = () => {

        let localData = JSON.parse(localStorage.getItem("medicine"));

        if (localData !== null) {
            setData(localData);
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <div>
            <h2>Medicines</h2>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Medicine
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Add medicine</DialogTitle>
                <Formik values={formikObj}>
                    <Form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                name="name"
                                label="Medicine name"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.name && touched.name ? <p>{errors.name}</p> : ''}
                            <TextField
                                margin="dense"
                                name="price"
                                label="price"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.price && touched.price ? <p>{errors.price}</p> : ''}
                            <TextField
                                margin="dense"
                                name="quantity"
                                label="quantity"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.quantity && touched.quantity ? <p>{errors.quantity}</p> : ''}
                            <TextField
                                margin="dense"
                                name="expiry"
                                label="expiry"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.expiry && touched.expiry ? <p>{errors.expiry}</p> : ''}
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type="submit">Add</Button>
                            </DialogActions>
                        </DialogContent>
                    </Form>
                </Formik>
            </Dialog>
            <h4>Data table</h4>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>
        </div>
    );
}

export default Medicines;
