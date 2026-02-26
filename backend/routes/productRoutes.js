import express from 'express';
// import { addProduct, getAllProduct , deleteProduct , upDateProduct , getMyOrder} from '../controllers/productController.js';
import {addProduct ,getAllProduct, deleteProduct ,upDateProduct , getMyOrder} from '../controllers/productController.js';
import {  isAdmin ,isAuthenticated } from '../middleware/isAuthenticated.js';
import { multipleUpload } from '../middleware/multer.js';
// import { getAllProduct } from '../controllers/productContrioller';

const router = express.Router();

router.post('/add' , isAuthenticated, isAdmin ,  multipleUpload , addProduct);
router.get('/getallproducts', getAllProduct); 
router.get('/myOrder' , isAuthenticated, getMyOrder);
router.delete('/delete/:productId', isAuthenticated, isAdmin, deleteProduct);
router.put('/update/:productId', isAuthenticated, isAdmin, multipleUpload, upDateProduct);

export default router;