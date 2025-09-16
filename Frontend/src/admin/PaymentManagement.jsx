import React from 'react';
import './PaymentManagement.css';

export const PaymentManagement = () => {
  return (
    <div className="payment-management-container p-4">
      <h1 className="text-2xl font-bold mb-4">Payment Management</h1>
      <div className="card bg-base-100 shadow-xl mb-4">
        <div className="card-body">
          <h2 className="card-title">Payment Overview</h2>
          <p>Summary of all payments, transactions, and revenue.</p>
          <div className="stats stats-vertical lg:stats-horizontal shadow">
            <div className="stat">
              <div className="stat-title">Total Revenue</div>
              <div className="stat-value">$89,400</div>
              <div className="stat-desc">Jan 1st - Feb 1st</div>
            </div>
            <div className="stat">
              <div className="stat-title">Successful Transactions</div>
              <div className="stat-value">4,200</div>
              <div className="stat-desc">↗︎ 400 (22%)</div>
            </div>
            <div className="stat">
              <div className="stat-title">Pending Payments</div>
              <div className="stat-value">1,200</div>
              <div className="stat-desc">↘︎ 90 (14%)</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#TRN001</td>
                  <td>John Doe</td>
                  <td>$120.00</td>
                  <td><div className="badge badge-success">Completed</div></td>
                  <td>2023-10-26</td>
                  <td>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </td>
                </tr>
                <tr>
                  <td>#TRN002</td>
                  <td>Jane Smith</td>
                  <td>$75.50</td>
                  <td><div className="badge badge-warning">Pending</div></td>
                  <td>2023-10-25</td>
                  <td>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </td>
                </tr>
                <tr>
                  <td>#TRN003</td>
                  <td>Peter Jones</td>
                  <td>$200.00</td>
                  <td><div className="badge badge-error">Failed</div></td>
                  <td>2023-10-24</td>
                  <td>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default PaymentManagement;