import { useState, useEffect } from "react";
import {
    USERS
} from "./data";
import {
    buildComments
} from "./marshaller";

const commentsLocal = window.localStorage.getItem("commentsSource");
const COMMENTS_LOCAL = commentsLocal ? JSON.parse(commentsLocal) : {};
const usersLocal = window.localStorage.getItem("userSource");
const USERS_LOCAL = usersLocal ? JSON.parse(usersLocal) : USERS;

const useStore = ({
    userId
}) => {
    const [commentsSource, setCommentsSource] = useState(COMMENTS_LOCAL);
    const [userSource, setUserSource] = useState(USERS_LOCAL);
    const [user, setUser] = useState();
    const [comments, setComments] = useState();
    const [selectedUser, setSelectedUser] = useState(userId);
    useEffect(() => {
        const user = userSource[selectedUser];
        setUser(user);
        buildAndSetComments();
    }, []);

    useEffect(() => {
        if (user?.comments) buildAndSetComments();
    }, [commentsSource]);

    useEffect(() => {
        const user = userSource[selectedUser];
        setUser(user);
        buildAndSetComments();
    }, [userSource, selectedUser]);
    
    useEffect(() => {
        window.addEventListener('beforeunload', handleSaveToLS);
    
        return () => {
          window.removeEventListener('beforeunload', handleSaveToLS);
        };
    });
    const buildAndSetComments = () => {
        const allComments = Object.values(userSource).map((localUser) => {
            return buildComments(localUser.comments, commentsSource)
        });
        setComments(allComments.flat(2));
    };
    const handleSaveToLS = () => {
        window.localStorage.setItem("commentsSource", JSON.stringify(commentsSource));
        window.localStorage.setItem("userSource", JSON.stringify(userSource));
    };
    const handleCommentAdd = (text, commentId) => {
        const id = + new Date();
        const ts = new Date();
        const formattedDate = `${ts.toLocaleDateString()}, ${ts.toLocaleTimeString()}`;
        const comment = {
            id: id,
            user: user.id,
            text,
            isActive: true,
            replies: [],
            parentId: commentId ?? null,
            timestamp: + ts,
            formattedDate: formattedDate,
        };
        // update main Data
        let localData = {
            ...commentsSource,
            [id]: {
                ...comment,
            }
        };
        if (commentId) {
            localData[commentId].replies.push(id);
        } else {
            const uSource = {
                ...userSource,
                [user.id]: {
                    ...user,
                    comments: [
                        ...user.comments,
                        id,
                    ]
                },
            };
            setUserSource(uSource);
        }
        setCommentsSource(localData);
    };
    const handleCommentDelete = (commentId, isRoot) => {
        let localComments = { ...commentsSource };
        const deleteComment = (id) => {
            localComments[id].isActive = false;
            if (localComments[id].replies.length === 0) return [];
            localComments[id].replies.forEach((replyId) => {
                deleteComment(replyId);
            });
            localComments[commentId].replies=[];
        }
        deleteComment(commentId);
        const parentId = localComments[commentId].parentId;
        // remove the reference from parent
        if (parentId) {
            const replies = [...localComments[parentId].replies];
            const index = replies.findIndex((item) => item === commentId);
            if (index > -1) {
                replies.splice(index, 1);
            }
            localComments[localComments[commentId].parentId].replies = replies;
            setCommentsSource(localComments);
        }
        if (isRoot) {
            const comments = [...user.comments];
            const index = comments.findIndex((item) => item === commentId);
            if (index > -1) {
                comments.splice(index, 1);
            }
            // remove it from user comments
            const updatedUser = {
                [user.id]: {
                    ...user,
                    comments,
                }
            };
            setUserSource({
                ...userSource,
                ...updatedUser,
            });
        }
        
    }
    const handleCommentEdit = (commentId, text) => {
        let localData = {
            ...commentsSource,
            [commentId]: {
                ...commentsSource[commentId],
                text,
            }
        };
        setCommentsSource(localData);
    }
    return {
        user,
        comments,
        handleCommentAdd,
        handleCommentDelete,
        handleCommentEdit,
        userSource,
        setSelectedUser,
        selectedUser,
    };
};

export default useStore;