import { useEffect } from "react";
import { API_BASE_URL } from "../constants/api";
import { useDispatch } from "../store/hooks";
import { actions } from "../features/customer";
import { useAuthToken } from "../hooks/useAuthToken";

export const DiscordConnect = () => {
  const dispatch = useDispatch();
  const connected = useAuthToken();

  const connectDiscord = async () => {
    window.location.href = `${API_BASE_URL}/discord/auth`;
  };

  useEffect(() => {
    if (connected) {
      dispatch(actions.saveDiscordRequest());
    }
  }, [connected]);

  return (
    <div>
      <h1>Connect to Discord</h1>
      <button onClick={connectDiscord}>
        {connected ? "Conectado!" : "Conectar"}
      </button>
    </div>
  );
};
