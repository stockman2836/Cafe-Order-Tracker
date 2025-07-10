import React, { Component } from 'react';
import './OrderItem.css';

class OrderItem extends Component {
  constructor(props) {
    super(props);
    console.log(`🔄 OrderItem #${props.order.id}: constructor called`);
    
    this.state = {
      isSelected: false,
      hovered: false,
      showDeleteConfirm: false
    };
  }

  componentDidMount() {
    console.log(`🔄 OrderItem #${this.props.order.id}: componentDidMount called`);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(`🔄 OrderItem #${this.props.order.id}: componentDidUpdate called`);
    
    if (prevState.isSelected !== this.state.isSelected) {
      console.log(`🎯 Order #${this.props.order.id} ${this.state.isSelected ? 'selected' : 'deselected'}`);
    }

    if (prevProps.order.status !== this.props.order.status) {
      console.log(`📝 Order #${this.props.order.id} status changed: ${this.props.order.status ? 'completed' : 'pending'}`);
    }

    if (prevState.showDeleteConfirm !== this.state.showDeleteConfirm) {
      console.log(`🗑️ Order #${this.props.order.id} delete confirmation ${this.state.showDeleteConfirm ? 'shown' : 'hidden'}`);
    }
  }

  handleItemClick = () => {
    console.log(`👆 Click on order #${this.props.order.id}`);
    
    this.setState(prevState => ({
      isSelected: !prevState.isSelected,
      showDeleteConfirm: false
    }));
  }

  handleStatusToggle = (e) => {
    e.stopPropagation();
    console.log(`🔄 Toggling status of order #${this.props.order.id}`);
    
    this.props.onToggleStatus(this.props.order.id);
  }

  handleDeleteClick = (e) => {
    e.stopPropagation();
    console.log(`🗑️ Delete button clicked for order #${this.props.order.id}`);
    
    this.setState({ showDeleteConfirm: true });
  }

  handleDeleteConfirm = (e) => {
    e.stopPropagation();
    console.log(`✅ Confirmed deletion of order #${this.props.order.id}`);
    
    this.props.onDeleteOrder(this.props.order.id);
  }

  handleDeleteCancel = (e) => {
    e.stopPropagation();
    console.log(`❌ Cancelled deletion of order #${this.props.order.id}`);
    
    this.setState({ showDeleteConfirm: false });
  }

  handleMouseEnter = () => {
    this.setState({ hovered: true });
  }

  handleMouseLeave = () => {
    this.setState({ hovered: false });
  }

  render() {
    console.log(`🔄 OrderItem #${this.props.order.id}: render called`);
    
    const { order } = this.props;
    const { isSelected, hovered, showDeleteConfirm } = this.state;

    const itemClasses = [
      'order-item',
      isSelected ? 'selected' : '',
      hovered ? 'hovered' : '',
      order.status ? 'completed' : 'pending',
      showDeleteConfirm ? 'delete-confirm' : ''
    ].filter(Boolean).join(' ');

    return (
      <div 
        className={itemClasses}
        onClick={this.handleItemClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className="order-info">
          <div className="order-header">
            <span className="order-id">#{order.id}</span>
            <span className={`status-badge ${order.status ? 'completed' : 'pending'}`}>
              {order.status ? '✅ Completed' : '⏳ Pending'}
            </span>
          </div>
          
          <h3 className="dish-name">{order.dish}</h3>
          
          {showDeleteConfirm ? (
            <div className="delete-confirmation">
              <p>❓ Delete this order?</p>
              <div className="confirm-buttons">
                <button 
                  className="confirm-delete"
                  onClick={this.handleDeleteConfirm}
                >
                  🗑️ Yes, Delete
                </button>
                <button 
                  className="cancel-delete"
                  onClick={this.handleDeleteCancel}
                >
                  ❌ Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="order-actions">
              <button 
                className={`status-button ${order.status ? 'mark-pending' : 'mark-completed'}`}
                onClick={this.handleStatusToggle}
              >
                {order.status ? '↩️ Mark as Pending' : '✅ Mark as Completed'}
              </button>
              <button 
                className="delete-button"
                onClick={this.handleDeleteClick}
              >
                🗑️ Delete
              </button>
            </div>
          )}
        </div>
        
        {isSelected && (
          <div className="selection-indicator">
            🎯 Selected
          </div>
        )}
      </div>
    );
  }
}

export default OrderItem; 