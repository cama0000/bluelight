package com.c5r.bluelight_api.UserQuestion;

public class AnswerRequest {
    private String userId;
    private Long questionId;
    private boolean isCorrect;

    public String getUserId() {
        return this.userId;
    }

    public Long getQuestionId() {
        return this.questionId;
    }

    public boolean getIsCorrect() {
        return this.isCorrect;
    }
}