import React from 'react';
import { inject, observer } from 'mobx-react';
import ButtonWithModal from './ButtonWithModal'

const EditBtn = (props) => {
  const { treeStore } = props;
  const selected = props.getSelected();
  const onSave = (value) => {
    treeStore.saveCacheValue(value, selected[0]);
  };
  const value = selected.length && treeStore.cache.find(item => item.id === selected[0]).value;

  return (
    <ButtonWithModal
      btnName="Edit"
      title="Edit"
      onSave={onSave}
      disabled={!selected.length}
      value={value}
    />
  );
};

export default inject('treeStore')(observer(EditBtn));
