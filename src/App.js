import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './App.css';
import {RQACategoricalContext, RQAContinuousContext} from './RQAContext.jsx';
import AverageMutualInformationContext from './AverageMutualInformationContext.jsx';
import FalseNeighborsContext from './FalseNeighborsContext.jsx';

import React from 'react';
import LoadTimeSeries from './LoadTimeSeries.jsx';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {tsdata: [0, 1, 0, 1]};
        this.updateTSData = this.updateTSData.bind(this);
    }

    updateTSData(data) {
        this.setState({tsdata: data});
    }

    render() {
      return (
        <div className="App">
        <Container>
          <LoadTimeSeries tsdata={this.state.tsdata} updateTSData={this.updateTSData} />
          <Tabs>
            <TabList>
              <Tab>Categorical RQA</Tab>
              <Tab>Continuous RQA</Tab>
              <Tab>Average mutual information</Tab>
              <Tab>False neighbors</Tab>
            </TabList>

            <TabPanel>
              <RQACategoricalContext tsdata={this.state.tsdata} />
            </TabPanel>
            <TabPanel>
              <RQAContinuousContext tsdata={this.state.tsdata} />
            </TabPanel>
            <TabPanel>
              <AverageMutualInformationContext tsdata={this.state.tsdata} />
            </TabPanel>
            <TabPanel>
              <FalseNeighborsContext tsdata={this.state.tsdata} />
            </TabPanel>
          </Tabs>
        </Container>
        </div>
      );

    }
}

export default App;
