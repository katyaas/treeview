import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DEFAULT_STATE = {
  show: false, value: ''
};

class ButtonWithModal extends React.Component {
  static propTypes = {
    btnName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    value: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = { ...DEFAULT_STATE };
  }

  handleSave = () => {
    this.props.onSave(this.state.value);
    this.handleClose();
  };

  handleClose = () => {
    this.setState({ ...DEFAULT_STATE });
  };

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  onClick = () => {
    this.setState({
      show: true,
      value: this.props.value,
    });
  };

  render() {
    const { btnName, title, disabled } = this.props;
    const { show, value } = this.state;
    return (
      <>
        <Button onClick={this.onClick} disabled={disabled}>{btnName}</Button>
        <Modal
          show={show}
          onHide={this.handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control placeholder="Value" value={value} onChange={this.handleChange}/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleSave}>Save</Button>
            <Button variant="primary" onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default ButtonWithModal;
