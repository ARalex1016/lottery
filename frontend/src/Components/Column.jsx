const Column = ({ className, children }) => {
  return (
    <>
      <div className={`flex flex-col justify-center items-center ${className}`}>
        {children}
      </div>
    </>
  );
};

export default Column;
