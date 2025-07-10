import React, { Component } from 'react';
import OrderList from './components/OrderList';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    console.log('🔄 App: constructor called');
    
    this.state = {
      orders: [],
      filter: props.filter || 'all'
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('🔄 App: getDerivedStateFromProps called', { nextProps, prevState });
    
    if (nextProps.filter && nextProps.filter !== prevState.filter) {
      return {
        filter: nextProps.filter
      };
    }
    
    return null;
  }

  componentDidMount() {
    console.log('🔄 App: componentDidMount called');
    
    setTimeout(() => {
      const initialOrders = [
        { id: 1, dish: 'Cappuccino', status: false },
        { id: 2, dish: 'Chocolate Croissant', status: true },
        { id: 3, dish: 'Caesar Salad', status: false }
      ];
      
      this.setState({ orders: initialOrders });
      console.log('📥 Initial orders loaded:', initialOrders);
    }, 1000);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('🔄 App: shouldComponentUpdate called');
    
    const shouldUpdate = nextState.orders.length !== this.state.orders.length;
    console.log(`🎯 Should update component: ${shouldUpdate}`);
    
    return shouldUpdate;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('🔄 App: getSnapshotBeforeUpdate called');
    
    const snapshot = {
      previousOrderCount: prevState.orders.length
    };
    console.log('📸 State snapshot:', snapshot);
    
    return snapshot;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('🔄 App: componentDidUpdate called');
    
    if (snapshot) {
      const currentOrderCount = this.state.orders.length;
      console.log(`📊 Order count change: ${snapshot.previousOrderCount} → ${currentOrderCount}`);
    }
  }

  toggleOrderStatus = (orderId) => {
    console.log(`🔄 Toggling order status #${orderId}`);
    
    this.setState(prevState => ({
      orders: prevState.orders.map(order =>
        order.id === orderId ? { ...order, status: !order.status } : order
      )
    }));
  }

  addOrder = () => {
    const newOrder = {
      id: Date.now(),
      dish: `New Dish #${this.state.orders.length + 1}`,
      status: false
    };

    this.setState(prevState => ({
      orders: [...prevState.orders, newOrder]
    }));
  }

  render() {
    console.log('🔄 App: render called');
    
    const { orders, filter } = this.state;

    return (
      <div className="app">
        <header className="app-header">
          <h1>🍴 Cafe Order Tracker</h1>
          <p>Customer Order Management</p>
        </header>
        
        <main className="app-main">
          <div className="controls">
            <button onClick={this.addOrder} className="add-button">
              ➕ Add Order
            </button>
            <span className="order-count">
              Total Orders: {orders.length}
            </span>
          </div>
          
          <OrderList 
            orders={orders} 
            onToggleStatus={this.toggleOrderStatus}
          />
        </main>
      </div>
    );
  }
}

export default App; 