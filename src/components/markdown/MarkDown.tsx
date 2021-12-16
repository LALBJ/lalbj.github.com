import React, { useMemo } from "react";

interface Props {
  content: string;
}

const MarkDown = (props: Props) => {
  const { content } = props;
  const children: Array<string> = useMemo(() => content.split("\n"), [content]);
  console.log(children);
  return <div></div>;
};

export default MarkDown;
