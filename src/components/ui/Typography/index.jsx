import classNames from "classnames"

function Typography({tag, className, textSize, weight, children, ...props}) {
    const TagName = tag
    return (
        <TagName 
        className={classNames(`text-${textSize} font-${weight}`, className)} 
        {...props}
        >
            {children}
        </TagName>
    )
}



Typography.defaultProps = {
    'tag': 'h1',
    'textSize': '3xl',
    'weight': 'extrabold'
}

export default Typography
