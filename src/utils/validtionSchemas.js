import * as yup from "yup";

export const validateSchema = async (schema, object) => {
  const validObject = new Promise((resolve, reject) => {
    schema
      .validate(object, { abortEarly: true })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
  return validObject;
};

export const initialUserSchema = yup.object().shape({
  userName: yup.string().required().min(3).max(30),
  userEmail: yup
    .string()
    .required()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
  phoneNumber: yup
    .string()
    .required()
    .matches(/^[6-9]\d{9}$/),
  dateOfBirth: yup
    .string()
    .required()
    .matches(/^\d{4}-\d{2}-\d{2}$/),
  gender: yup.string().required(),
});

export const otpVerificationSchema = yup.object().shape({
  userEmail: yup
    .string()
    .required()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
  otp: yup.string().required().min(6).max(6),
});

export const passwordSettingSchema = yup.object().shape({
  userEmail: yup
    .string()
    .required()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
  otp: yup.string().required().min(6).max(6),
  password: yup.string().required().min(8),
  src: yup.string().required().min(3).max(5),
});
