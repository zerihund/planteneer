import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css';
import Navbar from './components/navbar/Navbar'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Gardens from './pages/Gardens'
import Garden from './pages/Garden'
import Plant from './pages/Plant'
import Diary from './pages/Diary';
import ProfileEdit from './pages/ProfileEdit'
import Stream from './pages/Stream';


function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/'component={Dashboard} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/gardens' component={Gardens} />
            <Route exact path='/garden/:id' component={Garden} />
            <Route exact path='/plant/:id' component={Plant} />
            <Route exact path='/diary' component={Diary} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/profileEdit' component={ProfileEdit} />
            <Route exact path='/stream' component={Stream} />
          </Switch>
        </div>
      </BrowserRouter>
  );
}

export default App;
