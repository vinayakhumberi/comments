import "./style.css";
import PropTypes from 'prop-types';

const TextBox = ({
    onChange,
    value
}) => {
    return (
        <textarea
            value={value}
            className="textarea"
            onChange={onChange}
            placeholder="Enter value here"
        />
    )
};

TextBox.propTypes = {
    onChange: PropTypes.func,
};

export default TextBox;