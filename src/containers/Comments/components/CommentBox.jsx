import { useState } from "react";
import Button from "../../../components/Button";
import TextBox from "../../../components/TextBox";
import '../style.css';



function CommentBox({
    onSubmit,
    isReply,
    defaultValue = ""
}) {
    const [value, setValue] = useState(defaultValue);
    const [error, setError] = useState("");
    const handleOnSubmit= () => {
        if (!value || error) return;
        onSubmit(value);
        setValue("");
    };
    const handleOnChange = (event) => {
        const input = event.target.value;
        if (input.length >= 0 && input.length < 256) {
            if (error) setError("");
        } else {
            setError("Reached max characters allowed");
        }
        setValue(event.target.value);
    };
    return (
        <div className={"main-container__content--input " + (isReply ? "main-container__content--input-reply" : "")}>
            <div>
                <TextBox value={value} onChange={handleOnChange} />
                {error && <p>{error}</p>}
            </div>
            <div>
                <Button onClick={handleOnSubmit} disabled={!value || !!error}>
                    {isReply ? "Reply" : "Add"}
                </Button>
            </div>
        </div>
    );
  }
  
  export default CommentBox;
  