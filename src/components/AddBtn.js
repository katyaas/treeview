import React from 'react';
import { inject, observer } from 'mobx-react';
import ButtonWithModal from './ButtonWithModal'

const AddBtn = (props) => {
  const { treeStore } = props;
  const onSave = (value) => {
    const selected = props.getSelected();
    treeStore.addToCache(value, selected.length && selected[0]);
  };
  const selected = props.getSelected();
  const parent = selected.length && treeStore.cache.find(item => item.id === selected[0]).value;

  return (
    <ButtonWithModal
      btnName="Add"
      title={`Add new value${parent ? ` to ${parent}` : ''}`}
      onSave={onSave}
    />
  );
};

export default inject('treeStore')(observer(AddBtn));
