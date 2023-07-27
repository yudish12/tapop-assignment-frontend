import React from "react";
import pfp from "../assets/images/download.jpg";
const UploadImage = ({ pic, setPic }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPic(file);
  };

  return (
    <>
      <label
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          marginTop: "1rem",
        }}
        htmlFor="pfp"
      >
        <span className="btn" style={{ marginTop: "0" }}>
          Choose New Photo
        </span>
        {!pic ? (
          <img style={{ height: "60px" }} src={pfp} alt="DP" />
        ) : (
          <img
            style={{ height: "60px" }}
            src={URL.createObjectURL(pic)}
            alt="DP"
          />
        )}
      </label>
      <input
        onChange={handleImageChange}
        type="file"
        filename={pic}
        accept="image/*"
        name="pfp"
        id="pfp"
        style={{ visibility: "hidden" }}
      />
    </>
  );
};

export default UploadImage;
