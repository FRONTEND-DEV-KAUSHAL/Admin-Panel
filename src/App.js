import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Medicine from './container/medicine/Medicine';
import Patients from './container/patients/Patients';
import Layout from './component/layout/Layout';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <Layout >
    <Switch>
      <Route path={'/Medicine'} exact component={Medicine} ></Route>
      <Route path={'/Patients'} exact component={Patients} ></Route>
      <Route path={'/Counter'} exact component={Counter} ></Route>
    </Switch>
    </Layout>
    </Provider>
    
  );
}

export default App;
