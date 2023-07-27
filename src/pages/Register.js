import { useState, useEffect } from "react";
import Wrapper from "../assets/wrappers/RegisterPage";
import { onAuthStateChanged } from "firebase/auth";
import FormRow from "../components/FormRow";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import UploadImage from "../components/UploadImage";
// redux toolkit and useNavigate later

const initialState = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  isMember: true,
};
// if possible prefer local state
// global state

function Register({ setLoading, loading }) {
  const [pic, setPic] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (User) => {
      if (User) {
        navigate("/my-profile");
      }
    });
  }, [navigate, setLoading]);

  const [values, setValues] = useState(initialState);
  // redux toolkit and useNavigate later
  function toggleMember() {
    setValues({ ...values, isMember: !values.isMember });
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember, phoneNumber } = values;
    // if (!email || !password || (!isMember && !name)) {
    //   toast.error("Please Fill Out All Fields");
    //   return;
    // }
    if (isMember) {
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCreds) => {
          setLoading(true);
          toast.success("Logged In successfully");
          navigate("/my-profile");
        })
        .catch((error) => {
          toast.error("Something went wrong");
          console.log(error);
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCreds) => {
          setLoading(true);
          const formdata = new FormData();
          formdata.append("image", pic);
          formdata.append("email", userCreds.user.email);
          formdata.append("phoneNo", phoneNumber);
          formdata.append("name", name);
          const userBackend = await axios.post(
            `http://localhost:5000/api/user/register`,
            formdata,
            { headers: { "Content-Type": "multipart/form-data" } }
          );
          localStorage.setItem("pfp", JSON.stringify(userBackend.data));
          setLoading(false);
          navigate("/my-profile");
        })
        .catch((e) => {
          toast.error("Something went wrong");
          console.log(e);
        });
    }
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <h3>{values.isMember ? "Login" : "Register"}</h3>

        {!values.isMember && (
          <>
            <FormRow
              type={"text"}
              handleChange={handleChange}
              value={values.name}
              name={"name"}
              labelText={"Name"}
            />
            <FormRow
              type={Number}
              handleChange={handleChange}
              value={values.phoneNumber}
              name={"phoneNumber"}
              labelText={"PhoneNo"}
            />
          </>
        )}

        <FormRow
          type={"email"}
          handleChange={handleChange}
          value={values.email}
          name={"email"}
          labelText={"Email"}
        />
        <FormRow
          type={"password"}
          handleChange={handleChange}
          value={values.password}
          name={"password"}
          labelText={"Password"}
        />
        {!values.isMember && <UploadImage pic={pic} setPic={setPic} />}

        <button type="submit" className="btn btn-block">
          {loading ? <Loader /> : "Submit"}
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
}
export default Register;
