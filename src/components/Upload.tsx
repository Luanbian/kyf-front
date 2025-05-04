import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "../store/hooks";
import { actions } from "../features/customer";
import { useEffect, useState } from "react";

export const UploadDocument = () => {
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state) => state.customer);
  const { extractedDocument } = data;
  const [text, setText] = useState<string>("Enviar Documento");

  const handleSubmit = (values: { file: File | null }) => {
    if (values.file) {
      dispatch(actions.saveUploadedDocument(values.file));
      dispatch(actions.getCustomerRequest());
    }
  };

  useEffect(() => {
    if (loading) {
      setText("Enviando documento...");
    } else {
      setText("Enviar Documento");
    }
  }, [loading]);

  return (
    <Formik initialValues={{ file: null }} onSubmit={handleSubmit}>
      {({ setFieldValue }) => (
        <Form style={{ display: "flex", gap: 50 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
            <input
              className="cs-input"
              type="file"
              onChange={(e) =>
                setFieldValue("file", e.target.files?.[0] || null)
              }
            />
            <button type="submit" className="cs-btn" disabled={loading}>
              {text}
            </button>
          </div>
          {extractedDocument && (
            <div style={{ display: "flex" }}>
              <p> Dado extraido do arquivo &gt; CPF: {extractedDocument}</p>
            </div>
          )}
          {!extractedDocument && (
            <div style={{ display: "flex" }}>
              <p>
                Nenhum dado encontrado no documento, tente outro mais legível
              </p>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};
