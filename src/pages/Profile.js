import React, { useEffect, useState, useCallback } from "react";
import Wrapper from "../assets/wrappers/ProfilePage";
import { auth } from "../firebase";
import axios from "axios";
import { signOut } from "firebase/auth";
import UploadImage from "../components/UploadImage";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import ImageFromBuffer from "../components/ImageFromBuffer";
import Posts from "./Posts";

const Profile = ({ loading, setLoading }) => {
  const navigate = useNavigate();

  const [userState, setUser] = useState(null);
  const [postPic, setPostPic] = useState("");

  const [posts, setPosts] = useState([]);

  const getPosts = useCallback(async (userid) => {
    const data = await axios.get(`http://localhost:5000/api/post/${userid}`);
    console.log(data);
    setPosts(data.data.postsArr);
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      navigate("/");
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userBackend = await axios.get(
          `http://localhost:5000/api/user/login/${user.email}`
        );

        localStorage.setItem("pfp", JSON.stringify(userBackend.data));
        setUser(userBackend.data);
        setLoading(false);
      } else {
        setLoading(false);

        navigate("/");
      }
    });
  }, [navigate, setLoading]);

  useEffect(() => {
    if (userState) {
      getPosts(userState.data._id);
    }
  }, [getPosts, userState]);

  const createPost = async () => {
    setLoading(true);
    const userid = userState.data._id;
    const formdata = new FormData();
    formdata.append("userid", userid);
    formdata.append("image", postPic);
    const data = await axios.post(
      `http://localhost:5000/api/post/create`,
      formdata,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    console.log(data);
    setPosts([...posts, data.data.post]);
    setLoading(false);
  };

  if (loading || !userState) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader />
      </div>
    );
  }

  return (
    <Wrapper>
      <section>
        <div className="img">
          <ImageFromBuffer setLoading={setLoading} />
        </div>
        <div className="user-info">
          <h3 className="name">{userState?.data?.name}</h3>
          <h3 className="email">{userState?.data?.email}</h3>
          <h3 className="phoneNo">{userState?.data?.phoneNo}</h3>
          <h3 className="desc">Description Box</h3>
          <div className="btn-block">
            <button onClick={handleLogout} className="btn">
              Logout
            </button>
          </div>
        </div>
      </section>
      <section className="posts">
        <div>
          <UploadImage setPic={setPostPic} pic={postPic} />
          <button onClick={createPost} className="btn btn-block">
            Create Post
          </button>
        </div>
        {!loading || posts ? (
          <>
            <Posts posts={posts} />
          </>
        ) : (
          <></>
        )}
      </section>
    </Wrapper>
  );
};

export default Profile;
