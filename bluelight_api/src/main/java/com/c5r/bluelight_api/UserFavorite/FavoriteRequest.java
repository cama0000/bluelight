package com.c5r.bluelight_api.UserFavorite;

public class FavoriteRequest {
    private String userId;
    private int questionId;

    public String getUserId() {
        return this.userId;
    }

    public int getQuestionId() {
        return this.questionId;
    }
}
