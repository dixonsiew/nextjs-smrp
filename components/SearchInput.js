import React, { useState } from 'react';

export const SearchInput = ({ msearch, onSearch }) => {
  const [search, setSearch] = useState(msearch);

  const onHandleSearch = () => {
    onSearch(search);
  }

  const onSearchKeypress = (e) => {
    if (e.key === 'Enter') {
      onHandleSearch();
    }
  }

  const onSearchDbKeyUp = (e) => {
    //onSearchKeyUp(search)
  }

  const onSearchChg = (e) => {
    const s = e.target.value;
    setSearch(s);
    //onSearchChange(search)
  }

  return (
    <div className='input-group'>
      <input type="search" name="q" className="form-control" placeholder="Search..."
        value={search}
        onKeyUp={onSearchDbKeyUp}
        onKeyDown={onSearchKeypress}
        onChange={onSearchChg}
      />
      <button type="button" className="btn btn-default" onClick={onHandleSearch}>
        <i className="fas fa-search"></i>
      </button>
    </div>
  )
}

export default SearchInput;
