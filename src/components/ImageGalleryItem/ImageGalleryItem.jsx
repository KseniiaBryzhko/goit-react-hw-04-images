import { Modal } from '../Modal/Modal';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const ImageGalleryItem = ({ src, largeImageURL, alt }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <li className={css.ImageGalleryItem}>
        <img
          className={css.ImageGalleryItemImage}
          src={src}
          alt={alt}
          onClick={toggleModal}
        />
      </li>
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt={alt} />
        </Modal>
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
