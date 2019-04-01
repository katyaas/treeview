import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { List } from 'immutable';
import { PropTypes as MobxPropTypes, observer } from 'mobx-react'

class TreeView extends React.Component {
  static propTypes = {
    tree: MobxPropTypes.observableArray,
    mutliselect: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      selected: List(),
    };
  }

  getSelected = () => {
    return this.state.selected;
  };

  selectItem = (itemId) => () => {
    const { selected } = this.state;
    const { mutliselect } = this.props;
    let newSelected;
    const index = selected.indexOf(itemId);
    if (mutliselect) {
      newSelected = index >= 0 ? selected.splice(index, 1) : selected.push(itemId);
    } else {
      newSelected = index >= 0 ? [] : [itemId];
    }
    this.setState({
      selected: newSelected,
    })
  };

  getChilds(parent){
    const { tree } = this.props;
    if (!parent) {
      return tree.filter(item => !item.parent);
    }
    return tree.filter(item => item.parent === parent);
  }

  renderChilds(parent, level = 0) {
    return (
      this.getChilds(parent).map(item => (
        <React.Fragment key={item.id}>
          {this.renderValue(item, level)}
          {this.renderChilds(item.id, level + 1)}
        </React.Fragment>
      ))
    )
  }

  renderValue = (item, level) => {
    const { selected } = this.state;
    const itemSelected = selected.includes(item.id);
    return (
      <div
        role="button"
        className={`tree-item ${itemSelected ? ' selected' : ''}`}
        style={{
          marginLeft: `${level * 10}px`
        }}
        onClick={this.selectItem(item.id)}>
        {item.value}
      </div>
    );
  };

  render() {
    const { title, buttons = [] } = this.props;
    return (
      <Card>
        <Card.Header>{title}</Card.Header>
        <Card.Body>
          {this.renderChilds()}
        </Card.Body>
        <Card.Footer>
          {buttons.map(Button => <Button getSelected={this.getSelected} />)}
        </Card.Footer>
      </Card>
    );
  }
}

export default observer(TreeView);
