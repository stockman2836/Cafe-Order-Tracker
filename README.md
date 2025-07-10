# 🍴 Cafe Order Tracker

A React application for tracking customer orders in a cafe, developed using class components and all lifecycle methods. Features order filtering by status and order deletion with confirmation.

## 🚀 Running the Application

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm start
   ```

3. **Open in browser:**
   ```
   http://localhost:3000
   ```

## 🧠 Architecture and Features

### Project Structure
```
src/
├── App.js                 # Main component
├── App.css               # Main component styles
├── index.js              # Entry point
└── components/
    ├── OrderList.js      # Order list component
    ├── OrderList.css     # Order list styles
    ├── OrderItem.js      # Individual order component
    └── OrderItem.css     # Order item styles
```

### App.js Component
**Used lifecycle methods:**

- **`constructor(props)`** - Initialize state with orders array and filtering
- **`componentDidMount()`** - Load initial data (API simulation)
- **`getDerivedStateFromProps()`** - Update state when props change
- **`shouldComponentUpdate()`** - Render optimization (blocks re-render if orders count, filter, or filtered orders unchanged)
- **`getSnapshotBeforeUpdate()`** - Save state before update
- **`componentDidUpdate()`** - Log changes after update and trigger filtering

**State:**
```javascript
{
  orders: [
    { id: 1, dish: 'Cappuccino', status: false },
    { id: 2, dish: 'Chocolate Croissant', status: true },
    { id: 3, dish: 'Caesar Salad', status: false }
  ],
  filter: 'all',          
  filteredOrders: []     
}
```

**New Features:**
- **Filter Management:** Three filter buttons (All, Completed, Pending)
- **Dynamic Filtering:** Real-time order filtering based on status
- **Order Deletion:** Delete orders with confirmation dialog
- **Filter State:** Preserves filter selection and updates counts dynamically

### OrderList.js Component
- Receives filtered orders and current filter via props
- **`getDerivedStateFromProps()`** - Handles filter changes and order updates
- Displays different messages based on current filter
- Logs filter changes and order list updates

**Local state:**
```javascript
{
  currentFilter: 'all',    
  displayedOrders: []      
}
```

### OrderItem.js Component
**Local state:**
```javascript
{
  isSelected: false,      
  hovered: false,        
  showDeleteConfirm: false 
}
```

**Functionality:**
- Click on order - highlights it
- Status toggle button to mark as completed/pending
- Delete button with confirmation dialog
- Visual status indication (completed/pending/selected)
- Animations and effects

## 🎯 Application Behavior

1. **Loading:** After launch, shows loading indicator, then displays 3 initial orders
2. **Filtering:** Use filter buttons to show All, Completed, or Pending orders
3. **Interaction:** Clicking an order highlights it, shows "🎯 Selected" indicator
4. **Status Management:** Buttons allow marking orders as completed/pending
5. **Order Deletion:** Click delete button, confirm in dialog to remove order
6. **Adding Orders:** "➕ Add Order" button creates new orders
7. **Logging:** All lifecycle methods output information to console

## 🔍 Filter Functionality

### Filter Buttons:
- **📋 All** - Shows all orders (completed + pending)
- **✅ Completed** - Shows only completed orders
- **⏳ Pending** - Shows only pending orders

### Filter Logic:
- Counts are updated dynamically as orders change
- `getDerivedStateFromProps` in OrderList handles filter state changes
- Filter state triggers component updates and re-filtering
- Empty states show appropriate messages for each filter

## 🗑️ Order Deletion

### Deletion Process:
1. Click "🗑️ Delete" button on any order
2. Confirmation dialog appears with "❓ Delete this order?"
3. Choose "🗑️ Yes, Delete" or "❌ Cancel"
4. Order is permanently removed from the list
5. Filtered lists update automatically

### Safety Features:
- Confirmation dialog prevents accidental deletion
- Visual feedback during deletion process
- Click outside dialog to cancel deletion

## 📊 Console Logs

Open DevTools (F12) → Console to see:
- Lifecycle method calls for all components
- Filter change notifications
- State changes and updates
- Order deletion confirmations
- User interaction actions
- Render optimizations

## 🎨 Interface Features

- **Modern design** with gradients and shadows
- **Responsive layout** for mobile devices
- **Filter controls** with active state indicators
- **Animated interactions** on hover and selection
- **Color indication** of order status:
  - 🟡 Pending (yellow)
  - 🟢 Completed (green)
  - 🔵 Selected (blue)
  - 🔴 Delete confirmation (red)

## 🔧 Technical Details

- **React 18** with class components
- **CSS Grid** for responsive layout
- **CSS Animations** for smooth transitions
- **State Management** with filtering logic
- **getDerivedStateFromProps** for prop-to-state synchronization
- **Console logging** for debugging
- **Emojis** for improved UX

## 🚀 Functionality Demo

1. Start the application (`npm start`)
2. Open browser console to see lifecycle logs
3. **Test Filtering:**
   - Click filter buttons to switch between All/Completed/Pending
   - Observe how `getDerivedStateFromProps` handles filter changes
   - Watch filter counts update dynamically
4. **Test Order Management:**
   - Click on orders to select them
   - Toggle order status between completed/pending
   - Add new orders with the "Add Order" button
5. **Test Deletion:**
   - Click delete button on any order
   - Confirm or cancel deletion
   - See how filtered lists update automatically
6. **Study Lifecycle Methods:**
   - Observe `shouldComponentUpdate` optimization behavior
   - Watch `getDerivedStateFromProps` in both App and OrderList
   - Monitor component updates during filtering

## 🎓 Learning Objectives Achieved

✅ **Filter Management:** Global state filtering with prop passing  
✅ **getDerivedStateFromProps:** Used in OrderList for filter state synchronization  
✅ **State Combination:** Global filter state + local component states  
✅ **Dynamic Updates:** Real-time filtering and count updates  
✅ **User Interactions:** Order selection, status changes, deletion with confirmation  
✅ **Lifecycle Mastery:** All major lifecycle methods demonstrated with logging 