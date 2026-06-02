import './SortColumn.css';

export const SortColumn = ({ name, sort, dir, current, onSortBy }) => {
  const getIconClass = () => {
    if (isSortBy('asc')) return 'fa-sort-up';
    if (isSortBy('desc')) return 'fa-sort-down';
    if (!isCurrentSort) return 'sort-inactive fa-sort';
    return '';
  }

  const onSort = () => {
    if (current !== sort) {
      dir = 'asc';
      current = sort;
    } else {
      dir = dir === 'asc' ? 'desc' : 'asc';
      if (dir === 'asc') {
        current = sort;
      }
    }
    
    onSortBy({ sort: current, dir });
  }

  const isSortBy = (dirx) => sort === current && dir === dirx;

  const isCurrentSort = sort === current;

  return (
    <div className='cursor-pointer' onClick={onSort}>
      { name }
      <i className={`fas pl-2 ${getIconClass()}`}></i>
    </div>
  )
}

export default SortColumn;
