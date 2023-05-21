import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({ onClick, textChange }) => {
  return (
    <button className={css.Button} type="button" onClick={onClick}>
      {textChange ? 'Loading...' : 'Load more'}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  textChange: PropTypes.bool.isRequired,
};
