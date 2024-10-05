export const CText = (props) => {
  let { text, size, bold } = props;
  size = size === "xl" ? "text-2xl" : "text-lg";
  return <div className={`${size} ${bold && "font-bold"}`}>{text}</div>;
};
