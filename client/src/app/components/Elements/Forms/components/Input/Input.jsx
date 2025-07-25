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

  const colSpanClasses = {
    1: 'col-span-full md:col-span-1',
    2: 'col-span-full md:col-span-2',
    3: 'col-span-full md:col-span-3',
    4: 'col-span-full md:col-span-4',
    5: 'col-span-full md:col-span-5',
    6: 'col-span-full md:col-span-6',
    7: 'col-span-full md:col-span-7',
    8: 'col-span-full md:col-span-8',
    9: 'col-span-full md:col-span-9',
    10: 'col-span-full md:col-span-10',
    11: 'col-span-full md:col-span-11',
    12: 'col-span-full md:col-span-12'
  };

  return (
    <div className={colSpanClasses[colSpan] || 'col-span-1'}>
      <div className="flex items-center justify-between ">
        <label
          htmlFor={name}
          className="block text-sm/6 font-medium text-gray-900"
        >
          {required && <span className="text-red-400">*</span>}
          {label}
          </label>
        
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
