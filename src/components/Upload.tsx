import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "../store/hooks";
import { actions } from "../features/customer";

export const UploadDocument = () => {
  const dispatch = useDispatch();
  const { extractedDocument } = useSelector((state) => state.customer.data);

  const handleSubmit = (values: { file: File | null }) => {
    if (values.file) {
      dispatch(actions.saveUploadedDocument(values.file));
    }
  };

  return (
    <Formik initialValues={{ file: null }} onSubmit={handleSubmit}>
      {({ setFieldValue }) => (
        <Form>
          <div>
            <h1>Upload Document</h1>
            <p>This is the upload document page.</p>
            <input
              type="file"
              onChange={(e) =>
                setFieldValue("file", e.target.files?.[0] || null)
              }
            />
            <button type="submit">Upload</button>
            <p>{extractedDocument}</p>
          </div>
        </Form>
      )}
    </Formik>
  );
};
