import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import joi from 'joi'
import image from '../../Images/gaming.ebaf2ffc84f4451d.jpg'
export default function SignUp() {
  let [ErrerApi, SetErrerApi] = useState("")
  let [ErrerValidtion, SetErrerValidtion] = useState([])
  let Navigate = useNavigate()
  let [Loading, SetLoading] = useState(false)

  let [userData, SetUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    age: "",
  })
  function AddUser(e) {
    let MyUser = { ...userData };
    MyUser[e.target.name] = e.target.value;
    SetUserData(MyUser);
  }
  function Validtion() {
    let Sceama = joi.object({
      first_name: joi.string().required().min(3).max(30).alphanum(),
      last_name: joi.string().required().min(3).max(30).alphanum(),
      age: joi.number().required().min(16).max(80),
      email: joi.string().required().email({ tlds: { allow: ['com', 'net'] } }),
      password: joi.string().required().pattern(new RegExp(/^[A-Z][a-z]{2,10}[0-9]?/))
    })
    return Sceama.validate(userData, { abortEarly: false })
  }
  async function SubmitForm(e) {
    e.preventDefault()
    let error = Validtion()

    if (error?.error) {
      SetErrerValidtion(error.error.details)
    }
    else {
      SetErrerValidtion([])
      SetLoading(true)
      let { data } = await axios.post("https://route-egypt-api.herokuapp.com/signup", userData)
      SetLoading(false)
      if (data.message = "success") {
        Navigate("/SignIn")
      }
      else {
        SetErrerApi(data.message)
      }
    }
  }
  return (
    <div className='SignContainer'>
      <div className='SignContact'>
        <div className='col-md-6'>
          <img src={image} className='image' />
        </div>
        <div className='col-md-6 bg-transparent p-3'>
          <div className='mt-5 text-center'>
            <h2>Create My Account!</h2>
          </div>
          <form onSubmit={SubmitForm}>

            <div className="input-group mt-3">
              <input type="text" onChange={AddUser} className="form-control input-Style" id='first_name' name='first_name' placeholder='First name' />
              <input type="text" onChange={AddUser} aria-label="Last name" className="form-control ms-4 input-Style" id='last_name' name='last_name' placeholder='Last name' />
            </div>
            <div className="input-group mt-3">
              <input type="email" onChange={AddUser} className="form-control input-Style" id='email' name='email' placeholder='Email Address' />
            </div>
            <div className="input-group mt-3">
              <input type="number" onChange={AddUser} className="form-control input-Style" id='age' name='age' placeholder='Age' />
            </div>
            <div className="input-group mt-3">
              <input type="password" onChange={AddUser} className="form-control input-Style" id='password' name='password' placeholder='Password' />
            </div>
            <div className="d-grid gap-2 mt-3">
            {Loading ?

              <button className='button-Style'>
                <i className='fa-solid fa-spinner fa-spin'></i>
              </button>
              :
              <button className="button-Style" type="Submit">Create Account</button>
            }
            </div>
            <div className="d-grid gap-2 mt-3 text-center">
              <b>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</b>
            </div>
            <hr />
            <div className="text-center">
              <span className="small">Already a member?</span>
              <a className="small a2 cursor ms-2">
                Log In
                <i className="fas fa-chevron-right small"></i>
              </a>
            </div>

          </form>
          {ErrerValidtion.length <= 0 ? '' : ErrerValidtion.map((el, i) => <div key={i} className='alert alert-danger my-2'>{el.message}</div>)}
          {ErrerApi == '' ? '' : <div className='alert alert-danger my-2'>{ErrerApi}</div>}
        </div>
      </div>
    </div>
  )
}
