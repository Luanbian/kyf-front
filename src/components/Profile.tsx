import bg from "../assets/bg_profile.jpeg";
import classes from "./styles/profile.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "../store/hooks";
import { actions } from "../features/customer";
import { Points } from "./Points";
import { UploadDocument } from "./Upload";
import { formatDate } from "../utils/formatDate";
import { DISCORD_CDN } from "../constants/discord";

export const Profile = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(actions.getCustomerRequest());
  }, []);

  return (
    <div>
      <img src={bg} alt="background" className={classes.bg} />
      <div className={classes.container}>
        <div className={classes.group}>
          <h1>Profile</h1>
          <div>
            <h2>Full Name</h2>
            <p>{data.fullName}</p>

            <h2>Email</h2>
            <p>{data.email}</p>

            <h2>Phone</h2>
            <p>{data.phone}</p>

            <h2>CPF</h2>
            <p>{data.cpf}</p>

            <h2>Birthdate</h2>
            <p>{formatDate(data.birthDate)}</p>
            <h2>Interests</h2>
            <p>{data.interests?.join(", ")}</p>

            <h2>Discord</h2>
            <p>{data.isFuriaGuild?.toString()}</p>
            <h2>Avatar</h2>
            <img
              src={`${DISCORD_CDN}/avatars/${data.discordId}/${data.avatar}.png`}
            />
            <Points />
            <UploadDocument />
          </div>
        </div>
      </div>
    </div>
  );
};
