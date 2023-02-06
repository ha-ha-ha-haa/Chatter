import axios from "axios";
import React, { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./signup.css";

function SignUp() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
	if (passwordAgain.current.value !== password.current.value) {
		passwordAgain.current.setCustomValidity("Passwords don't match!");
	} else {
		const user = {
			username: username.current.value,
			email: email.current.value,
			password: password.current.value,
		};
		try{
			const res = await axios.post("/auth/register", user);
			navigate("/login");
		} catch(err) {
			console.log(err);
		}
	}
  };

  return (
    <div className="signup-form">
      <form onSubmit={handleClick} method="post">
        <h2>Create Account</h2>
        <p className="lead">It's free and hardly takes more than 30 seconds.</p>
        <div className="form-group">
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-user"></i>
            </span>
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Username"
              required="required"
			  ref={username}
            ></input>
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-paper-plane"></i>
            </span>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email Address"
              required="required"
			  ref={email}
            ></input>
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-lock"></i>
            </span>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              required="required"
			  min={6}
			  ref={password}
            ></input>
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-lock"></i>
              <i className="fa fa-check"></i>
            </span>
            <input
              type="password"
              className="form-control"
              name="confirm_password"
              placeholder="Confirm Password"
              required="required"
			  min={6}
			  ref={passwordAgain}
            ></input>
          </div>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary btn-block btn-lg">
            Sign Up
          </button>
        </div>
        <p className="small text-center">
          By clicking the Sign Up button, you agree to our <br></br>
          <a>Terms &amp; Conditions</a>, and <a>Privacy Policy</a>.
        </p>
      </form>
      <div className="text-center">
        Already have an account? <Link to="/login">Login here</Link>.
      </div>
    </div>
  );
}

export default SignUp;
