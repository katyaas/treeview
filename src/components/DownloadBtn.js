import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import Button from 'react-bootstrap/Button';

const DownloadBtn = (props) => {
  const onClick = () => {
    const { treeStore } = props;
    const selected = props.getSelected();
    treeStore.loadToCache(selected);
  };

  return <Button onClick={onClick}>Load to cache</Button>;
};

DownloadBtn.propTypes = {
  getSelected: PropTypes.func.isRequired,
};

export default inject('treeStore')(observer(DownloadBtn));
