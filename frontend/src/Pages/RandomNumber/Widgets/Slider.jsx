import { motion } from "framer-motion";

const Slider = ({ sliderControls, isOpen, children }) => {
  return (
    <>
      <motion.div
        variants={{
          initial: {
            y: "-100%",
          },
          dropDown: {
            y: "0px",
          },
        }}
        initial="initial"
        animate={sliderControls}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        className={`w-[95%] rounded-b-xl absolute z-50 ${
          isOpen && "shadow-md shadow-supporting"
        }`}
      >
        {children}
      </motion.div>
    </>
  );
};

export default Slider;
