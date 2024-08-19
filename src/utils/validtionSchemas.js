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

export const addVisitSchema = (object) => {
  if (!object.groupId) return false;
  if (!object.tenantId) return false;
  if (!object.tenantName) return false;
  if (!object.tenantPhoneNumber) false;

  if (!object.rentAmount) return false;
  if (!object.propertyName) return false;

  if (object.electricityAmountPerUnit) {
    if (object.previousReading === "") return false;

    if (object.previousReading < 0) return false;

    if (object.currentReading === "") return false;
    if (object.currentReading < 0) return false;

    if (object.totalUnits === "") return false;
    if (object.totalUnits < 0) return false;
  }

  if (object.previouslyPending) {
    if (
      !object.previouslyPendingAmount ||
      Number(object.previouslyPendingAmount) < 0
    )
      return false;
  }

  if (object.damages) {
    if (object.damagesExplained.length < 10) return false;
  }

  return true;
};

export const addTransactionSchema = (object) => {
  if (!object.groupId) return false;
  if (!object.tenantId) return false;
  if (!object.tenantName) return false;
  if (!object.propertyName) return false;
  if (isNaN(Date.parse(object.transactionDate))) return false;
  if (object.paymentMethod.length < 4) return false;
  if (object.paymentType.length < 5) return false;
  if (!object.recivedAmount) return false;
  if (object.recivedAmount < 1) return false;

  return true;
};
