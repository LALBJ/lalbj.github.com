import "./post.css";

interface Props {}

const Post = (props: Props) => {
  return (
    <div className="post">
      <div className="postInfo">
        <div className="postTitle">Lorem ipsum dolor sit amet</div>
        <div className="postTags">
          <div className="postTag">Music</div>
          <div className="postTag">Life</div>
        </div>
      </div>
      <p className="postDesc">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
        officia architecto deserunt deleniti? Labore ipsum aspernatur magnam
        fugiat, reprehenderit praesentium blanditiis quos cupiditate ratione
        atque, exercitationem quibusdam, reiciendis odio laboriosam?
      </p>
      <div className="postDate">Posted by BY on March 29, 2021</div>
      <hr />
    </div>
  );
};

export default Post;
