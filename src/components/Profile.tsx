import bg from "../assets/bg_profile.jpeg";
import defaultAvatar from "../assets/default_avatar.png";
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
    dispatch(actions.getCustomerRequest());
  };

  return (
    <div>
      <img src={bg} alt="background" className={classes.bg} />
      <div className={classes.container}>
        <div className={classes.group}>
          {data.discordId && data.avatar ? (
            <div className={classes.avatarContainer}>
              <img
                src={`${DISCORD_CDN}/avatars/${data.discordId}/${data.avatar}.png`}
                className={classes.avatar}
              />
            </div>
          ) : (
            <div className={classes.avatarContainer}>
              <img src={defaultAvatar} className={classes.avatar} />
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

          <hr className="cs-hr" />

          <div>
            <h2 style={{ textAlign: "center" }}>Discord</h2>

            <div className={classes.info}>
              <div className={classes.infoItem}>
                <h2>Usuario</h2>
                <p>{data.username || "####"}</p>
              </div>

              <div className={classes.infoItem}>
                <h2>Email</h2>
                <p>{data.discordEmail || "####"}</p>
              </div>

              <div className={classes.infoItem}>
                <h2>Faz parte do discord da furia?</h2>
                <p>
                  {data.isFuriaGuild
                    ? "Sim!, é um furioso da matilha"
                    : "Ainda não, mas isso pode ser mudado"}
                </p>
                {!data.isFuriaGuild && (
                  <button className="cs-btn" onClick={handleRedirectServer}>
                    Fazer parte da furia
                  </button>
                )}
              </div>
            </div>
          </div>

          <hr className="cs-hr" />

          <Points />

          <hr className="cs-hr" />

          <UploadDocument />
        </div>
      </div>
    </div>
  );
};
