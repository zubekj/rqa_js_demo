import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './App.css';
import {RQACategoricalContext, RQAContinuousContext} from './RQAContext.jsx';


function App() {
  return (
    <div className="App">
      <Tabs>
        <TabList>
          <Tab>Categorical RQA</Tab>
          <Tab>Continuous RQA</Tab>
        </TabList>

        <TabPanel>
          <RQACategoricalContext />
        </TabPanel>
        <TabPanel>
          <RQAContinuousContext />
        </TabPanel>
      </Tabs>


    </div>
  );
}

export default App;
