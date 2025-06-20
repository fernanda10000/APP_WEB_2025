import { useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import UserForm from './module/users/userForm';
import OrderData from './module/order/OrderData';
import ProductoData from './module/product/ProductoData';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/users">Usuarios</Link></li>
          <li><Link to="/products">Productos</Link></li>
          <li><Link to="/orders">Ordenes</Link></li>
        </ul>
      </nav>
      
      <Routes>
        <Route path="/users" element={<UserForm />} />
        <Route path="/products" element={<ProductoData />} />
        <Route path="/orders" element={<OrderData />} />
      </Routes>
    </Router>
  );
}

export default App;
