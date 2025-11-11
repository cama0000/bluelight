package com.c5r.bluelight_api.QuestionLike;

public class VoteRequest {
    private String userId;
    private int questionId;
    private boolean isLiked;

    public String getUserId() {
        return this.userId;
    }

    public int getQuestionId() {
        return this.questionId;
    }

    public boolean getIsLiked() {
        return this.isLiked;
    }
}
