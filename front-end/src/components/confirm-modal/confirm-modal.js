import React from 'react';
import PropTypes from 'prop-types';

import autoBind from '../../utils/autobind';

import './confirm-modal.scss';

class ConfirmModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    autoBind.call(this, ConfirmModal);
  }

  render() {
    const { onBack, onConfirm, message } = this.props;

    return (
      <div id="modal">
        <div id="confirm-modal">
          <h4>{ message.h }</h4>
          <p>{ message.p }</p>
          <button onClick={ onConfirm }>Remove</button>
          <button onClick={ onBack }>Back</button>
        </div>
      </div>
    );
  }
}

ConfirmModal.propTypes = {
  message: PropTypes.object, 
  onConfirm: PropTypes.func,
  onBack: PropTypes.func, 
};

export default ConfirmModal;
