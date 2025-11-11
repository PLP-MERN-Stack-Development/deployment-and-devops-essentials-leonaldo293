// bugRoutes.js
import express from 'express';
const router = express.Router();

// Rota de exemplo
router.get('/', (req, res) => {
    res.json({ message: 'Bug routes working!' });
});

export default router;