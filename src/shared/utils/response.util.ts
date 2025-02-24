import { Pagination } from '../types/response.type';

export function responseSuccess<T>(data: T) {
  return {
    success: true,
    data,
  };
}

export function responseError(message: string) {
  return {
    success: false,
    message,
  };
}

export function pagination(pagination: Pagination) {
  return pagination;
}
