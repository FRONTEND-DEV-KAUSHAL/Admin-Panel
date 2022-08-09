import React from 'react'
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Layout from "./component/layout/Layout";
import Doctors from "./container/doctors/Doctors";
import Medicines from "./container/medicine/Medicine";
import Patients from "./container/patients/Patients";
import { useSelector } from 'react-redux';
import { conFigure } from "./redux/Store";
import { rootCounter } from "./redux/reducer/Index";
import Counter from "./container/counter/Counter";


function App() {

  const {store} = conFigure()

  return (
    <>
      <Provider store={store}>
        <Layout>
          <Switch>
            <Route path={'/medicines'} exact component={Medicines}></Route>
            <Route path={'/patients'} exact component={Patients}></Route>
            <Route path={'/doctors'} exact component={Doctors}></Route>
            <Route path={'/counter'} exact component={Counter}></Route>
          </Switch>
        </Layout>
      </Provider>
    </>
  );
}

export default App;