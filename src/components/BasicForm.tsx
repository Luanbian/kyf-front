import bg from "../assets/bg.webp";
import * as Yup from "yup";
import classes from "./styles/basicForm.module.css";
import { actions } from "../features/customer";
import { useDispatch, useSelector } from "../store/hooks";
import { Formik, Field, Form, FieldInputProps, ErrorMessage } from "formik";
import { MultiSelect } from "./select/MultiSelect";

export const BasicForm = () => {
  const dispatch = useDispatch();
  const { data, error, loading } = useSelector((state) => state.customer);

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .required("Phone is required")
      .length(11, "Telefone deve estar completo"),
    cpf: Yup.string()
      .required("CPF is required")
      .length(11, "CPF deve estar completo"),
    birthDate: Yup.date().required("Birthdate is required"),
    interests: Yup.array().min(1, "At least one interest is required"),
    address: Yup.object({
      street: Yup.string(),
      number: Yup.string(),
      complement: Yup.string(),
      city: Yup.string(),
      state: Yup.string(),
      zipCode: Yup.string(),
    }),
  });

  return (
    <div>
      <img src={bg} alt="background" className={classes.bg} />
      <Formik
        initialValues={{
          fullName: data.fullName || "",
          email: data.email || "",
          phone: data.phone || "",
          cpf: data.cpf || "",
          birthDate: data.birthDate || "",
          interests: data.interests || [],
          address: {
            street: data.address?.street || "",
            number: data.address?.number || "",
            complement: data.address?.complement || "",
            city: data.address?.city || "",
            state: data.address?.state || "",
            zipCode: data.address?.zipCode || "",
          },
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatch(actions.setCustomerData(values));
          dispatch(actions.saveCustomerRequest());
        }}
      >
        <Form className={classes.form}>
          <div className={classes.container}>
            <h1>Bem vindo</h1>

            <h3>Campos obrigatórios</h3>
            <div className={classes.formGroupRequired}>
              <div>
                <Field name="fullName" placeholder="Full Name" />
                <ErrorMessage name="fullName" component="div" />
              </div>

              <div>
                <Field name="email" placeholder="Email" />
                <ErrorMessage name="email" component="div" />
              </div>

              <div>
                <Field name="phone" placeholder="Phone" />
                <ErrorMessage name="phone" component="div" />
              </div>

              <div>
                <Field name="cpf" placeholder="CPF" />
                <ErrorMessage name="cpf" component="div" />
              </div>

              <div>
                <Field name="birthDate">
                  {({ field }: { field: FieldInputProps<string> }) => (
                    <input {...field} type="date" placeholder="Birthdate" />
                  )}
                </Field>

                <ErrorMessage name="birthDate" component="div" />
              </div>

              <div>
                <Field name="interests">
                  {({ field }: { field: FieldInputProps<string> }) => (
                    <MultiSelect {...field} />
                  )}
                </Field>
                <ErrorMessage name="interests" component="div" />
              </div>
            </div>

            <h3>Campos opcionais</h3>
            <div className={classes.formGroupOptional}>
              <Field name="address.street" placeholder="Street" />
              <Field name="address.number" placeholder="Number" />
              <Field name="address.complement" placeholder="Complement" />
              <Field name="address.city" placeholder="City" />
              <Field name="address.state" placeholder="State" />
              <Field name="address.zipCode" placeholder="Zip Code" />
            </div>

            <div className={classes.formGroupButton}>
              <button type="submit" disabled={loading}>
                {!loading ? "Confirmar" : "Carregando.."}
              </button>
              {error && <div>{error}</div>}
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
