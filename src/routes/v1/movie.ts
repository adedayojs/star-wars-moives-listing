import { Router } from 'express';
import Controller from '@controllers/movie';
import {
  composeResponse,
  errorHandler,
  getTime,
  Sorter,
  sortOrder,
  sortType,
} from '~/helpers/constant';

const router = Router();

router.get('/:id', async function (req, res, _next) {
  // Fetch from datasource, in this case external api
  const { id } = req.params;
  const movies = await Controller.show(Number(id));

  // Sort based on parameters requested
  res.status(200).json(movies);
});

router.get('/', async function (req, res, _next) {
  try {
    // Fetch from datasource, in this case external api
    const movies = await Controller.showAll();

    const { sort, order } = req.query;

    if (!(sort && order)) {
      console.log('No sort and order');
      return res.status(200).json(composeResponse('Successful', movies));
    }
    console.log(sort, order);

    // Sort based on parameters requested
    Sorter(movies.result, sort as sortType, order as sortOrder);

    return res.status(200).json(composeResponse('Successful', movies));
  } catch (err) {
    errorHandler(res, 500, 501, err as string);
  }
});

export default router;
