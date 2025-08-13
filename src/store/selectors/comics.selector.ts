import { comicsApi } from '../api/comics.api';

export const selectComicsByPage = (query: string, pageNumber: number) => {
  return comicsApi.endpoints.getCardsByQueryAndPage.select({
    query,
    pageNumber,
  });
};

export const selectComicByUid = (uid: string) => {
  return comicsApi.endpoints.fetchDataByUid.select(uid);
};
