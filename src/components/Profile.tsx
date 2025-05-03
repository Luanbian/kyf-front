import bg from "../assets/bg_profile.jpeg";
import classes from "./styles/profile.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "../store/hooks";
import { actions } from "../features/customer";
import { Points } from "./Points";
import { UploadDocument } from "./Upload";
import { formatDate } from "../utils/formatDate";
import { DISCORD_CDN, DISCORD_INVITE } from "../constants/discord";
import { options } from "./select/MultiSelect";

export const Profile = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(actions.getCustomerRequest());
  }, []);

  const handleRedirectServer = () => {
    window.open(DISCORD_INVITE, "_blank", "noopener,noreferrer");
  };

  return (
    <div>
      <img src={bg} alt="background" className={classes.bg} />
      <div className={classes.container}>
        <div className={classes.group}>
          {data.discordId && data.avatar && (
            <div className={classes.avatarContainer}>
              <img
                src={`${DISCORD_CDN}/avatars/${data.discordId}/${data.avatar}.png`}
                className={classes.avatar}
              />
            </div>
          )}
          <div className={classes.infoContainer}>
            <div className={classes.info}>
              <div className={classes.infoItem}>
                <h2>Nome Completo</h2>
                <p>{data.fullName}</p>
              </div>

              <div className={classes.infoItem}>
                <h2>Email</h2>
                <p>{data.email}</p>
              </div>
              <div className={classes.infoItem}>
                <h2>Telefone</h2>
                <p>{data.phone}</p>
              </div>
            </div>

            <div className={classes.info}>
              <div className={classes.infoItem}>
                <h2>CPF</h2>
                <p>{data.cpf}</p>
              </div>

              <div className={classes.infoItem}>
                <h2>Data de nascimento</h2>
                <p>{formatDate(data.birthDate)}</p>
              </div>

              <div className={classes.infoItem}>
                <h2>Interesses</h2>
                <p>
                  {data.interests
                    .map((interest) => {
                      const interestObj = options.find(
                        (option) => option.value === interest,
                      );
                      return interestObj?.label;
                    })
                    .join(", ")}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2>Discord</h2>
            <div>
              <h2>Nome de usuario</h2>
              <p>{data.username}</p>
            </div>
            <div>
              <h2>Faz parte do discord da furia</h2>
              <p>{data.isFuriaGuild ? "Sim" : "Nao"}</p>
              {!data.isFuriaGuild && (
                <button className="cs-btn" onClick={handleRedirectServer}>
                  Fazer parte da furia
                </button>
              )}
            </div>
          </div>

          <Points />
          <UploadDocument />
        </div>
      </div>
    </div>
  );
};
