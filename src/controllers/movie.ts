import got from 'got';
import { swapiBaseMovieUrl } from '~/helpers/constant';
import { IMovie } from '@models/Movie';
import { SwapiResponse } from '@models/Shared';
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
  show(id: number): Promise<IMovie> {
    // Make APi Call to external api
    return got<Promise<IMovie>>(`${swapiBaseMovieUrl}/${id}`, {
      responseType: 'json',
    }).then((res) => res.body);
  },
};
export default MovieController;
