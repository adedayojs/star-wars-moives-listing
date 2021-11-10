import { Router } from 'express';
import Controller from '@controllers/movie';
import CharacterController from '@controllers/character';
import CommentController from '@controllers/comment';
import { sortOrder, sortType, supportedFilter } from '~/helpers/constant';
import {
  composeResponse,
  Sorter,
  errorHandler,
  cmToFeet,
  successHandler,
  filterByObject,
} from '~/helpers/functions';
import { ICharacter } from '~/models/Character';

const router = Router();

router.get('/:id', async function (req, res, _next) {
  // Fetch from datasource, in this case external api
  const { id } = req.params;
  const movies = await Controller.show(Number(id));
  const comments = await CommentController.getByMovieId(Number(id));

  // Sort based on parameters requested
  successHandler(res, 200, { ...movies, commentCount: comments.length });
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

    return successHandler(res, 200, movies);
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

    // Create Filter object if the supported criteria are present
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

    //  Sort if Sorting is requested
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

router.post('/:id/comment', async function (req, res) {
  const { id } = req.params;
  const { body } = req;
  try {
    const comment = await CommentController.create({
      ...body,
      movieId: id,
      commenterIpAddress: req.ip,
    });
    return successHandler(res, 200, comment);
  } catch (e) {
    return errorHandler(res, 500, 501, e as string);
  }
});

router.get('/:id/comment', async function (req, res) {
  try {
    // Make Network Requests
    const { id } = req.params;
    const comments = await CommentController.getByMovieId(Number(id));

    return successHandler(res, 200, comments);
  } catch (e) {
    // We are passing the error as any because it could be an error that's not a string
    return errorHandler(res, 500, 501, e as any);
  }
});

export default router;
