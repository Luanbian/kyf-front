import { useEffect } from "react";
import { useDispatch, useSelector } from "../store/hooks";
import { actions } from "../features/customer";

export const Profile = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.customer);

  useEffect(() => {
    const fetchCustomerData = async () => {
      dispatch(actions.getCustomerRequest());
    };
    fetchCustomerData();
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      <p>This is the profile page.</p>
      <h2>Customer Data</h2>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
};
