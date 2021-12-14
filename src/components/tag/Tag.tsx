import "./tag.css";

interface Props {
  title: string;
}

const Tag = (props: Props) => {
  const { title } = props;
  return (
    <a className="tag" href="" title={title}>
      {title}
    </a>
  );
};

export default Tag;
