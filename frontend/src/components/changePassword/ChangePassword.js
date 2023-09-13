import React, { useState } from "react";
import "./ChangePassword.scss";
import { toast } from "react-toastify";
import { ChangeUserPassword } from "../../services/authService";
import Card from "../card/Card";
import { useNavigate } from "react-router-dom";
const ChangePassword = () => {
  const initialState = {
    oldpassword: "",
    password: "",
    password2: "",
  };
  const navigate = useNavigate();
  const [formData, setformData] = useState(initialState);
  const { oldpassword, password, password2 } = formData;
  const HandleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };
  const changePass = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      return toast.error("New password Donot match");
    }
    const formData = {
      oldpassword,
      password,
    };

    const data = await ChangeUserPassword(formData);
    toast.success(data);
    navigate("/profile")
  };

  return (
    <div className="change-password">
      <Card className={"passwprd-card"}>
        <h3>Change Password</h3>
        <form onSubmit={changePass} className="--form-control">
          <input
            type="password"
            placeholder="Old Password"
            required
            name="oldpassword"
            value={oldpassword}
            onChange={HandleInputChange}
          />
          <input
            type="password"
            placeholder="New Password"
            required
            name="password"
            value={password}
            onChange={HandleInputChange}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            required
            name="password2"
            value={password2}
            onChange={HandleInputChange}
          />
          <button className="--btn --btn-primary">Change Password</button>
          
        </form>
      </Card>
    </div>
  );
};

export default ChangePassword;
