import React from "react";
import PropTypes from "prop-types";

const Input = ({
  variant,
  type,
  name,
  data = {},
  label,
  required,
  error = [],
  onChange,
  placeholder = "",
  Icon = null,
  colSpan = 1,
  ...rest
}) => {    

  return (
    <div className={`col-span-${colSpan}`}>
      <div className="flex items-center justify-between ">
        <label
          htmlFor={name}
          className="block text-sm/6 font-medium text-gray-900"
        >
          {required && <span className="text-red-400">*</span>}
          {label}
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
        <div className={` ${error[name] ? 'outline-red-400' : 'outline-gray-300'} flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1  has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-gray-600`}>
          <div className="mr-2 shrink-0 text-base text-gray-500 select-none sm:text-sm/6 size-5">
            {Icon && Icon}
          </div>
         

          <input
            id={name}
            name={name}
            type={type}
            value={data[name] ? data[name] : ""}
            required={required}
            onChange={onChange}
            autoComplete='off'
            placeholder={placeholder}
            {...rest}
            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
            />
          
            <div className="hidden grid shrink-0 grid-cols-1 focus-within:relative">
                <select
                id="currency"
                name="currency"
                aria-label="Currency"
                className="col-start-1 row-start-1 w-full appearance-none rounded-md py-1.5 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6"
                >
                <option>USD</option>
                <option>CAD</option>
                <option>EUR</option>
                </select>
                {/* <ChevronDownIcon
                aria-hidden="true"
                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                /> */}
            </div>
        </div>
        
      </div>
      
        {error[name] && <span className="block text-sm/6 font-medium text-red-400 mt-1">{error[name]}</span>}
    </div>
  );
  
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  variant: PropTypes.string,
  data: PropTypes.object,
};
export default React.memo(Input);
