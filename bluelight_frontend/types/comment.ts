export interface Comment{
    id: number,
    userId: number,
    questionId: number,
    username: string,
    content: string,
    createdAt: Date,
    updateTime: Date
}

export interface CommentRequest{
    questionId: number,
    content: string,
}