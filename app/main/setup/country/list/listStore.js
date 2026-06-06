import { create } from 'zustand';

export const useListStore = create(
  (set, get) => ({
    page: 1,
    search: '',
    sort: 'code',
    sortDir: 'asc',
    sx: 0,
    sy: 0,

    setPage: (page) => set({ page }),
    setSearch: (search) => set({ search }),
    setSort: (sort, sortDir) => set({ sort, sortDir }),
    setScroll: (sx, sy) => set({ sx, sy }),

    getPage: () => get().page,
    getSearch: () => get().search,
    getSort: () => get().sort,
    getSortDir: () => get().sortDir,
    getSx: () => get().sx,
    getSy: () => get().sy,
  })
);

export default useListStore;
