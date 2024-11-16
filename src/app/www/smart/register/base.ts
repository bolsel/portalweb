export type TDFormField = {
  id: string;
  type: 'text' | 'number' | 'date' | 'email' | 'select';
  selectItems?: string | Record<string, any>;
  label: string;
  required?: boolean;
  description?: string;
};
export type TDFormConfig = {
  title: string;
  fields: TDFormField[];
  data?: {}; // current data
};

export const formConfig: TDFormConfig = {
  title: 'SmartBolsel',
  fields: [
    {
      id: 'personalEmail',
      label: 'Email',
      type: 'email',
      required: true,
      description: 'email harus berstatus aktif untuk menerima informasi akun.',
    },
    {
      id: 'phoneNumber',
      label: 'Nomor Handphone',
      type: 'text',
      required: true,
    },
    {
      id: 'type',
      label: 'Jenis Pegawai',
      type: 'select',
      selectItems: 'userTypesSelect',
      required: true,
    },
    {
      id: 'identityNumber',
      label: 'Nomor Identitas',
      type: 'text',
      required: true,
      description: 'Pegawai ASN masukan NIP, selain Pegawai ASN masukan NIK',
    },
    {
      id: 'fullname',
      label: 'Nama Lengkap',
      type: 'text',
      required: true,
      description: 'Nama lengkap (tanpa gelar)',
    },
    {
      id: 'gender',
      label: 'Jenis Kelamin',
      type: 'select',
      selectItems: {
        m: 'Laki-Laki',
        f: 'Perempuan',
      },
      required: true,
    },
    {
      id: 'birthLocation',
      label: 'Tempat Lahir',
      type: 'text',
      required: true,
    },
    {
      id: 'birthDate',
      label: 'Tanggal Lahir',
      type: 'date',
      required: true,
    },

    {
      id: 'organization',
      label: 'Organisasi',
      type: 'select',
      selectItems: 'organizationsSelect',
      required: true,
    },

    {
      id: 'job_title',
      label: 'Jabatan',
      type: 'select',
      selectItems: 'jobTitlesSelect',
      required: true,
    },
  ],
};

export function validate(data) {
  const errors = {};
  for (const field of formConfig.fields) {
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
