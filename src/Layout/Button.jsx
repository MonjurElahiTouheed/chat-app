
const Button = ({children, className}) => {
    return (
        <div className={`bg-primary text-white rounded-[5px] font-primary font-semibold text-xl ${className}`}>
            {children}
        </div>
    );
};

export default Button;