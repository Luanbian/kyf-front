import { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import { BasicForm } from "./components/BasicForm";
import { DiscordConnect } from "./components/DiscordConnect";
import { Profile } from "./components/Profile";
import { useSelector } from "./store/hooks";
import { useAuthToken } from "./hooks/useAuthToken";

function App() {
  const { customerId } = useSelector((state) => state.customer);
  const [activeTab, setActiveTab] = useState(0);
  const connected = useAuthToken();

  useEffect(() => {
    if (customerId) {
      setActiveTab(1);
    }
    if (connected) {
      setActiveTab(2);
    }
  }, [customerId, connected]);

  return (
    <Tabs selectedIndex={activeTab} onSelect={(index) => setActiveTab(index)}>
      <TabList
        style={{
          position: "fixed",
          zIndex: 1,
          marginInline: "2vw",
          marginBlock: "2vh",
        }}
        className="cs-tabs"
      >
        <Tab style={{ color: "#C4B550", backgroundColor: "#3E4637" }}>
          Basic Form
        </Tab>
        <Tab
          style={{ color: "#C4B550", backgroundColor: "#3E4637" }}
          disabled={!customerId}
        >
          Discord Connect
        </Tab>
        <Tab
          style={{ color: "#C4B550", backgroundColor: "#3E4637" }}
          disabled={!customerId}
        >
          Profile
        </Tab>
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
