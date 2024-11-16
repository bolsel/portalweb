'use client';
import clsx from 'clsx';
import _ from 'lodash';
import { ChangeEvent, FormEvent, useState } from 'react';
import { TDFormConfig, TDFormField, validate } from './base';

function RenderField({
  field,
  config,
  deps,
  onChange,
  error,
  value,
}: {
  field: TDFormField;
  config: TDFormConfig;
  deps: Record<string, any>;
  onChange: (e: ChangeEvent<any>) => void;
  error?: string;
  value?: any;
}) {
  field.required =
    typeof field.required !== 'undefined' ? field.required : true;
  field.selectItems ??= {};
  field.description ??= '';
  deps ??= {};
  const { type } = field;

  function renderInput() {
    if (type === 'select') {
      let items = field.selectItems;
      if (typeof items === 'string') {
        items = (deps[items] ?? {}) as Record<string, any>;
      }

      return (
        <select
          value={value ?? ''}
          name={field.id}
          onChange={onChange}
          required={field.required}
          className={clsx(
            'select select-bordered focus:outline-offset-0 w-full',
            { 'select-error': error }
          )}
        >
          <option disabled value="">
            --Pilih--
          </option>

          {_.map(items, (value, key) => {
            return (
              <option key={key} value={key}>
                {value}
              </option>
            );
          })}
        </select>
      );
    }
    return (
      <input
        name={field.id}
        onChange={onChange}
        type={field.type}
        autoComplete="off"
        required={field.required}
        value={value}
        className={clsx(
          'input input-bordered input-bordered focus:outline-offset-0 w-full',
          { 'input-error': error }
        )}
      />
    );
  }
  return (
    <>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text font-bold">
            {field.label} {field.required && '*'}
          </span>
        </div>
        {renderInput()}
        {field.description && (
          <div className="text-sm pl-2">{field.description}</div>
        )}
        {error && <div className="text-sm pl-2 text-error">{error}</div>}
      </label>
    </>
  );
}

export function DForm({
  deps,
  config,
}: {
  config: TDFormConfig;
  deps: Record<string, any>;
}) {
  const [isSend, setIsSend] = useState(false);
  const [errorMsg, setErrMsg] = useState('');
  const [sendSuccess, setSendSuccess] = useState(false);
  const defaultFormData = _.mapValues(_.keyBy(config.fields, 'id'), () => '');
  const [formData, setFormData] = useState(defaultFormData);
  const [errors, setErrors] = useState({});

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { hasError, errors } = validate(formData);
    setErrors(errors);
    setSendSuccess(false);
    setErrMsg('');
    if (!hasError) {
      setIsSend(true);
      const res = await fetch('/smart/register/action', {
        method: 'post',
        body: JSON.stringify(formData),
      })
        .then(async (r) => {
          const res = await r.json();
          if (res.errors) {
            setErrors(res.errors);
          } else if (res.error) {
            setErrMsg(res.error);
          } else if (res.success) {
            setErrors({});
            setFormData(defaultFormData);
            setSendSuccess(true);
          }
          return res;
        })
        .finally(() => {
          setIsSend(false);
        });
      console.log(res);
    }
  };

  const normalizerField = (field: TDFormField) => {
    const onFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (errors[field.id]) {
        delete errors[field.id];
        setErrors(errors);
      }
      setFormData((prev) => {
        return { ...(prev ?? {}), [field.id]: e.target.value as any };
      });
    };
    return (
      <RenderField
        field={field}
        config={config}
        deps={deps}
        value={formData[field.id]}
        onChange={onFieldChange}
        error={errors[field.id]}
      />
    );
  };
  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
        {config.fields.map((field, index) => {
          return <div key={index}>{normalizerField(field)}</div>;
        })}
        <div className="mt-4">
          * Pastikan data yang anda masukan telah sesuai.
        </div>
        <div className="">
          <button disabled={isSend} type="submit" className="btn btn-primary">
            Mendaftar
          </button>
        </div>
      </form>
      {sendSuccess && (
        <div className="alert alert-success my-6" role="alert">
          Data pendaftaran berhasil dikirim dan menunggu verifikasi dari Admin
          Organisasi terkait.
          <br /> Setelah verifikasi dari Admin Organisasi selesai, Anda akan
          menerima Email berisi informasi akun SmartBolsel anda.
        </div>
      )}
      {errorMsg && (
        <div className="alert alert-error mb-6" role="alert">
          {errorMsg}
        </div>
      )}
    </>
  );
}
