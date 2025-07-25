import React from "react";
import { useRouter } from 'next/navigation';
import PropTypes from "prop-types";
import Button from "../../Button/Index";
import { cn } from "@/lib/utils";


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
    SubmitButtonName = "שליחת טופס",
    ResetButtonName = "איפוס",
    ...rest
  }) => {
    const { className } = rest;

    const gridColsClasses = {
      1: 'grid-cols-1 md:grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-4',
      5: 'grid-cols-1 md:grid-cols-5',
      6: 'grid-cols-1 md:grid-cols-6',
      7: 'grid-cols-1 md:grid-cols-7',
      8: 'grid-cols-1 md:grid-cols-8',
      9: 'grid-cols-1 md:grid-cols-9',
      10: 'grid-cols-1 md:grid-cols-10',
      11: 'grid-cols-1 md:grid-cols-11',
      12: 'grid-cols-1 md:grid-cols-12'
    };

  return (
    <div className={cn(`flex min-h-full flex-1 flex-col justify-center p-6`, className)}>
            {title && (
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="text-center text-2xl/9 tracking-tight text-gray-900">
                {title}
              </h2>
              </div>
            )}
        <div className="mt-5 sm:mx-auto sm:w-full ">
          <form className="space-y-6">
            <div className={`grid ${gridColsClasses[spacing] || 'grid-cols-1 md:grid-cols-1'} gap-4`}>
            {children}
            </div>
            <div className="flex justify-center gap-2">
                <Button onClick={onSubmit} disabled={!!onChange()}>{SubmitButtonName}</Button>
                {onReset && (
                    <Button onClick={onReset} className={`bg-red-500 hover:bg-red-600`} >{ResetButtonName}</Button>
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
    SubmitButtonName: PropTypes.string.isRequired,
    ResetButtonName: PropTypes.string.isRequired
  };
export default React.memo(Form);