import "./posts.css";
import Post from "../post/Post";

interface Props {}

const Posts = (props: Props) => {
  return (
    <div className="posts">
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default Posts;
