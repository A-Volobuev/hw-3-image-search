import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { MagnifyingGlass } from 'react-loader-spinner';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import {AppContainer, LoadMoreBtn} from './App.styled.jsx';
import Searchbar from './Searchbar/Searchbar';
import {ImageGallery} from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';


import pixabayAPI from './PixabayAPI/PixabayAPI';

export default class App extends Component {
  state={
    searchQuery: '',
    page: 1,
    per_page: 12,
    hits: [],
    totalHits: null,
    status: 'idle',
    error: null,
    isModalOpen: false,
    largeImage: null,
  }

  handlFormSubmit = searchQuery => {
		console.log(searchQuery);
		//! Добавляем значение в наш стейт
		this.setState({searchQuery: searchQuery, isToastShow: false});
	};

  componentDidUpdate(_, prevState) {
    const {searchQuery, page, per_page} = this.state;
    const prevName = prevState.searchQuery;
    const prevPage = prevState.page;

    if(prevName !== searchQuery || prevPage !== page){
      this.setState({status: "pending"});
      // console.log(prevName);
      // console.log(searchQuery);
      pixabayAPI
      .fetchImage(searchQuery, page, per_page)
      .then(res => {
        const { hits, totalHits } = res;
        this.setState(prevState => ({
          //! Проверяем, если ввели новый запрос - заменяем и распыляем, если нет, тогда добавляем
          hits: prevName !== searchQuery
            ? [...hits]
            : [...prevState.hits, ...hits],
          totalHits,
          status: 'resolved',
        }));
      })
      .catch( error => this.setState({error: error, status: "rejected"}))
    }
  };

  onLoadMore = (e) => {
    this.setState(prevState => ({page: prevState.page +1}));
  };

  toggleModal = () => {
    this.setState( ({ isModalOpen }) => ({
      isModalOpen: !isModalOpen,
      imageIndex: null,
    }));
  };

  setLargeImage = ({largeImageURL, tags}) => {
    this.setState({
      largeImage: {largeImageURL, tags},
    });
  };

  render() {
    const {hits, status, totalHits, page, per_page, isModalOpen, largeImage} = this.state;
    return (
      <AppContainer>
        <Searchbar  onSubmit={this.handlFormSubmit}/>

        {/* Рендерим только если нашли */}
        {/* {status==="resolved" && (<ImageGallery 
        hits={hits}
        onClick={this.toggleModal}
        setLargeImage={this.setLargeImage}/>)} */}

        <ImageGallery 
        hits={hits}
        onClick={this.toggleModal}
        setLargeImage={this.setLargeImage}/>

        {status==="pending" && (
          <MagnifyingGlass
          visible={true}
          height="80"
          width="80"
          ariaLabel="magnifying-glass-loading"
          wrapperStyle={{}}
          wrapperClass="magnifying-glass-wrapper"
          glassColor="#c0efff"
          color="#303f9f"/>
        )}

{/* Если здесь добавляю  toast.info('По вашему запросу ничего не найдено'), то оно вызывается оч много раз, по этому оставлю просто надпись  И цифры судя по всему были именно от уведомления*/}
        {totalHits === 0 && (
          <div>По вашему запросу ничего не найдено</div>
        )}

        {totalHits - page * per_page > per_page && (
          <LoadMoreBtn type='button' onClick={this.onLoadMore}>Load More</LoadMoreBtn>)}

        {isModalOpen && <Modal onClose={this.toggleModal} 
        hits={largeImage}/>}

        <ToastContainer autoClose={3000} />
      </AppContainer>
    )
  }
}
