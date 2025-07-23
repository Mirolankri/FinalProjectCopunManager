import React from "react";
import PropTypes from "prop-types";
import { LoaderCircle } from "lucide-react";

const Spinner = ({ color = "text-cyan-600", size = 10, height = "100vh" }) => {
  const heightclass = `min-h-[${height}]`;
  const SizeClass = `size-${size}`;
  return (
    <div className={`flex items-center justify-center ${heightclass}`}>
      <LoaderCircle className={`animate-spin ${color} ${SizeClass}`} />
    </div>
  );
};

Spinner.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  height: PropTypes.string,
};

export default Spinner;
