import * as yup from 'yup';

export const seoOptionValidationSchema = yup.object().shape({
  name: yup.string().required(),
  value: yup.string().required(),
  organization_id: yup.string().nullable(),
});
