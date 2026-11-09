import * as Yup from "yup";

const PatientValidation = Yup.object({
  name: Yup.string()
    .trim()
    .max(80, "Name cannot exceed 80 characters")
    .required("Patient name is required"),

  age: Yup.number()
    .transform((value, originalValue) =>
      typeof originalValue === "string" && originalValue.trim() === ""
        ? undefined
        : value,
    )
    .typeError("Age must be a number")
    .integer("Age must be a whole number")
    .min(1, "Age must be at least 1")
    .max(120, "Age cannot exceed 120")
    .required("Age is required"),

  gender: Yup.string()
    .oneOf(["Male", "Female"], "Please select a valid gender")
    .required("Please select gender"),

  doctor: Yup.string()
    .oneOf(
      ["Ali", "Arshad", "Waleed", "Khizar"],
      "Please select a valid doctor",
    )
    .required("Please select a doctor"),

  phone: Yup.string()
    .trim()
    .matches(/^03[0-9]{9}$/, {
      message: "Enter a valid 11-digit mobile number",
      excludeEmptyString: true,
    }),

  fee: Yup.number()
    .transform((value, originalValue) =>
      typeof originalValue === "string" && originalValue.trim() === ""
        ? undefined
        : value,
    )
    .typeError("Fee must be a number")
    .integer("Fee must be a whole number")
    .min(1, "Fee must be greater than 0")
    .required("Fee is required"),
});

export default PatientValidation;
