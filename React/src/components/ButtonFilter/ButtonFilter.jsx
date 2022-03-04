import "/src/common-css/button.css";

const ButtonFilter = (props) => {
    return (
        <button className={"btn " + props.className} onClick={() => props.onClick()}>
            {props.children}
        </button>
    );
};

export default ButtonFilter;
