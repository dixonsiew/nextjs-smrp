import { create } from 'zustand';

/* export const useListStore = create(
  persist(
    (set, get) => ({
      page: 1,
      sx: 0,
      sy: 0,

      setPage: (page) => set({ page }),
      setScroll: (sx, sy) => set({ sx, sy }),

      getPage: () => get().page,
      getSx: () => get().sx,
      getSy: () => get().sy,

      clear: () => localStorage.removeItem('report.master-pd102.master-pd102-listing'),
    }),
    {
      name: 'report.master-pd102.master-pd102-listing',
      getStorage: () => localStorage,
    }
  )
); */

export const useListStore = create(
  (set, get) => ({
    page: 1,
    sx: 0,
    sy: 0,

    setPage: (page) => set({ page }),
    setScroll: (sx, sy) => set({ sx, sy }),

    getPage: () => get().page,
    getSx: () => get().sx,
    getSy: () => get().sy,
  })
);

export default useListStore;
