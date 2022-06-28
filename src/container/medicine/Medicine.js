import React , { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { Form, useFormik, Formik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';

export default function Medicine() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const insertdata = (values) =>{
    let localdata = JSON.parse(localStorage.getItem("Medicine"));

    if (localdata === null) {
      localStorage.setItem("Medicine", JSON.stringify([values]));
    } else {
      localdata.push(values);
      localStorage.setItem("Medicine",JSON.stringify(localdata))
    }

    handleClose();
  }

  let schema = yup.object().shape({
    Mname: yup.string().required("Enter Medicine Name"),
    Mprice: yup.number().required("Enter Medicine price"),
    Mquantity: yup.number().required("Enter Medicine quantity"),
    Mexpiry: yup.number().required("Enter Medicine expiry"),
  });
  const formik = useFormik({
    initialValues: {
      Mname: '',
      Mprice: '',
      Mquantity: '',
      Mexpiry: '',
    },
    validationschema: schema,
    onSubmit: values => {
      insertdata(values);
    }
  });
  let { handleChange, handleBlur, tocuhed, errors, handleSubmit } = formik
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Medicine
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add medicine data</DialogTitle>
        <Formik values={formik}>
          <Form onSubmit={handleSubmit}>
            <DialogContent>
              <TextField
                margin="dense"
                id="name"
                label="Medicine Name"
                type="text"
                fullWidth
                variant="standard"
                name='Mname'
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.Mname && tocuhed.Mname ? <p>{errors.Mname}</p> : ''}
              <TextField
                margin="dense"
                id="name"
                label="Medicine Price"
                type="text"
                fullWidth
                variant="standard"
                name='Mprice'
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.Mprice && tocuhed.Mprice ? <p>{errors.Mprice}</p> : ''}

              <TextField
                margin="dense"
                id="name"
                label="Medicine Quantity"
                type="text"
                fullWidth
                variant="standard"
                name='Mquantity'
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.Mquantity && tocuhed.Mquantity ? <p>{errors.Mquantity}</p> : ''}

              <TextField
                margin="dense"
                id="name"
                label="Medicine Expiry"
                type="text"
                fullWidth
                variant="standard"
                name='Mexpiry'
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.Mexpiry && tocuhed.Mexpiry ? <p>{errors.Mexpiry}</p> : ''}

            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Add</Button>
            </DialogActions>
          </Form>
        </Formik>
      </Dialog>
    </div>
  );
}