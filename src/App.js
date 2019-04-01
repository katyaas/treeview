import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DBTreeView from "./components/DBTreeView";
import CachedTreeView from "./components/CachedTreeView";
import TreeStore from './util/TreeStore';

class App extends Component {
  render() {
    return (
      <Provider treeStore={new TreeStore()}>
        <React.Fragment>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand>DB & Cached tree view</Navbar.Brand>
          </Navbar>
          <Container>
            <Row>
              <Col>
                <DBTreeView />
              </Col>
              <Col>
                <CachedTreeView/>
              </Col>
            </Row>
          </Container>
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
