import React, { Component } from 'react';
import OrderItem from './OrderItem';
import './OrderList.css';

class OrderList extends Component {
  constructor(props) {
    super(props);
    console.log('🔄 OrderList: constructor called');
  }

  componentDidMount() {
    console.log('🔄 OrderList: componentDidMount called');
  }

  componentDidUpdate(prevProps) {
    console.log('🔄 OrderList: componentDidUpdate called');
    
    if (prevProps.orders.length !== this.props.orders.length) {
      console.log(`📋 Order list changed: ${prevProps.orders.length} → ${this.props.orders.length}`);
    }
  }

  render() {
    console.log('🔄 OrderList: render called');
    
    const { orders, onToggleStatus } = this.props;

    if (orders.length === 0) {
      return (
        <div className="order-list">
          <div className="empty-state">
            <h3>📝 Loading orders...</h3>
            <p>Please wait</p>
          </div>
        </div>
      );
    }

    return (
      <div className="order-list">
        <h2>📋 Order List ({orders.length})</h2>
        <div className="orders-container">
          {orders.map(order => (
            <OrderItem
              key={order.id}
              order={order}
              onToggleStatus={onToggleStatus}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default OrderList; 