import { Router } from 'express';
import Controller from '@controllers/movie';
import CharacterController from '@controllers/character';
import { sortOrder, sortType, supportedFilter } from '~/helpers/constant';
import {
  composeResponse,
  Sorter,
  errorHandler,
  cmToFeet,
  successHandler,
  filterByObject,
} from '~/helpers/functions';
import { ICharacter } from '~/models/character';

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
    // Make Network Requests
    const { id } = req.params;
    const movies = await Controller.show(Number(id));

    let characters = await Promise.all(
      movies.characters.map((char) => CharacterController.getByUrl(char)),
    );

    // Filter if the supported criteria are present
    const { query } = req;
    const filterObj: { [key: string]: any } = {};

    for (let key in query) {
      if (supportedFilter.has(key)) {
        filterObj[key] = query[key];
      }
    }
    if (Object.keys(query).length > 0) {
      characters = filterByObject(filterObj, characters) as ICharacter[];
    }

    //  Sorting If Present
    const { sort, order } = req.query;

    if (sort && order) {
      // Sort based on parameters requested
      try {
        Sorter(characters, sort as sortType, order as sortOrder);
      } catch (e) {
        return errorHandler(
          res,
          500,
          501,
          'Sorry We couldnt Sort your request, Please make sure your sort parameter is supported',
        );
      }
    }

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
    // We are passing the error as any because it could be an error that's not a string
    return errorHandler(res, 500, 501, e as any);
  }
});

export default router;
