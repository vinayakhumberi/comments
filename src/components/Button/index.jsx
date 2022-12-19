import React from "react";
import "./style.css";
import PropTypes from 'prop-types';

const Button = ({
    children,
    onClick,
    disabled
}) => {
    return (
        <button disabled={disabled} className="button" onClick={onClick}>
            {children}
        </button>
    )
};

Button.propTypes = {
    onClick: PropTypes.func,
};

export default Button;