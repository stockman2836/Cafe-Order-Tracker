import React, { Component } from 'react';
import OrderList from './components/OrderList';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    console.log('🔄 App: constructor called');
    
    this.state = {
      orders: [],
      filter: props.filter || 'all',
      filteredOrders: []
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
      
      this.setState({ orders: initialOrders }, () => {
        this.applyFilter();
      });
      console.log('📥 Initial orders loaded:', initialOrders);
    }, 1000);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('🔄 App: shouldComponentUpdate called');
    
    const shouldUpdate = nextState.orders.length !== this.state.orders.length ||
                        nextState.filter !== this.state.filter ||
                        nextState.filteredOrders.length !== this.state.filteredOrders.length;
    console.log(`🎯 Should update component: ${shouldUpdate}`);
    
    return shouldUpdate;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('🔄 App: getSnapshotBeforeUpdate called');
    
    const snapshot = {
      previousOrderCount: prevState.orders.length,
      previousFilter: prevState.filter
    };
    console.log('📸 State snapshot:', snapshot);
    
    return snapshot;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('🔄 App: componentDidUpdate called');
    
    if (snapshot) {
      const currentOrderCount = this.state.orders.length;
      console.log(`📊 Order count change: ${snapshot.previousOrderCount} → ${currentOrderCount}`);
      
      if (snapshot.previousFilter !== this.state.filter) {
        console.log(`🔍 Filter changed: ${snapshot.previousFilter} → ${this.state.filter}`);
        this.applyFilter();
      }
    }

    if (prevState.orders !== this.state.orders && prevState.filter === this.state.filter) {
      this.applyFilter();
    }
  }

  applyFilter = () => {
    const { orders, filter } = this.state;
    let filteredOrders;

    switch (filter) {
      case 'completed':
        filteredOrders = orders.filter(order => order.status === true);
        break;
      case 'pending':
        filteredOrders = orders.filter(order => order.status === false);
        break;
      case 'all':
      default:
        filteredOrders = orders;
        break;
    }

    console.log(`🔍 Applied filter "${filter}": ${filteredOrders.length} orders shown`);
    this.setState({ filteredOrders });
  }

  setFilter = (newFilter) => {
    console.log(`🔍 Setting filter to: ${newFilter}`);
    this.setState({ filter: newFilter });
  }

  toggleOrderStatus = (orderId) => {
    console.log(`🔄 Toggling order status #${orderId}`);
    
    this.setState(prevState => ({
      orders: prevState.orders.map(order =>
        order.id === orderId ? { ...order, status: !order.status } : order
      )
    }));
  }

  deleteOrder = (orderId) => {
    console.log(`🗑️ Deleting order #${orderId}`);
    
    this.setState(prevState => ({
      orders: prevState.orders.filter(order => order.id !== orderId)
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
    
    const { orders, filter, filteredOrders } = this.state;

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

          <div className="filter-controls">
            <h3>Filter Orders:</h3>
            <div className="filter-buttons">
              <button 
                className={`filter-button ${filter === 'all' ? 'active' : ''}`}
                onClick={() => this.setFilter('all')}
              >
                📋 All ({orders.length})
              </button>
              <button 
                className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
                onClick={() => this.setFilter('completed')}
              >
                ✅ Completed ({orders.filter(o => o.status).length})
              </button>
              <button 
                className={`filter-button ${filter === 'pending' ? 'active' : ''}`}
                onClick={() => this.setFilter('pending')}
              >
                ⏳ Pending ({orders.filter(o => !o.status).length})
              </button>
            </div>
          </div>
          
          <OrderList 
            orders={filteredOrders}
            filter={filter}
            onToggleStatus={this.toggleOrderStatus}
            onDeleteOrder={this.deleteOrder}
          />
        </main>
      </div>
    );
  }
}

export default App; 