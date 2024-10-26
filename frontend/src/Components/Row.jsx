const Row = ({ className, children }) => {
  return (
    <>
      <div className={`flex flex-row justify-center items-center ${className}`}>
        {children}
      </div>
    </>
  );
};

export default Row;
