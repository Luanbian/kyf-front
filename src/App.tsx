import { BasicForm } from "./components/BasicForm";
import { DiscordConnect } from "./components/DiscordConnect";
import { Points } from "./components/Points";
import { Profile } from "./components/Profile";
import { UploadDocument } from "./components/Upload";

function App() {
  return (
    <div>
      <BasicForm />
      <DiscordConnect />
      <Profile />
      <Points />
      <UploadDocument />
    </div>
  );
}

export default App;
