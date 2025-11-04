/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import axios from 'axios';
import './App.css';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 0,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser})
  }

  addCredit = (credit) => {
    const newCreditList = [...this.state.creditList, credit];
    this.setState({creditList: newCreditList});
    this.calculateAccountBalance(newCreditList, this.state.debitList);
  }

  addDebit = (debit) => {
    const newDebitList = [...this.state.debitList, debit];
    this.setState({debitList: newDebitList});
    this.calculateAccountBalance(this.state.creditList, newDebitList);
  }

  calculateAccountBalance = (credits, debits) => {
    const totalCredits = credits.reduce((acc, credit) => acc + credit.amount, 0);
    const totalDebits = debits.reduce((acc, debit) => acc + debit.amount, 0);
    const accountBalance = (totalCredits - totalDebits).toFixed(2);
    this.setState({accountBalance});
  }

  async componentDidMount() {
    try {
      let credits = await axios.get("https://johnnylaicode.github.io/api/credits.json");
      let debits = await axios.get("https://johnnylaicode.github.io/api/debits.json");
      
      credits = credits.data;
      debits = debits.data;

      this.setState({creditList: credits, debitList: debits});
      this.calculateAccountBalance(credits, debits);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (<Credits credits={this.state.creditList} addCredit={this.addCredit} accountBalance={this.state.accountBalance} />) 
    const DebitsComponent = () => (<Debits debits={this.state.debitList} addDebit={this.addDebit} accountBalance={this.state.accountBalance} />) 

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
          <header className="navbar">
            <div className="nav-brand">Bank of React</div>
            <nav className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/credits">Credits</Link>
              <Link to="/debits">Debits</Link>
              <Link to="/userProfile">User</Link>
              <Link to="/login">Login</Link>
            </nav>
            <div className={`nav-balance ${Number(this.state.accountBalance) < 0 ? 'neg' : ''}`}>
              Balance: {Number(this.state.accountBalance || 0).toFixed(2)}
            </div>
          </header>
          <main className="container">
            <Route exact path="/" render={HomeComponent}/>
            <Route exact path="/userProfile" render={UserProfileComponent}/>
            <Route exact path="/login" render={LogInComponent}/>
            <Route exact path="/credits" render={CreditsComponent}/>
            <Route exact path="/debits" render={DebitsComponent}/>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
