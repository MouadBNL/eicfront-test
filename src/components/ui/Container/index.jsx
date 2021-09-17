import classNames from "classnames"

function Container({className, children, ...props}) {
    return (
        <div 
        className={classNames(className, "container mx-auto px-4")} 
        {...props}
        >
            {children}
        </div>
    )
}

export default Container
