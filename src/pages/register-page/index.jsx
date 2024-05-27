import { Link } from "react-router-dom";
import "./index.scss"
import "../login-page/index"
import logo from "../../components/assets/logo.png";
//import logo diamong store

// import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined, HomeOutlined, TableOutlined } from "@ant-design/icons";
const RegisterForm = () => {


  return (

    <div className="register-form">
      <div className="logo-bg">
        <img width={550} src={logo} alt="" />
      </div>

      <div className="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins">
        <div className="wrapper wrapper--w680">
          <div className="card card-4">
            <div className="card-body">
              <h2 className="title">Registration Form</h2>
              <form method="POST">
                <div className="row row-space">
                  <div className="col-2">
                    <div className="input-group">
                      <label className="label">First name</label>
                      <input className="input--style-4" type="text" name="first_name" />
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="input-group">
                      <label className="label">Last name</label>
                      <input className="input--style-4" type="text" name="last_name" />
                    </div>
                  </div>
                </div>
                <div className="row row-space">
                  <div className="col-2">
                    <div className="input-group">
                      <label className="label">Birthday</label>
                      <div className="input-group-icon">
                        <input className="input--style-4 birthday" type="date" name="birthday" />
                        <i className="zmdi zmdi-calendar-note input-icon js-btn-calendar" />
                      </div>
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="input-group">
                      <label className="label">Gender</label>
                      <div className="p-t-10">
                        <label className="radio-container m-r-45">Male
                          <input type="radio" defaultChecked="checked" name="gender" />
                          <span className="checkmark" />
                        </label>
                        <label className="radio-container">Female
                          <input type="radio" name="gender" />
                          <span className="checkmark" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row row-space">
                  <div className="col-2">
                    <div className="input-group">
                      <label className="label">Email</label>
                      <input className="input--style-4" type="email" name="email" />
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="input-group">
                      <label className="label">Phone Number</label>
                      <input className="input--style-4" type="text" name="phone" />
                    </div>
                  </div>
                </div>
                <div className="input-group">
                  <label className="label">Address</label>
                  <input className="input--style-4" type="text" name="address" />
                </div>
                <div className="input-group">
                  <label className="label">Company Name</label>
                  <input className="input--style-4" type="text" name="companyName" />
                </div>

                <div className="input-group">
                  <label className="label">Country</label>
                  <input className="input--style-4" type="text" name="country" />
                </div>
                <div className="input-group">
                  <label className="label">City</label>
                  <input className="input--style-4" type="text" name="city" />
                </div>

                <div className="row row-space">
                  <div className="col-2">
                    <div className="input-group">
                      <label className="label">Province</label>
                      <input className="input--style-4" type="text" name="province" />
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="input-group">
                      <label className="label">Postal Code</label>
                      <input className="input--style-4" type="text" name="postalCode"/>
                    </div>
                  </div>
                </div>
                <div className="row row-space">
                  <div className="col-2">
                    <div className="input-group">
                      <label className="label">Password</label>
                      <input className="input--style-4" type="password" name="email" />
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="input-group">
                      <label className="label">Confirm Password</label>
                      <input className="input--style-4" type="password" name="phone" />
                    </div>
                  </div>
                </div>
                <div className="p-t-15">

                  <Link to='/login'>
                    <button className="btn btn--radius-2 btn--blue" type="submit">Register</button>
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

export default RegisterForm;
