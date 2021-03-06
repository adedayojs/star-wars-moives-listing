import { Router } from 'express';
import userRouteHandler from './users';
import movieRouteHandler from './movie';
import sampleController from '@controllers/sample';

const router = Router();

router.get('/', function (_req, res, _next) {
  const message = sampleController();

  res.status(200).json({ message });
});

router.use('/movie', movieRouteHandler);
router.use('/users', userRouteHandler);

export default router;
