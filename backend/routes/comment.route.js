import express from 'express';

const router = express.Router();

router.get('/users', (req, res) => {
    res.status(200).send('User Route');
});

export default router;