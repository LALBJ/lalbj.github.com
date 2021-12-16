import React, { useContext, useEffect } from "react";
import { NavContext } from "../../util/Nav";
import "./sideTOC.css";

interface Props {
  children?: any;
  level?: any;
}

let nodeData: any = {};

export const CatchNode = function () {
  return (node: any) => {
    nodeData = Object.assign(nodeData, node);
  };
};

export const SideTOC = () => {
  // const { navs }: any = useContext(NavContext);
  // console.log(navs, "navs");
  useEffect(() => {
    console.log("catch", nodeData);
  }, []);
  const generateNavItem = (id: string, level: number) => {
    return (
      <li key={id} className={`h${level}_nav`}>
        <a href={`#${id}`}>{id}</a>
      </li>
    );
  };
  return (
    <div className="nav-body">
      <div className="nav-title">目录</div>
      <hr className="nav-hr" />
      <ul className="nav-list">
        {nodeData.children?.map((child: any) => {
          if (child.type === "heading") {
            // 这里没有考虑嵌套情况
            const id = child.children[0].value;
            return generateNavItem(id, child.depth);
          }
        })}
      </ul>
    </div>
  );
};
