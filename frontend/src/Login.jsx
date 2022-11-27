import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import apiInstance from "./api/api";
import { UserState } from "./context/store";
import { Link } from "react-router-dom";

const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().min(8).required(),
  })
  .required();

function Login() {
  const { register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(schema),
  });

  const {user,setUser} = UserState();

  const onSubmit = (data) => {
    apiInstance
      .post("/login", data)
      .then((data) => setUser(data.data))
      .catch((data) => console.log(data));
  };

  const onLogout = () => {
    apiInstance
      .post("/logout")
      .then((data) => console.log(data))
      .catch((data) => console.log(data));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("username")} type="text" />
        <p>{errors.username?.message}</p>
        <input {...register("password")} type="password" />
        <p>{errors.password?.message}</p>

        <button>Submit</button>
      </form>

      <button onClick={() => onLogout()}>Logout</button>
      <Link to="/user" >User</Link>
    </div>
  );
}

export default Login;
