import React from "react";
import { toast } from "react-toastify";
import Loader from "./Loader";

const PostImage = ({ picture }) => {
  if (!picture) {
    return <Loader />;
  }
  const bufferData = picture?.data?.data;
  let imageSrc;
  try {
    const base64String = btoa(String.fromCharCode.apply(null, bufferData));
    imageSrc = `data:image/jpeg;base64,${base64String}`;
  } catch (error) {
    return <div>{toast.error(error)}</div>;
  }
  return (
    <img
      className="post-img"
      style={{ height: "120px", width: "120px" }}
      src={imageSrc}
      alt="post pic"
    />
  );
};

export default PostImage;
