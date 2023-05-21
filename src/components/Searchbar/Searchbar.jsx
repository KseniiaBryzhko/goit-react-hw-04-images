import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { useState } from 'react';

export const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = event => {
    setSearchQuery(event.currentTarget.value.toLowerCase());
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    if (searchQuery.trim() === '') {
      return toast.warn('Please enter search query');
    }

    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleFormSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <ImSearch />
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
