import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AccountBalance from './AccountBalance';

class Debits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newDebit: {
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
      newDebit: {
        ...prevState.newDebit,
        [name]: value,
      },
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { amount } = this.state.newDebit;
    const newDebit = {
      ...this.state.newDebit,
      amount: parseFloat(amount),
    };
    this.props.addDebit(newDebit);
    this.setState({
      newDebit: {
        description: '',
        amount: '',
        date: new Date().toISOString().slice(0, 10),
      },
    });
  };

  render() {
    const { debits, accountBalance } = this.props;
    const { description, amount } = this.state.newDebit;

    // Display newest first without mutating props
    const ordered = [...debits].reverse();
    return (
      <div className="page card">
        <h1>Debits</h1>
        <AccountBalance accountBalance={accountBalance} />
        <br />
        <div className="list">
          {ordered.map((debit, index) => (
            <div className="list-item" key={index}>
              <div className="item-main">
                <span className="item-desc">{debit.description}</span>
                <span className="item-amount debit">${Number(debit.amount).toFixed(2)}</span>
              </div>
              <div className="item-date">{String(debit.date).slice(0, 10)}</div>
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
          <button type="submit">Add Debit</button>
        </form>
        <br />
        <Link to="/">Return to Home</Link>
      </div>
    );
  }
}

export default Debits;
