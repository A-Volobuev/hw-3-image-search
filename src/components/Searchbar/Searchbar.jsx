import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CiSearch } from "react-icons/ci";

import {SearchbarContainer, SearchForm, SearchFormBtn, SearchFormBtnLabel, SearchFormInput} from './Searchbar.styled';

export default class Searchbar extends Component {
	state={
		searchQuery: '',
	}

	handleSearchQueryChange = e => {
		this.setState({searchQuery: e.currentTarget.value.toLowerCase()})
	}

	handleSubmitForm = e => {
		e.preventDefault();

		//!Проверка на пустое поле
		if(this.state.searchQuery.trim() === '') {
			console.log('object')
			toast.error('Введите поисковой запрос');
			return
		}
		//! Здесь мы вызываем пропс и передаем данные запроса в Апп 
		this.props.onSubmit(this.state.searchQuery);

		this.setState({ searchQuery: ''});
	}

	render() {
		return (
			<div>
				<SearchbarContainer>
  				<SearchForm onSubmit={this.handleSubmitForm}>
  				  <SearchFormBtn type="submit" >
						<CiSearch value={{ style: { size: '2em' } }}/>
  				    {/* <SearchFormBtnLabel>Search</SearchFormBtnLabel> */}
  				  </SearchFormBtn>

  				  <SearchFormInput
  				    type="text"
  				    autoComplete="off"
  				    autoFocus
  				    placeholder="Search images and photos"
							value={this.state.searchQuery}
							onChange={this.handleSearchQueryChange}
  				  />
  				</SearchForm>
				</SearchbarContainer>
			</div>
		)
	}
}
