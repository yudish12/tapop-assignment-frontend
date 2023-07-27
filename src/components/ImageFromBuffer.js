import React from "react";
import { toast } from "react-toastify";

const ImageFromBuffer = () => {
  // Convert the buffer data to a base64 string
  const bufferData = JSON.parse(localStorage.getItem("pfp"))?.data?.picture
    ?.data.data;
  let imageSrc;
  try {
    const base64String = btoa(String.fromCharCode.apply(null, bufferData));
    imageSrc = `data:image/jpeg;base64,${base64String}`;
  } catch (error) {
    return <div>{toast.error(error)}</div>;
  }

  return (
    <img
      style={{ height: "160px", width: "160px", borderRadius: "100%" }}
      alt="hello"
      src={imageSrc}
    />
  );
};

export default ImageFromBuffer;
