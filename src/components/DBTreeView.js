import React from 'react';
import { inject, observer } from 'mobx-react';

import TreeView from './TreeView';
import DownloadBtn from './DownloadBtn';

const DBTreeView = (props) => {
  const { treeStore } = props;
  return (
    <TreeView
      mutliselect
      tree={treeStore.db}
      title="DB tree view"
      buttons={[
        DownloadBtn
      ]}
    />
  );
};

export default inject('treeStore')(observer(DBTreeView));
