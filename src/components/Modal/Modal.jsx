import React, { Component } from 'react';
import { createPortal } from 'react-dom';

import {Overlay, ModalImg} from './Modal.styled';

const modalRoot = document.getElementById('modal-root');

class Modal extends Component {
	componentDidMount() {
		// Делаем закрытие модалки через esc
		window.addEventListener('keydown', this.handleKeyDown);
  };

	componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKeyDown)
  };

	handleKeyDown = e => {
		if (e.code === "Escape") {
			this.props.onClose();
		}
	};

	handleBackdropClick = e => {
		if(e.currentTarget === e.target) {
			this.props.onClose();
		}
	};


	render() {
		const {largeImageURL, tags} = this.props.hits
		return createPortal(
			<Overlay onClick={this.handleBackdropClick}>
  			<ModalImg>
  			  <img src={largeImageURL} alt={tags} />
  			</ModalImg>
			</Overlay>,
			modalRoot
		)
	}
}

export default Modal