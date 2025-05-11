import React from "react";
import { useRouter } from 'next/navigation';
import PropTypes from "prop-types";
import Button from "../../Button/Index";


const Form = ({
    title = "",
    onSubmit,
    onReset = null,
    onChange,
    to,
    color,
    spacing = 1,
    styles,
    children,
    SubmitButtonName = "שליחת טופס"
  }) => {
    

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 tracking-tight text-gray-900">
            {title}
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div className={`grid grid-cols-1 md:grid-cols-${spacing} gap-4`}>
            {children}
            </div>
            <div className="flex justify-center">
                <Button onClick={onSubmit} disabled={!!onChange()}>{SubmitButtonName}</Button>
                {onReset && (
                    <Button onClick={onReset} >{'איפוס'}</Button>
                )}
            </div>
          </form>
        </div>
    </div>
  )
}

Form.propTypes = {
    children: PropTypes.node.isRequired,
    onSubmit: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    spacing: PropTypes.number.isRequired,
    onReset: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    styles: PropTypes.object.isRequired,
    SubmitButtonName: PropTypes.string.isRequired
  };
export default React.memo(Form);