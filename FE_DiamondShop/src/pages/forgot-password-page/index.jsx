import { Link } from "react-router-dom";
import "./index.scss";
import "../login-page/index";
import logo from "../../components/assets/logo.png";

const PasswordForm = () => {
  return (
    <div className="password-form">
      <div className="logo-bg">
        <img width={550} src={logo} alt="" />
      </div>

      <div className="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins">
        <div className="wrapper wrapper--w680">
          <div className="card card-4">
            <div className="card-body">
              <h2 className="title">Forgot Password</h2>
              <p>
                Enter the email with your account and we'll send you a link to
                reset your password
              </p>
              <br />
              <form method="POST">
                <div className="input-group">
                  <label className="label">Enter the email</label>
                  <input
                    className="input--style-4"
                    type="mail"
                    name="forgotpass"
                    placeholder="Enter Email..."
                  />
                </div>
                <br />
                <div className="p-t-15">
                  <Link to="/login">
                    <button
                      className="btn btn--radius-2 btn--blue"
                      type="submit"
                    >
                      Continue
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordForm;
