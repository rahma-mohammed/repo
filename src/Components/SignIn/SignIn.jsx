import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import joi from "joi";

import image from "../../Images/gaming.ebaf2ffc84f4451d.jpg";
import logo from "../../Images/logo.png";

export default function SignIn({ userToken }) {
  let [ErrerValidtion, SetErrerValidtion] = useState([]);
  let [userData, SetUserData] = useState({
    email: "",
    password: "",
  });
  let [ErrerApi, SetErrerApi] = useState("");
  let Navigate = useNavigate();
  let [Loading, SetLoading] = useState(false);

  function Validtion() {
    let Sceama = joi.object({
      email: joi
        .string()
        .required()
        .email({ tlds: { allow: ["com", "net"] } }),
      password: joi
        .string()
        .required()
        .pattern(new RegExp(/^[A-Z][a-z]{2,10}[0-9]?/)),
    });
    return Sceama.validate(userData, { abortEarly: false });
  }

  function AddUser(e) {
    let MyUser = { ...userData };
    MyUser[e.target.name] = e.target.value;
    SetUserData(MyUser);
  }
  async function SubmitForm(e) {
    e.preventDefault();
    let error = Validtion();
    if (error?.error) {
      SetErrerValidtion(error.error.details);
    } else {
      SetLoading(true);
      SetErrerValidtion([]);
      let { data } = await axios.post(
        "https://route-egypt-api.herokuapp.com/signin",
        userData
      );
      SetLoading(false);
      if (data.message == "success") {
        Navigate("/Home");
        localStorage.setItem("Token", data.token);
        userToken();
      } else {
        SetErrerApi(data.message);
      }
    }
  }

  return (
    <div className="SignContainer">
      <div className="SignContact justify-content-center">
        <div className="col-md-6 bg-transparent">
          <div className="mt-3 text-center">
            <img src={logo} alt="" className="w-25" />
            <h2>Log in to GameOver</h2>
          </div>
          <form onSubmit={SubmitForm}>
            <div className="input-group mt-3">
              <input
                type="email"
                onChange={AddUser}
                id="email"
                name="email"
                className="form-control"
                placeholder="Email"
              />
            </div>
            <div className="input-group mt-3">
              <input
                type="password"
                onChange={AddUser}
                id="password"
                name="password"
                className="form-control"
                placeholder="Password"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              {Loading ? (
                <button className="button-Style">
                  <i className="fa-solid fa-spinner fa-spin"></i>
                </button>
              ) : (
                <button className="button-Style" type="Submit">
                  Login
                </button>
              )}
            </div>
            <hr />
            <div className="text-center">
              <a className="small a2 cursor ms-2">
                Forgot Password?
                <i className="fas fa-chevron-right small"></i>
              </a>
            </div>
            <div className="text-center">
              <span className="small">Not a member yet?</span>
              <a className="small a2 cursor ms-2">
                Create Account
                <i className="fas fa-chevron-right small"></i>
              </a>
            </div>
          </form>
          {ErrerValidtion.length <= 0
            ? ""
            : ErrerValidtion.map((el, i) => (
                <div key={i} className="alert alert-danger my-2">
                  {el.message}
                </div>
              ))}
          {ErrerApi == "" ? (
            ""
          ) : (
            <div className="alert alert-danger my-2">{ErrerApi}</div>
          )}
        </div>
      </div>
    </div>
  );
}
