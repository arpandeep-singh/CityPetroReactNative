import React from "react";
import ErrorMessage from "../errorMessage";
import { useFormikContext } from "formik";
import ImageInput from "../ImageInput";

function FormImagePicker({ name }) {
  const { errors, setFieldValue, touched, values } = useFormikContext;

  //   const imageUris = values["city"];
  const handleAdd = (uri) => {
    setFieldValue("images", [...values["images"], uri]);
  };
  const handleRemove = (uri) => {
    setFieldValue(
      name,
      imageUris.filter((imageuri) => imageuri !== uri)
    );
  };

  return (
    <>
      <ImageInput
        imageUris={values["images"]}
        onAddImgae={handleAdd}
        onRemoveImage={handleRemove}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default FormImagePicker;
