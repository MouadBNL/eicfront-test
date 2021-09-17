import classNames from "classnames"


function Button({size, bgColor, bgHoverColor, textColor, children, className,...props}) {

    return (
        <button 
        className={classNames(
            `block bg-${bgColor} hover:bg-${bgHoverColor} text-${textColor} font-bold transition disabled:opacity-50 disabled:cursor-not-allowed`,
            {
                "text-xs py-1 px-2 rounded shadow": size === 'sm',
                "text-base py-2 px-4 rounded-md shadow-md": size === 'md',
                "text-xl py-3 px-6 rounded-lg shadow-lg": size === 'lg',
            }, className
        )} 
        {...props} 
        >
            {children}
        </button>
    )
}

Button.defaultProps = {
    size: 'md',
    bgColor: 'blue-500',
    bgHoverColor: 'blue-600',
    textColor: 'white',
}

export default Button
