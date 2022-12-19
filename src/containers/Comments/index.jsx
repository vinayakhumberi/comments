import useStore from "../../utils/store";
import Reply from "./components/Reply";
import CommentBox from "./components/CommentBox";
import './style.css';

function Comments() {
  const {
    comments,
    handleCommentAdd,
    handleCommentDelete,
    handleCommentEdit,
    userSource,
    setSelectedUser,
    selectedUser,
   } = useStore({
    userId: "VIN957"
  });
  const buildComments = (replies) => {
    if (replies.length === 0) return null;
    return replies.map((reply) => {
        return <div className={"main-container__content--output-subs"} key={reply.id}>
            <Reply
                reply={reply}
                userId={selectedUser}
                onReply={handleOnSubmit}
                onDelete={handleOnDelete}
                onEdit={handleOnEdit}
            />
            {buildComments(reply.replies)}
        </div>
    })
  };
  const handleOnSubmit = (value, commentId) => {
    handleCommentAdd(value, commentId);
  };
  const handleOnDelete = (commentId, isRoot) => {
    handleCommentDelete(commentId, isRoot)
  };
  const handleOnEdit = (commentId, text) => {
    handleCommentEdit(commentId, text)
  }
  return (
    <div className="main-container">
      <div className='main-container__title'>
        <h1>Comment Widget</h1>
        <p><b>Logged-in User: </b>
            <select name="users" value={selectedUser} onChange={(event) => {setSelectedUser(event.target.value)}}>
                {
                    Object.values(userSource).map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))
                }
            </select>
        </p>
        
      </div>
      <div className='main-container__content'>
        <CommentBox onSubmit={handleOnSubmit}  />
        <hr />
        {comments && <div className='main-container__content--output'>
            {buildComments(comments)}
        </div>}
      </div>
    </div>
  );
}

export default Comments;
