import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './App.css';
import RQACategoricalContext from './RQACategoricalContext.jsx';
import RQAContinuousContext from './RQAContinuousContext.jsx';
import AverageMutualInformationContext from './AverageMutualInformationContext.jsx';
import FalseNeighborsContext from './FalseNeighborsContext.jsx';

import React from 'react';
import LoadTimeSeries from './LoadTimeSeries.jsx';

import Container from 'react-bootstrap/Container';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {tsdata: [], tsdata2: [], delay: 1, dimension: 1};
        this.updateTSData = this.updateTSData.bind(this);
        this.updateTSData2 = this.updateTSData2.bind(this);
        this.updateDim = this.updateDim.bind(this);
        this.updateDelay = this.updateDelay.bind(this);
    }

    updateTSData(data) {
        this.setState({tsdata: data});
    }

    updateTSData2(data) {
        this.setState({tsdata2: data});
    }

    updateDelay(value) {
        this.setState({delay: value});
    }

    updateDim(value) {
        this.setState({dimension: value});
    }

    render() {
      return (
        <div className="App">
        <Container>
          <LoadTimeSeries tsdata={this.state.tsdata} tsdata2={this.state.tsdata2}
            updateTSData={this.updateTSData} updateTSData2={this.updateTSData2}
            delay={this.state.delay} dimension={this.state.dimension} />
          <Tabs>
            <TabList>
              <Tab>Categorical RQA</Tab>
              <Tab>Continuous RQA</Tab>
              <Tab>Average mutual information</Tab>
              <Tab>False neighbors</Tab>
            </TabList>

            <TabPanel>
              <RQACategoricalContext tsdata={this.state.tsdata} tsdata2={this.state.tsdata2} />
            </TabPanel>
            <TabPanel>
              <RQAContinuousContext tsdata={this.state.tsdata} tsdata2={this.state.tsdata2}
                updateDelay={this.updateDelay} updateDim={this.updateDim} delay={this.state.delay}
                dimension={this.state.dimension} />
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
