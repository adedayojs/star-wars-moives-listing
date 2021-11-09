import got from 'got';
import { swapiBaseMovieUrl } from '~/helpers/constant';
import { IMovie, SwapiResponse } from '~/models/movie';
const MovieController = {
  /**
   *
   * Display All Movies
   */
  showAll(): Promise<SwapiResponse<Array<IMovie>>> {
    // Make APi Call to external api
    return got<Promise<SwapiResponse<Array<IMovie>>>>(swapiBaseMovieUrl, {
      responseType: 'json',
    }).then((res) => res.body);
  },
  show(id: number) {
    // Make APi Call to external api
    return got(`${swapiBaseMovieUrl}/${id}`, { responseType: 'json' }).then((res) => res.body);
  },
};
export default MovieController;
