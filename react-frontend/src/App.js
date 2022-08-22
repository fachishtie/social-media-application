import './App.css';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListSocialComponent from './components/ListSocialComponent';
import AddSocialComponent from './components/AddSocialComponent';
import Login from './components/Login';
import SignUpPage from './components/SignUpPage';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import Feed from './components/Feed';
import Friends from './components/Friends';

function App() {
  return (
    <div className = "App">
      <Router>
        <HeaderComponent/>
        <div className = "container">
          <Switch>
            <Route exact path = "/" component = {Login}></Route>
            <Route path = "/homepage/:id" component = {HomePage}></Route>
            <Route path = "/loginpage" component = {LoginPage}></Route>
            <Route path = "/signup" component = {SignUpPage}></Route>
            <Route path = "/social" component = {ListSocialComponent}></Route>
            <Route path = "/socials" component = {ListSocialComponent}></Route>
            <Route path = "/add-social" component = {AddSocialComponent}></Route>
            <Route path = "/edit-social/:id" component = {AddSocialComponent}></Route>
            <Route path = "/feed/:id" component = {Feed}></Route>
            <Route path = "/friends/:id" component = {Friends}></Route>
          </Switch>
        </div>
        </Router>
    </div>
  );
}

export default App;
