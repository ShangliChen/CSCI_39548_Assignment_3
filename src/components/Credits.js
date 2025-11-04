import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AccountBalance from './AccountBalance';

class Credits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newCredit: {
        description: '',
        amount: '',
        // Store date as yyyy-mm-dd for consistency with display
        date: new Date().toISOString().slice(0, 10),
      },
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      newCredit: {
        ...prevState.newCredit,
        [name]: value,
      },
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { amount } = this.state.newCredit;
    const newCredit = {
      ...this.state.newCredit,
      amount: parseFloat(amount),
    };
    this.props.addCredit(newCredit);
    this.setState({
      newCredit: {
        description: '',
        amount: '',
        date: new Date().toISOString().slice(0, 10),
      },
    });
  };

  render() {
    const { credits, accountBalance } = this.props;
    const { description, amount } = this.state.newCredit;

    // Display newest first without mutating props
    const ordered = [...credits].reverse();
    return (
      <div className="page card">
        <h1>Credits</h1>
        <AccountBalance accountBalance={accountBalance} />
        <br />
        <div className="list">
          {ordered.map((credit, index) => (
            <div className="list-item" key={index}>
              <div className="item-main">
                <span className="item-desc">{credit.description}</span>
                <span className="item-amount">${Number(credit.amount).toFixed(2)}</span>
              </div>
              <div className="item-date">{String(credit.date).slice(0, 10)}</div>
            </div>
          ))}
        </div>
        <br />
        <form className="form" onSubmit={this.handleSubmit}>
          <div>
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={description}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              value={amount}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit">Add Credit</button>
        </form>
        <br />
        <Link to="/">Return to Home</Link>
      </div>
    );
  }
}

export default Credits;
