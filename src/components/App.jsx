import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { ToastContainer } from 'react-toastify';
import * as ImageService from 'service/image-service';
import css from './App.module.css';
import { useState, useEffect } from 'react';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [perPage, setPerPage] = useState(12);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null);
  const [showGallery, setShowGallery] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [prevQuery, setPrevQuery] = useState('');
  const [prevPage, setPrevPage] = useState(1);

  useEffect(() => {
    if (prevQuery !== query || prevPage !== page) {
      getPhotos(query, page);
    }
  }, [query, page, prevPage, prevQuery]);

  const handleSubmit = data => {
    setQuery(data);
    setPage(1);
    setImages([]);
    setPerPage(12);
    setTotalResults(0);
    setError(null);
    setShowGallery(false);
    setIsLoading(false);
  };

  const getPhotos = async (query, page) => {
    setIsLoading(true);
    try {
      const { hits, totalHits } = await ImageService.getImages(query, page);

      setImages(prevImages => [...prevImages, ...hits]);
      setTotalResults(totalHits);

      if (hits.length === 0) {
        setShowGallery(true);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleSubmit} />
      {showGallery && (
        <p className={css.Text}>Sorry, there is no images for your query</p>
      )}
      {error && (
        <p className={css.Text}>
          Whoops, something went wrong: {error.message}
        </p>
      )}
      {isLoading && <Loader />}
      {images.length > 0 && <ImageGallery images={images} />}
      {images.length > 0 && images.length < totalResults && (
        <Button onClick={handleLoadMore} textChange={isLoading}></Button>
      )}
      <ToastContainer autoClose={2000} />
    </div>
  );
};
