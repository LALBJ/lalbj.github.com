import SideBar from "../../components/sidebar/SideBar";
import { SinglePost } from "../../components/singlePost/SinglePost";
import "./single.css";

interface Props {}

export const Single = (props: Props) => {
  return (
    <div className="single">
      <SinglePost />
      {/* <SideBar /> */}
    </div>
  );
};
