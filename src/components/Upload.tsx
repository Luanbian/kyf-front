import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "../store/hooks";
import { actions } from "../features/customer";

export const UploadDocument = () => {
  const dispatch = useDispatch();
  const { extractedDocument } = useSelector((state) => state.customer.data);

  const handleSubmit = (values: { file: File | null }) => {
    if (values.file) {
      dispatch(actions.saveUploadedDocument(values.file));
      dispatch(actions.getCustomerRequest());
    }
  };

  return (
    <Formik initialValues={{ file: null }} onSubmit={handleSubmit}>
      {({ setFieldValue }) => (
        <Form style={{ display: "flex", gap: 50 }}>
          <div style={{ display: "flex", gap: 15 }}>
            <input
              className="cs-input"
              type="file"
              onChange={(e) =>
                setFieldValue("file", e.target.files?.[0] || null)
              }
            />
            <button type="submit" className="cs-btn">
              Upload
            </button>
          </div>
          {extractedDocument && (
            <div style={{ display: "flex" }}>
              <p> Dado extraido do arquivo &gt; CPF: {extractedDocument}</p>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};
