import { actions } from "../features/customer";
import { useDispatch } from "../store/hooks";
import { Formik, Field, Form } from "formik";

export const BasicForm = () => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        fullName: "",
        email: "",
        phone: "",
        cpf: "",
        birthDate: "",
        interests: ["CS:GO"],
      }}
      onSubmit={(values) => {
        dispatch(actions.setCustomerData(values));
      }}
    >
      <Form>
        <Field name="fullName" placeholder="Full Name" />
        <Field name="email" placeholder="Email" />
        <Field name="phone" placeholder="Phone" />
        <Field name="cpf" placeholder="CPF" />
        <Field name="birthDate" placeholder="Birthdate" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};
