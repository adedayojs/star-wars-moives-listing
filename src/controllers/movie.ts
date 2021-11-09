import { User } from '@models/User';
import got from 'got';
import { swapiBaseMovieUrl } from '~/helpers/constant';
const MovieController = {
  /**
   *
   * Display All Movies
   */
  showAll() {
    // Make APi Call to external api
    return got(swapiBaseMovieUrl, { responseType: 'json' }).then((res) => res.body);
  },
  show(id: number) {
    // Make APi Call to external api
    return got(`${swapiBaseMovieUrl}/${id}`, { responseType: 'json' }).then((res) => res.body);
  },
};
export default MovieController;
