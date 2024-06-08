
const MyComponent = ({children} : {children: React.ReactNode}) => {
    return (
        <div className={"Layout"}>
            {children}
        </div>
    );
};

export default MyComponent;
