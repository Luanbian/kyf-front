import bg from "../assets/bg_ds.png";
import classes from "./styles/discordConnect.module.css";
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
    dispatch(actions.saveDiscordRequest());
  }, []);

  return (
    <div>
      <img src={bg} alt="background" className={classes.bg} />
      <div className={classes.container}>
        <div className={classes.group}>
          <h1>Conectar com o Discord</h1>
          <button onClick={connectDiscord} className={"cs-btn"}>
            {connected ? "Conectado!" : "Conectar"}
          </button>
        </div>
      </div>
    </div>
  );
};
