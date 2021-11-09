import express from 'express';
import { sortOrder, sortType } from './constant';

export function getTime(date: string) {
  return new Date(date).getTime();
}
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

export function filterByObject(
  filterObj: { [key: string]: string },
  dataSet: { [key: string]: any }[],
) {
  const keys = Object.keys(filterObj);
  return dataSet.filter((item) => {
    return keys.every((key) => filterObj[key] === item[key]);
  });
}

export function cmToFeet(n: number) {
  var realFeet = (n * 0.3937) / 12;
  var feet = Math.floor(realFeet);
  var inches = Math.round((realFeet - feet) * 12);
  return feet + 'feet ' + inches + 'inches;';
}

export function composeResponse(message: string, data = {}, error_code?: number) {
  return {
    success: !error_code,
    message,
    data,
    error_code,
  };
}
export function successHandler(
  res: express.Response,
  statusCode: number,
  data: any,
  message = 'Request Successful',
) {
  res.status(statusCode).json(composeResponse(message, data));
}
export function errorHandler(
  res: express.Response,
  statusCode: number,
  errorCode: number,
  msg = 'Sorry an Error Occured',
) {
  return res.status(statusCode).json(composeResponse(msg, {}, errorCode));
}