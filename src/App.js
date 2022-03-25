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

        this.state = {tsdata: [0, 1, 0, 1], tsdata2: []};
        this.updateTSData = this.updateTSData.bind(this);
        this.updateTSData2 = this.updateTSData2.bind(this);
    }

    updateTSData(data) {
        this.setState({tsdata: data});
    }

    updateTSData2(data) {
        this.setState({tsdata2: data});
    }


    render() {
      return (
        <div className="App">
        <Container>
          <LoadTimeSeries tsdata={this.state.tsdata} tsdata2={this.state.tsdata2}
            updateTSData={this.updateTSData} updateTSData2={this.updateTSData2} />
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
