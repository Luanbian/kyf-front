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
    fullName: Yup.string().required("Nome requerido"),
    email: Yup.string()
      .email("Email mal formatado")
      .required("Email requerido"),
    phone: Yup.string()
      .required("Telefone requerido")
      .length(11, "Telefone deve estar completo"),
    cpf: Yup.string()
      .required("CPF requerido")
      .length(11, "CPF deve estar completo"),
    birthDate: Yup.date().required("Campo requerido"),
    interests: Yup.array().min(1, "Selecione pelo menos um interesse"),
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
            <div className={classes.formGroupRequired}>
              <div className={classes.nameAndEmail}>
                <div>
                  <Field
                    name="fullName"
                    placeholder="Nome completo"
                    className={`cs-input ${classes.field}`}
                  />
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className={classes.errorMessage}
                  />
                </div>

                <div>
                  <Field
                    name="email"
                    placeholder="Email"
                    className={`cs-input ${classes.field}`}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={classes.errorMessage}
                  />
                </div>
              </div>

              <div className={classes.phoneAndCpfAndBirth}>
                <div>
                  <Field
                    name="phone"
                    placeholder="Telefone"
                    className={`cs-input ${classes.field}`}
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className={classes.errorMessage}
                  />
                </div>

                <div>
                  <Field
                    name="cpf"
                    placeholder="CPF"
                    className={`cs-input ${classes.field}`}
                  />
                  <ErrorMessage
                    name="cpf"
                    component="div"
                    className={classes.errorMessage}
                  />
                </div>

                <div>
                  <Field name="birthDate">
                    {({ field }: { field: FieldInputProps<string> }) => (
                      <input
                        {...field}
                        type="date"
                        placeholder="Data de nascimento"
                        className={`cs-input ${classes.field}`}
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="birthDate"
                    component="div"
                    className={classes.errorMessage}
                  />
                </div>
              </div>

              <div>
                <Field name="interests">
                  {({ field }: { field: FieldInputProps<string> }) => (
                    <MultiSelect {...field} />
                  )}
                </Field>
                <ErrorMessage
                  name="interests"
                  component="div"
                  className={classes.errorMessage}
                />
              </div>
            </div>

            <div className={classes.formGroupOptional}>
              <Field
                name="address.street"
                placeholder="Rua"
                className={`cs-input ${classes.fieldAll}`}
              />
              <Field
                name="address.number"
                placeholder="Numero"
                className={`cs-input ${classes.fieldAll}`}
              />
              <Field
                name="address.complement"
                placeholder="Complemento"
                className={`cs-input ${classes.fieldAll}`}
              />
              <Field
                name="address.city"
                placeholder="Cidade"
                className={`cs-input ${classes.fieldAll}`}
              />
              <Field
                name="address.state"
                placeholder="Estado"
                className={`cs-input ${classes.fieldAll}`}
              />
              <Field
                name="address.zipCode"
                placeholder="CEP"
                className={`cs-input ${classes.fieldAll}`}
              />
            </div>

            <div className={classes.formGroupButton}>
              <button type="submit" disabled={loading} className={"cs-btn"}>
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
