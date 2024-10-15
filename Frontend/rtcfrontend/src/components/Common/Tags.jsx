export const CText = (props) => {
  let { text, size, bold } = props;
  size = size === "xl" ? "text-2xl" : "text-lg";
  return <div className={`${size} ${bold && "font-bold"}`}>{text}</div>;
};

export const Badge = (props) => {
  const { text, type } = props;
  console.log(props);
  const badgeType = {
    success: " ring-green-600/20 text-green-700 bg-green-50 ",
    error: " ring-red-600/10 text-red-700 bg-red-50 ",
  };

  return (
    <span
      className={`inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium ring-1 ring-inset ${badgeType[type]}`}
    >
      {text}
    </span>
  );
};
