import React from "react";

export const flatten = (text: string, child: any): string => {
  return typeof child === "string"
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
};

export const getID = (childrenLike: any): string => {
  const children = React.Children.toArray(childrenLike);
  const text = children.reduce(flatten, "");
  const slug = text.toLocaleLowerCase().replace(/\s/g, "-");
  return slug;
};
