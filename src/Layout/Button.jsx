
const Button = ({children, className, onClick, isDisabled}) => {
    return (
        <div disabled={isDisabled} onClick={onClick} className={`bg-primary text-white rounded-[5px] font-primary font-semibold text-xl ${className}`}>
            {children}
        </div>
    );
};

export default Button;