import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import React from "react";
import FacebookLogin from "react-facebook-login";
import authApi from "../../../../../api/authApi";

const SocialLogin = ({ onSuccessLogin }) => {
  const handleGoogleLogin = async (res) => {
    const { email, name, picture, email_verified } = jwt_decode(res.credential);
    const data = { email, name, picture, email_verified };
    try {
      const res = await authApi.googleLogin(data);
      onSuccessLogin(res.data);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  const handleFacebookLogin = async (response) => {
    try {
      const { name, picture, email } = response;
      const res = await authApi.facebookLogin({
        name,
        picture: picture?.data.url,
        email,
      });
      onSuccessLogin(res.data);
    } catch (error) {
      alert(error?.response?.data?.msg);
    }
  };

  return (
    <div className="flex justify-center gap-6">
      <GoogleLogin
        type="icon"
        onSuccess={handleGoogleLogin}
        onError={() => console.log("Google Login error")}
      />
      <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_APP_ID}
        autoLoad={false}
        fields="name,email,picture"
        callback={handleFacebookLogin}
        cssClass="bg-white text-[#4c69ba] w-10 h-[40px] rounded-md border hover:bg-slate-50"
        icon={<i className="fa-brands fa-facebook-f "></i>}
        textButton=""
      />
    </div>
  );
};

export default SocialLogin;
