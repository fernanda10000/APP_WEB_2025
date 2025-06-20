import { Link } from 'react-router-dom';

const OrderData = () => {
  return (
    <div>
      <h2>Order Data</h2>
      <Link to="/orders/new">Create New Order</Link>
    </div>
  );
};

export default OrderData;
