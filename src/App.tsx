import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "./constants/api";

function App() {
  const [data, setData] = useState(null);

  const connectDiscord = async () => {
    window.location.href = `${API_BASE_URL}/discord/auth`;
  };

  const fetchData = async () => {
    const cookies = document.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken="));
    const token = cookies ? cookies.split("=")[1] : null;

    console.info("Token: ", token);
    if (token) {
      try {
        const response = await axios.get(`${API_BASE_URL}/customer`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      console.error("Token not found in cookies");
    }
  };

  return (
    <div>
      <h1>Hello world</h1>
      <button onClick={connectDiscord}> Connect discord </button>
      <button onClick={fetchData}> Connected </button>
      <div>
        <h2>Data:</h2>
        <p>{JSON.stringify(data, null, 2)}</p>
      </div>
    </div>
  );
}

export default App;
