import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Medicine from './container/medicine/Medicine';
import Patients from './container/patients/Patients';
import Layout from './component/layout/Layout';

function App() {
  return (
<<<<<<< HEAD
    <>
      <Layout>
        <Switch>
              <Route path={'/medicine'} exact component={Medicine}></Route>
              <Route path={'/patients'} exact component={Patients}></Route>
        </Switch>
        <Medicine/>
        <Patients/>
        </Layout>
    </>
=======
    <Layout >
    <Switch>
      <Route path={'/Medicine'} exact component={Medicine} ></Route>
      <Route path={'/Patients'} exact component={Patients} ></Route>
    </Switch>
    </Layout>
>>>>>>> b9c4d69c3eba6a7f06a4e15ba452b055fcb2243c
  );
}

export default App;
