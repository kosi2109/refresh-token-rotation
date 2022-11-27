import React from 'react'
import {useForm} from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from "yup";
import apiInstance from './api/api';

const schema = yup.object({
  username: yup.string().required(),
  password: yup.string().min(8).required(),
  confirm_password: yup.string().oneOf([yup.ref('password')],"Password doesn't match.").required(),
}).required();

function Register() {
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver : yupResolver(schema)
    });

    const onSubmit = (data) => {
        apiInstance.post('/register',data).then((data) => console.log(data)).catch((data) => console.log(data))
    };

  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('username')} type="text" />
            <p>{errors.username?.message}</p>
            <input {...register('password')} type="password" />
            <p>{errors.password?.message}</p>
            <input {...register('confirm_password')} type="password" />
            <p>{errors.confirm_password?.message}</p>

            <button>Submit</button>
        </form>
    </div>
  )
}

export default Register