import React from 'react';
import { inject, observer } from 'mobx-react';
import AddBtn from './AddBtn';
import EditBtn from './EditBtn';
import SaveBtn from './SaveBtn';

import TreeView from './TreeView';

const CachedTreeView = (props) => {
  const { treeStore } = props;
  return (
    <TreeView
      tree={treeStore.cache}
      title="Cached tree view"
      buttons={[
        AddBtn,
        EditBtn,
        SaveBtn,
      ]}
    />
  );
};

export default inject('treeStore')(observer(CachedTreeView));
