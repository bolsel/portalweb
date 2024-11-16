export type TDFormField = {
  id: string;
  type: 'text' | 'number' | 'date' | 'email' | 'select';
  selectItems?: string | Record<string, any>;
  label: string;
  required?: boolean;
  description?: string;
};
export type TDFormFields = TDFormField[];

export function validate(data: any, fields: TDFormFields) {
  const errors = {};
  for (const field of fields) {
    if (!data[field.id]) {
      if (field.required) {
        errors[field.id] = `${field.label} tidak boleh kosong`;
      }
    } else {
      const value = data[field.id];
      if (field.type === 'email' && !/\S+@\S+\.\S+/.test(value)) {
        errors[
          field.id
        ] = `${field.label} harus format email. contoh: namasaya@gmail.com`;
      }
    }
  }
  return { errors, hasError: Object.keys(errors).length > 0 };
}
