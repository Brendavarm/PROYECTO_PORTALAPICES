import { Router } from 'express';
import { adminLogin } from '../controllers/authController.js';
import { getUsuarios, createUsuario } from '../controllers/usuariosController.js';
import {
  createPersonalizacion,
  getPersonalizaciones,
} from '../controllers/personalizacionesController.js';
import { getPedidos, updatePedidoEstado } from '../controllers/pedidosController.js';
import { getProductos } from '../controllers/productosController.js';
import { getStats } from '../controllers/statsController.js';
import { getNetworkInfo } from '../controllers/networkController.js';
import { postChatMessage, getChatStatus } from '../controllers/chatController.js';
import { requireAdmin } from '../middleware/requireAdmin.js';

const router = Router();

router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    project: 'GoalDesk Smart 2026',
    university: 'UNIFRANZ - Ingeniería de Sistemas',
  });
});

router.get('/network-info', getNetworkInfo);

router.get('/chat/status', getChatStatus);
router.post('/chat', postChatMessage);

router.post('/admin/login', adminLogin);

router.get('/stats', requireAdmin, getStats);
router.get('/usuarios', requireAdmin, getUsuarios);
router.post('/usuarios', createUsuario);
router.get('/personalizaciones', requireAdmin, getPersonalizaciones);
router.post('/personalizaciones', createPersonalizacion);
router.get('/pedidos', requireAdmin, getPedidos);
router.patch('/pedidos/:id/estado', requireAdmin, updatePedidoEstado);
router.get('/productos', getProductos);

export default router;
