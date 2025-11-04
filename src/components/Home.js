/*==================================================
src/components/Home.js

The Home component is used to demonstrate the use of Link.
==================================================*/
import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div className="page card">
        <img className="hero" src="https://picsum.photos/1200/260" alt="bank"/>
        <h1 className="title">Welcome to Bank of React</h1>
        <p className="subtitle">Simple demo of routing, forms, and state</p>
        <div className="quick-links">
          <Link className="btn" to="/credits">View Credits</Link>
          <Link className="btn" to="/debits">View Debits</Link>
          <Link className="btn" to="/userProfile">User Profile</Link>
          <Link className="btn" to="/login">Login</Link>
        </div>
        <div className="home-balance">
          <AccountBalance accountBalance={this.props.accountBalance}/>
        </div>
      </div>
    );
  }
}

export default Home;
