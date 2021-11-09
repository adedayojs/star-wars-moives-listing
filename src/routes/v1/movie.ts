import { Router } from 'express';
import Controller from '@controllers/movie';

const router = Router();

router.get('/', async function (_req, res, _next) {
  // Fetch from datasource, in this case external api
  const movies = await Controller.show();

  // Sort based on parameters requested
  res.status(200).json(movies);
});

export default router;
