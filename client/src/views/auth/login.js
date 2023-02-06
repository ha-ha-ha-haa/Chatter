import React, { useRef,useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./signup.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";


function Login() {

	const email = useRef();
	const password = useRef();

  const {user, isFetching, error, dispatch} = useContext(AuthContext);
  const {isLoggedIn, setIsLoggedIn} = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall({email: email.current.value, password: password.current.value}, dispatch);
    console.log(user);
    
  };

  console.log(user);
  return (
    <div className="signup-form">
      <form onSubmit={handleClick} method="post">
        <h2>Login</h2>
        <div className="form-group">
          <div className="input-group">
            <span className="input-group-addon"><i className="fa fa-paper-plane"></i></span>
            <input type="email" className="form-control" name="email" placeholder="Email Address" required="required"
            ref={email}></input>
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
			  minLength={6}
              placeholder="Password"
              required="required"
			  ref={password}
            ></input>
          </div>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary btn-block btn-lg">
            {isFetching ? <i className="fa fa-spinner fa-spin"></i>:"Login"}
          </button>
        </div>
      </form>
      <div className="text-center">
        Don't have an account?<Link to="/signup">Sign up here</Link>.
      </div>
    </div>
  );
}

export default Login;
