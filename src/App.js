import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Medicine from './container/medicine/Medicine';
import Patients from './container/patients/Patients';
import Layout from './component/layout/Layout';

function App() {
  return (
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
  );
}

export default App;
