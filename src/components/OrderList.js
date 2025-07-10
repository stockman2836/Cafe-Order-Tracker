import React, { Component } from 'react';
import OrderItem from './OrderItem';
import './OrderList.css';

class OrderList extends Component {
  constructor(props) {
    super(props);
    console.log('🔄 OrderList: constructor called');
    
    this.state = {
      currentFilter: props.filter || 'all',
      displayedOrders: props.orders || []
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('🔄 OrderList: getDerivedStateFromProps called', { 
      nextFilter: nextProps.filter, 
      prevFilter: prevState.currentFilter,
      ordersCount: nextProps.orders.length 
    });

    let newState = null;

    if (nextProps.filter !== prevState.currentFilter) {
      console.log(`🔍 OrderList: Filter changed from "${prevState.currentFilter}" to "${nextProps.filter}"`);
      newState = {
        currentFilter: nextProps.filter,
        displayedOrders: nextProps.orders
      };
    } else if (nextProps.orders !== prevState.displayedOrders) {
      console.log(`📋 OrderList: Orders updated, count: ${nextProps.orders.length}`);
      newState = {
        displayedOrders: nextProps.orders
      };
    }

    return newState;
  }

  componentDidMount() {
    console.log('🔄 OrderList: componentDidMount called');
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('🔄 OrderList: componentDidUpdate called');
    
    if (prevProps.orders.length !== this.props.orders.length) {
      console.log(`📋 Order list changed: ${prevProps.orders.length} → ${this.props.orders.length}`);
    }

    if (prevState.currentFilter !== this.state.currentFilter) {
      console.log(`🔍 Filter applied in OrderList: ${this.state.currentFilter}`);
    }
  }

  render() {
    console.log('🔄 OrderList: render called');
    
    const { onToggleStatus, onDeleteOrder } = this.props;
    const { displayedOrders, currentFilter } = this.state;

    if (displayedOrders.length === 0) {
      return (
        <div className="order-list">
          <div className="empty-state">
            <h3>📝 {currentFilter === 'all' ? 'Loading orders...' : `No ${currentFilter} orders`}</h3>
            <p>{currentFilter === 'all' ? 'Please wait' : `Try changing the filter or add new orders`}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="order-list">
        <h2>📋 {currentFilter === 'all' ? 'All Orders' : 
               currentFilter === 'completed' ? 'Completed Orders' : 
               'Pending Orders'} ({displayedOrders.length})</h2>
        <div className="orders-container">
          {displayedOrders.map(order => (
            <OrderItem
              key={order.id}
              order={order}
              onToggleStatus={onToggleStatus}
              onDeleteOrder={onDeleteOrder}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default OrderList; 