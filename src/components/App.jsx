import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { ToastContainer } from 'react-toastify';
import * as ImageService from 'service/image-service';
import css from './App.module.css';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    perPage: 12,
    totalResults: 0,
    error: null,
    showGallery: false,
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.getPhotos(query, page);
    }
  }

  handleSubmit = data => {
    this.setState({
      query: data,
      page: 1,
      images: [],
      perPage: 12,
      totalResults: 0,
      error: null,
      showGallery: false,
      isLoading: false,
    });
  };

  getPhotos = async (query, page) => {
    this.setState({ isLoading: true });
    try {
      const { hits, totalHits } = await ImageService.getImages(query, page);
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        totalResults: totalHits,
      }));
      if (hits.length === 0) {
        this.setState({
          showGallery: true,
        });
      }
    } catch (error) {
      this.setState({
        error: error.message,
      });
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { error, isLoading, images, totalResults, showGallery } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSubmit} />
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
          <Button onClick={this.handleLoadMore} textChange={isLoading}></Button>
        )}
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}
