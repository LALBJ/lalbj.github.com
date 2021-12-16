import React, { useContext } from "react";
import { getID } from "./faltten";
import { ADD_NODE, INavContext, NavContext } from "./Nav";

interface Props {
  children?: any;
  level?: any;
}

export const AnchorGenerate = (props: Props) => {
  const { dispatch }: any = useContext(NavContext);

  //   console.log("context", node);
  const slug = getID(props.children);
  dispatch({ type: ADD_NODE, node: { id: slug, level: props.level } });
  return React.createElement("h" + props.level, { id: slug }, props.children);
};
export const compMap = {
  h1: AnchorGenerate,
  h2: AnchorGenerate,
  h3: AnchorGenerate,
  h4: AnchorGenerate,
  h5: AnchorGenerate,
  h6: AnchorGenerate,
};
