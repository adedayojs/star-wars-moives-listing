import { User } from '@models/User';
const MovieController = {
  /**
   *
   * Display All Movies
   */
  show() {
    // Make APi Call to external api
    return User.find();
  },
};
export default MovieController;
