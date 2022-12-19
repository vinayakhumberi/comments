
export const buildComments = (comments, commentsSource) => {
    if (comments.length === 0) return [];
    return comments.map((comment) => {
        const reply = commentsSource[comment];
        const ts = new Date(Number(reply.timestamp));
        return {
            ...reply,
            formattedDate: `${ts.toLocaleDateString()}, ${ts.toLocaleTimeString()}`,
            replies: buildComments(reply.replies, commentsSource)
        }
    });
}

export default {
    buildComments,
};
