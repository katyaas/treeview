import React from 'react';
import { inject, observer } from 'mobx-react';
import Button from 'react-bootstrap/Button'

const SaveBtn = (props) => {
  const { treeStore } = props;
  return (
    <Button
      onClick={treeStore.applyChanges}
      disabled={!treeStore.hasChanges()}
    >
      Apply changes
    </Button>
  );
};

export default inject('treeStore')(observer(SaveBtn));
