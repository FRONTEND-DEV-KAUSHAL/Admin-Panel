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
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { addMedicines, deleteMedicines, getMedicines, updateMedicines } from '../../redux/action/Medicine.action';

function Medicines(props) {
    const [open, setOpen] = useState(false);            // dialog open and close 
    const [dopen, setDopen] = useState(false);          // delete popup  
    const [data, setData] = useState([]);               //row data , store localstorage
    const [did, setDid] = useState(0)                   // delete id
    const [toggle, setToggle] = useState(false)         // update, add toggle
    const [search, setSearch] = useState([])

    const handleClickDopen = () => {
        setDopen(true);
    };

    const c = useSelector(state => state.counter)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDopen(false);
        setToggle(false)
        formikObj.resetForm()
    };
    // handleinsert  for data insert 
    const handleInsert = (values) => {
        console.log(values);
        let localData = JSON.parse(localStorage.getItem("medicine"))
        let id = Math.floor(Math.random() * 1000);
        console.log(id);
        let data = {
            id: id,
            ...values
        }
        dispatch(addMedicines(data))
        // if (localData === null) {
        //     localStorage.setItem("medicine", JSON.stringify([data]))
        // } else {
        //     localData.push(data)
        //     localStorage.setItem("medicine", JSON.stringify(localData))
        // }
        // handleClose()
        // loadData()
    }

    // handleUpdatedata for data update in localstorage
    const handleUpdatedata = (values) => {
        // let localData = JSON.parse(localStorage.getItem("medicine"));
        // let uData = localData.map((l) => {
        //     if (l.id === values.id) {
        //         return values;
        //     } else {
        //         return l;
        //     }
        // })
        dispatch(updateMedicines(values))
        // console.log(values);
        // localStorage.setItem("medicine", JSON.stringify(uData))
        handleClose()
        loadData()
    }

    // schema
    let schema = yup.object().shape({
        name: yup.string().required("please enter Medicine Name"),
        price: yup.number().required("please enter Medicine price").positive().integer(),
        quantity: yup.string().required("please enter Medicine quantity"),
        expiry: yup.string().required("please enter Medicine expiry"),
    });

    // formik 
    const formikObj = useFormik({
        initialValues: {
            name: '',
            price: '',
            quantity: '',
            expiry: ''
        },
        validationSchema: schema,
        onSubmit: values => {
            if (toggle) {
                handleUpdatedata(values)
            } else {
                handleInsert(values);
            }
            //  alert(JSON.stringify(values, null, 2));
        },
        enableReinitialize: true,
    });
    // formik destructring 
    const { handleChange, errors, handleSubmit, handleBlur, touched, values } = formikObj;

    // handleDelete for delete data record     
    const handleDelete = () => {
        // console.log(params.id);
        // let localData = JSON.parse(localStorage.getItem("medicine"));
        // let fData = localData.filter((l) => l.id !== did)
        // localStorage.setItem("medicine", JSON.stringify(fData))
        dispatch(deleteMedicines(did))

        loadData()
        handleClose()
    }

    // handleEdit for click on edit button and get row data
    const handleEdit = (params) => {
        handleClickOpen()
        formikObj.setValues(params.row)
        console.log(params.row);
        setToggle(true);
    }

    // columns 
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
                <>
                    <IconButton aria-label="edit" onClick={() => handleEdit(params)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => { handleClickDopen(); setDid(params.id) }}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        }
    ];
    // load data 
    const loadData = () => {
        let localData = JSON.parse(localStorage.getItem("medicine"));
        if (localData !== null) {
            setData(localData);
        }
    }

    const dispatch = useDispatch()
    const medicine = useSelector(state => state.medicine)

    useEffect(() => {
        // loadData()
        dispatch(getMedicines())
    }, [])

    const hancleSearch = (value) => {
        let localData = JSON.parse(localStorage.getItem("medicine"));
        let fData = localData.filter((l) => (
            l.name.toLowerCase().includes(value.toLowerCase()) ||
            l.price.toString().includes(value) ||
            l.quantity.toString().includes(value) ||
            l.expiry.toString().includes(value)
        ))
        setSearch(fData)
        // console.log(fData);

    }

    const finalData = search.length > 0 ? search : data

    return (
        <div>
            {
                medicine.isLoading ?
                    <p>Loading....</p>
                    :
                    medicine.error !== '' ?
                        <p>{medicine.error}</p>
                        :
                        <div>
                            <h2>Medicines {c.counter}</h2>
                            <Button variant="outlined" onClick={handleClickOpen}>
                                Add Medicine
                            </Button>
                            <TextField
                                margin="dense"
                                name="search"
                                label="Search Medicine "
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={(e) => hancleSearch(e.target.value)}
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
                                    toggle ? <DialogTitle>Update Medicine Data</DialogTitle>
                                        : <DialogTitle>Add medicine</DialogTitle>
                                }
                                <Formik values={formikObj}>
                                    <Form onSubmit={handleSubmit}>
                                        <DialogContent>
                                            <TextField
                                                value={values.name}
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
                                                value={values.price}
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
                                                value={values.quantity}
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
                                                value={values.expiry}
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
                                                {
                                                    toggle ? <Button type="submit">Update</Button>
                                                        : <Button type="submit">Add</Button>
                                                }
                                            </DialogActions>
                                        </DialogContent>
                                    </Form>
                                </Formik>
                            </Dialog>
                            <h4>Data table</h4>
                            <div style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    rows={medicine.medicine}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    checkboxSelection
                                />
                            </div>
                        </div>
            }
        </div>
    );
}

export default Medicines;
