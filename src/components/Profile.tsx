import classes from "./styles/profile.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "../store/hooks";
import { actions } from "../features/customer";

export const Profile = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(actions.getCustomerRequest());
  }, []);

  return (
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
          <p>{data.birthDate}</p>
          <h2>Interests</h2>
          <p>{data.interests?.join(", ")}</p>
        </div>
      </div>
    </div>
  );
};
