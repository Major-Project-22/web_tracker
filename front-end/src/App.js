import './App.css';
import Navbars from './Screens/navbar';
import Home from './Screens/Home'
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import Doctor from './Screens/doctor-portal.js'
import Nurse from './Screens/Nurse.js'
import Footer from './Screens/Footer';
import LOGA from './Screens/logA'
import LOGB from './Screens/logb'
import LOGC from './Screens/logC'
import LOGD from './Screens/logD'
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
            <Route exact path='/'>
            <Navbars/>
            <Home/>
            <Footer />
            </Route>
            <Route path='/logA'>
            <Navbars/>
              <LOGA/>
              <Footer/>
            </Route>
            <Route path='/logB'>
            <Navbars/>
              <LOGB/>
              <Footer/>
            </Route>
            <Route path='/logC'>
            <Navbars/>
              <LOGC/>
              <Footer/>
            </Route>
            <Route path='/logD'>
            <Navbars/>
              <LOGD/>
              <Footer/>
            </Route>
            <Route path='/Doctor'>
            <Navbars/>
            <h1>Doctor Portal</h1>
              <Doctor/>
              <Footer/>
            </Route>
            <Route path='/Nurse'>
            <Navbars/>
            <h1>Nurse Portal</h1>
              <Nurse/>
              <Footer/>
            </Route>
            </Switch>
      </Router>
    </div>
  );
}

export default App;
