// src/Components/SearchBar/SearchBar.jsx
import React, { useState } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import './_searchBar.scss';

const SearchBar = ({ onSearch, placeholder = 'Rechercher...', className, ...props }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(searchValue);
    }
  };

  return (
    <div className={`search-bar-container ${className || ''}`} {...props}>
      <Input
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        className="search-input"
      />
      <Button
        label="Rechercher"
        onClick={handleSearchClick}
        variant="primary"
        className="search-button"
      />
    </div>
  );
};

export default SearchBar;