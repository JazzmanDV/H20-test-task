import { memo } from "react";

import "/src/common-css/button.css";

const ButtonFilter = memo((props) => {
    return (
        <button className={"btn " + props.className} onClick={props.onClick}>
            {props.children}
        </button>
    );
});

export default ButtonFilter;
