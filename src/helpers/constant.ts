import express from 'express';

export const swapiBaseMovieUrl = 'https://swapi.dev/api/films';

export function getTime(date: string) {
  return new Date(date).getTime();
}

export type sortType = 'release_date' | 'name' | 'gender' | 'height';

export type sortOrder = 'asc' | 'desc';

export function Sorter(item: Array<{ [key: string]: any }>, sort: sortType, order: sortOrder) {
  item.sort((a, b) => {
    if (sort === 'release_date') {
      return order === 'asc'
        ? getTime(a.release_date) - getTime(b.release_date)
        : getTime(b.release_date) - getTime(a.release_date);
    } else {
      return order === 'asc' ? a[sort] - b[sort] : b[sort] - a[sort];
    }
  });
}

export function composeResponse(message: string, data = {}, error_code?: number) {
  return {
    success: !error_code,
    message,
    data,
    error_code,
  };
}

export function errorHandler(
  res: express.Response,
  statusCode: number,
  errorCode: number,
  msg = 'Sorry an Error Occured',
) {
  return res.status(statusCode).json(composeResponse(msg, {}, errorCode));
}
