import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import { BasicForm } from "./components/BasicForm";
import { DiscordConnect } from "./components/DiscordConnect";
import { Profile } from "./components/Profile";
import { useSelector } from "./store/hooks";

function App() {
  const { customerId } = useSelector((state) => state.customer);

  return (
    <Tabs>
      <TabList>
        <Tab>Basic Form</Tab>
        <Tab disabled={!customerId}>Discord Connect</Tab>
        <Tab disabled={!customerId}>Profile</Tab>
      </TabList>

      <TabPanel>
        <BasicForm />
      </TabPanel>
      <TabPanel>
        <DiscordConnect />
      </TabPanel>
      <TabPanel>
        <Profile />
      </TabPanel>
    </Tabs>
  );
}

export default App;
