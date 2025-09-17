const Skeleton = ({ maxWidth, height, borderRadius }) => {
  return (
    <div
      className="skeleton-box"
      style={{
        width: "100%",
        maxWidth,
        height,
        borderRadius,
      }}
    ></div>
  );
};

export default Skeleton;
