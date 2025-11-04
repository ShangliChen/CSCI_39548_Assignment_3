/*==================================================
src/components/AccountBalance.js

The AccountBalance component displays account balance. It is included in other page views.
==================================================*/
import React, {Component} from 'react';

class AccountBalance extends Component {
  // Display account balance
  render() {
    const value = Number(this.props.accountBalance || 0).toFixed(2);
    return (
      <div>
        Balance: {value}
      </div>
    );
  }
}

export default AccountBalance;
