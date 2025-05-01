import { BasicForm } from "./components/BasicForm";
import { DiscordConnect } from "./components/DiscordConnect";
import { Points } from "./components/Points";
import { Profile } from "./components/Profile";

function App() {
  return (
    <div>
      <BasicForm />
      <DiscordConnect />
      <Profile />
      <Points />
    </div>
  );
}

export default App;
