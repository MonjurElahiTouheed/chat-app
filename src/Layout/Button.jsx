
const Button = ({children, className, onClick}) => {
    return (
        <div onClick={onClick} className={`bg-primary text-white rounded-[5px] font-primary font-semibold text-xl ${className}`}>
            {children}
        </div>
    );
};

export default Button;