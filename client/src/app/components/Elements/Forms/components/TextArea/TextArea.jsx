import React from "react";
import PropTypes from "prop-types";

const TextArea = ({
  variant,
  type,
  name,
  data = {},
  label,
  required,
  error,
  onChange,
  placeholder = "",
  Icon = null,
  colSpan = 1,
  rows = 4,
  ...rest
}) => {
   
    

  return (
    <div className={`col-span-${colSpan}`}>
      <div className="flex items-center justify-between ">
        <label
          htmlFor={name}
          className="block text-sm/6 font-medium text-gray-900 "
        >
          <div className="flex items-center">
            <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6 size-5">
              {Icon && Icon}
            </div>
            {label}
          </div>
        </label>
          
        {/* <div className="text-sm">
          <a
            href="#"
            className="font-semibold text-gray-600 hover:text-gray-500"
          >
            שכחת סיסמא?
          </a>
        </div> */}
      </div>
      <div className="mt-2">
        <div className={`flex items-center `}>
          <textarea 
            id={name}
            name={name}
            required={required}
            onChange={onChange}
            rows={rows} 
            value={data[name] ? data[name] : ""}
            className={`${error[name] ? 'outline-red-400' : 'outline-gray-300'} block p-2.5 w-full text-sm text-gray-900  rounded-lg outline-1 -outline-offset-1  focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600`}
            placeholder={placeholder} 
            {...rest}>
            </textarea>
          
          
            
        </div>
        
      </div>
      
        {error[name] && <span className="block text-sm/6 font-medium text-red-400 mt-1">{error[name]}</span>}
    </div>
  );
  
};

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  variant: PropTypes.string,
  data: PropTypes.object,
};
export default React.memo(TextArea);
