# 🍴 Cafe Order Tracker

A React application for tracking customer orders in a cafe, developed using class components and all lifecycle methods.

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

- **`constructor(props)`** - Initialize state with orders array
- **`componentDidMount()`** - Load initial data (API simulation)
- **`getDerivedStateFromProps()`** - Update state when props change
- **`shouldComponentUpdate()`** - Render optimization (blocks re-render if order count unchanged)
- **`getSnapshotBeforeUpdate()`** - Save state before update
- **`componentDidUpdate()`** - Log changes after update

**State:**
```javascript
{
  orders: [
    { id: 1, dish: 'Cappuccino', status: false },
    { id: 2, dish: 'Chocolate Croissant', status: true },
    { id: 3, dish: 'Caesar Salad', status: false }
  ],
  filter: 'all'
}
```

### OrderList.js Component
- Receives orders array via props
- Displays each order using OrderItem component
- Logs changes in order count

### OrderItem.js Component
**Local state:**
```javascript
{
  isSelected: false,    
  hovered: false    
}
```

**Functionality:**
- Click on order - highlights it
- Button to change order status
- Visual status indication (completed/pending)
- Animations and effects

## 🎯 Application Behavior

1. **Loading:** After launch, shows loading indicator, then displays 3 initial orders
2. **Interaction:** Clicking an order highlights it, shows "🎯 Selected" indicator
3. **Status Management:** Buttons allow marking orders as completed/pending
4. **Adding Orders:** "➕ Add Order" button creates new orders
5. **Logging:** All lifecycle methods output information to console

## 📊 Console Logs

Open DevTools (F12) → Console to see:
- Lifecycle method calls
- State changes
- User interaction actions
- Render optimizations

## 🎨 Interface Features

- **Modern design** with gradients and shadows
- **Responsive layout** for mobile devices
- **Animations** on hover and selection
- **Color indication** of order status:
  - 🟡 Pending (yellow)
  - 🟢 Completed (green)
  - 🔵 Selected (blue)

## 🔧 Technical Details

- **React 18** with class components
- **CSS Grid** for responsive layout
- **CSS Animations** for smooth transitions
- **Console logging** for debugging
- **Emojis** for improved UX

## 🚀 Functionality Demo

1. Start the application (`npm start`)
2. Open browser console
3. Observe lifecycle logs
4. Click on orders to select them
5. Change order statuses
6. Add new orders
7. Study `shouldComponentUpdate` behavior 