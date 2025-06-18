import { Router } from 'express';
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
} from '../controller/product.controller';

const router = Router();

router.post('/products', createProduct);
router.get('/products', getProducts);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;
