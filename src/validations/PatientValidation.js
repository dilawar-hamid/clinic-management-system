import * as Yup from "yup";

const PatientValidation = Yup.object({
  name: Yup.string().required("Patient name is required"),

  age: Yup.number()
    .typeError("Age must be a number")
    .positive("Age must be greater than 0")
    .integer("Age must be a whole number")
    .required("Age is required"),

  gender: Yup.string().required("Please select gender"),

  phone: Yup.string(),

  fee: Yup.number()
    .typeError("Fee must be a number")
    .min(1, "Fee must be greater than 0")
    .required("Fee is required"),
});

export default PatientValidation;
