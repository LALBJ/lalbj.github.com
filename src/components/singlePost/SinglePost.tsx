import Tag from "../tag/Tag";
import ReactMarkdown from "react-markdown";
import "./singlePost.css";

interface Props {}

export const SinglePost = (props: Props) => {
  const content =
    "# 50projects10days " +
    "\n" +
    "[toc]" +
    "\n" +
    "## 技术选型" +
    "\n" +
    'GitHub上有很多好用的搭建博客的框架，比如<a href="[gatsby](https://github.com/gatsbyjs/gatsby)">gatsby</a>、<a href="https://github.com/jekyll/jekyll">[jekyll](https://github.com/jekyll/jekyll)</a>' +
    "\n" +
    "但是，考虑到已经近一个月没有做过react开发了，为了练手选择了比较熟悉但是依旧有一些挑战的技术栈React+Node.js，自己动手开发。";
  return (
    <div className="singlePost">
      <img
        className="singlePostImg"
        src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        alt=""
      />
      <div className="singlePostInfo container">
        <div className="singlePostTags">
          <Tag title="iOS" />
          <Tag title="React" />
        </div>
        <div className="singlePostTitle">KVO详解</div>
        <div className="singlePostDate">Posted by BY on March 29, 2021</div>
      </div>
      <div className="singlePostWrapper">
        <ReactMarkdown children={content}></ReactMarkdown>
      </div>
    </div>
  );
};
