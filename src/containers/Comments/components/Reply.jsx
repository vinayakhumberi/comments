import "../style.css";
import CommentBox from "./CommentBox";
import { USERS } from "../../../utils/data";
import { useState } from "react";

const Replies = ({reply, userId, onReply, onDelete, onEdit}) => {
    const [showReply, setShowReply] = useState(false);
    const [edit, setEdit] = useState(false);
    const handleOnReply = (value) => {
        if (!value) return;
        onReply(value, reply.id);
        setShowReply(false);
    };
    const handleOnDelete = () => {
        onDelete(reply.id, !!!reply.parentId);
    };
    const handleOnEdit = () => {
        setEdit(true);
    }
    const handleOnEditComplete = (value) => {
        onEdit(reply.id, value);
        setShowReply(false);
        setEdit(false);
    };
    return (
        <div className="reply-container">
            <div className="reply-container__left">
                <div>
                    <div className="reply-container__left--icon">
                        {USERS[reply.user].name[0]   }
                    </div>
                </div>
                <div>
                    <div className="reply-container__left--message">
                        {edit?
                            <CommentBox defaultValue={reply.text} onSubmit={handleOnEditComplete} isReply={true} />
                        : reply.text}
                    </div>
                    <div className="reply-container__left--label">
                    {USERS[reply.user].name} | {reply.formattedDate}
                    </div>
                    {showReply && <div>
                        <CommentBox onSubmit={handleOnReply} isReply={true} />
                    </div>}
                </div>
            </div>
            <div className="reply-container__right" >
                {reply.user === userId && <button onClick={handleOnEdit}> <img src="https://cdn-icons-png.flaticon.com/512/181/181540.png" alt="edit" /></button>}
                {reply.user === userId && <button onClick={handleOnDelete}> <img src="https://cdn-icons-png.flaticon.com/512/5028/5028066.png" alt="delete" /> </button>}
                <button onClick={() => setShowReply(!showReply)}> <img src="https://cdn-icons-png.flaticon.com/512/7071/7071294.png" alt="reply" /></button>
            </div>
        </div>
    );
};

export default Replies;