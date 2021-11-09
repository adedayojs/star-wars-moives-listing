import got from 'got';
import { swapiBaseCharacterUrl } from '~/helpers/constant';
import { ICharacter } from '~/models/character';

const MovieController = {
  /**
   *
   * Display Single Characters by ID
   */
  get(id: number): Promise<ICharacter> {
    // Make APi Call to external api
    return got<Promise<ICharacter>>(`${swapiBaseCharacterUrl}/${id}`, {
      responseType: 'json',
    }).then((res) => res.body);
  },

  /**
   *
   * Display Single Characters by URL
   */
  getByUrl(url: string): Promise<ICharacter> {
    // Make Api Call to external api
    return got<Promise<ICharacter>>(url, {
      responseType: 'json',
    }).then((res) => res.body);
  },
};
export default MovieController;
