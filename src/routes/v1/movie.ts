import { Router } from 'express';
import Controller from '@controllers/movie';
import CharacterController from '@controllers/character';
import {
  cmToFeet,
  composeResponse,
  errorHandler,
  getTime,
  Sorter,
  sortOrder,
  sortType,
  successHandler,
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

    // Sort based on parameters requested
    Sorter(movies.results, sort as sortType, order as sortOrder);

    return res.status(200).json(composeResponse('Successful', movies));
  } catch (err) {
    return errorHandler(res, 500, 501, err as string);
  }
});

router.get('/:id/characters', async function (req, res) {
  try {
    const { id } = req.params;
    const movies = await Controller.show(Number(id));
    const characters = await Promise.all(
      movies.characters.map((char) => CharacterController.getByUrl(char)),
    );
    const totalHeightInCm = characters.reduce((prev: number, curr) => {
      return Number(curr.height) + prev;
    }, 0);
    const data = {
      results: characters,
      count: characters.length,
      totalHeightInCm,
      totalHeightInFeet: cmToFeet(totalHeightInCm),
    };

    return successHandler(res, 200, data);
  } catch (e) {
    return errorHandler(res, 500, 501, e as any);
  }
});

export default router;
