export const swapiBaseMovieUrl = 'https://swapi.dev/api/films';
export const swapiBaseCharacterUrl = 'https://swapi.dev/api/people';

export type sortType = 'release_date' | 'name' | 'gender' | 'height';

export type sortOrder = 'asc' | 'desc';

export const supportedFilter = new Set(['gender']);
