import React, {useId} from 'react'

function Select({
    options, // Its an array usually.
    label,
    className,
    ...props
}, ref) {
    const id = useId();

    return (
      <div className=" w-full">
        {label && (
          <label htmlFor={id} className="">
            <select
              {...props}
              id={id}
              ref={ref}
              className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            >
                {/* We need to give options to 'select' */}
                {/* see 4:58 -> We don't directly write "options.map" else we map the options conditionally; As follows:- */}
                {options?.map((option) => (
                    <option key={option} value={option} >
                        {option}
                    </option>
                ))}
            </select>
          </label>
        )}
      </div>
    );
}

// 6:24 -> But we did not write the "forwardRef()" hook. 
// But instead of wrapping the function in forwardRef, we can also wrap the export of it as like follows :-
// export default Select; Write it as:-
export default React.forwardRef(Select);
