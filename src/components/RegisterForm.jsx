import { isToday } from "../utils/date";
import { DEFAULT_FEE } from "../config";
import { useFormik } from "formik";
import PatientValidation from "../validations/PatientValidation";
import { useContext, useRef } from "react";
import { PatientContext } from "../context/PatientContext.js";

function RegisterForm() {
  const { addPatient, patients } = useContext(PatientContext);
  const nameInputRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      gender: "",
      phone: "",
      fee: DEFAULT_FEE,
    },

    validationSchema: PatientValidation,

    onSubmit: (values, { resetForm }) => {
      const todayPatients = patients.filter((patient) =>
        isToday(patient.createdAt),
      );

      const highestToken = todayPatients.reduce((highest, patient) => {
        const number = Number(String(patient.token || "").replace(/^T-/i, ""));
        return Number.isFinite(number) ? Math.max(highest, number) : highest;
      }, 0);
      const tokenNumber = String(highestToken + 1).padStart(3, "0");

      const newPatient = {
        ...values,
        id: Date.now(),
        token: "T-" + tokenNumber,
        createdAt: new Date().toISOString(),
        status: "Registered",
      };

      addPatient(newPatient);
      resetForm();
      nameInputRef.current?.focus();
    },
  });

  return (
    <div className="register-card">
      <div className="register-heading">
        <h2>Register Patient</h2>
        <p>Enter patient details to generate a token.</p>
      </div>

      <form className="register-form" onSubmit={formik.handleSubmit}>
        {/* Patient Name */}
        <div className="form-field">
          <label htmlFor="name">
            Patient Name <span>*</span>
          </label>
          <input
            id="name"
            ref={nameInputRef}
            type="text"
            placeholder="Enter patient name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <small>{formik.errors.name}</small>
          )}
        </div>

        {/* Age + Gender */}
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="age">
              Age <span>*</span>
            </label>
            <input
              id="age"
              type="number"
              placeholder="Enter age"
              name="age"
              value={formik.values.age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.age && formik.errors.age && (
              <small>{formik.errors.age}</small>
            )}
          </div>

          <div className="form-field">
            <label>
              Gender <span>*</span>
            </label>

            <div className="gender-buttons" role="group" aria-label="Select gender">
              <button
                type="button"
                aria-pressed={formik.values.gender === "Male"}
                className={formik.values.gender === "Male" ? "selected" : ""}
                onClick={() => {
                  formik.setFieldValue("gender", "Male");
                  formik.setFieldTouched("gender", true, false);
                }}
              >
                Male
              </button>

              <button
                type="button"
                aria-pressed={formik.values.gender === "Female"}
                className={formik.values.gender === "Female" ? "selected" : ""}
                onClick={() => {
                  formik.setFieldValue("gender", "Female");
                  formik.setFieldTouched("gender", true, false);
                }}
              >
                Female
              </button>
            </div>

            {formik.touched.gender && formik.errors.gender && (
              <small>{formik.errors.gender}</small>
            )}
          </div>
        </div>

        {/* Phone + Fee */}
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="tel"
              placeholder="Optional"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone && (
              <small>{formik.errors.phone}</small>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="fee">
              Consultation Fee (Rs.) <span>*</span>
            </label>
            <input
              id="fee"
              type="number"
              placeholder="Enter fee"
              min="1"
              name="fee"
              value={formik.values.fee}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.fee && formik.errors.fee && (
              <small>{formik.errors.fee}</small>
            )}
          </div>
        </div>

        <button className="register-button" type="submit">
          Generate Token
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
