import React from "react";

import PostImage from "../components/PostImage";
import Loader from "../components/Loader";

const Posts = ({ posts }) => {
  console.log(posts);
  if (!posts) {
    return <Loader />;
  }
  return (
    <div className="postsImg">
      {posts.map((e) => (
        <PostImage key={e._id} picture={e.picture} />
      ))}
    </div>
  );
};

export default Posts;
