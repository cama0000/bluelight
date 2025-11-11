package com.c5r.bluelight_api.QuestionLike;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(
        name = QuestionLike.TABLE_NAME
)
public class QuestionLike {
    public static final String TABLE_NAME = "QUESTION_LIKES";

    @Id
    @SequenceGenerator(
            name = "question_like_id_seq",
            sequenceName = "question_like_id_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "question_like_id_seq"
    )
    private Integer id;

    @Column(
            name = "USER_ID",
            nullable = false
    )
    private Integer userId;

    @Column(
            name = "QUESTION_ID",
            nullable = false
    )
    private Integer questionId;

    @Column(
            name = "WAS_LIKED",
            nullable = false,
            columnDefinition = "BOOLEAN DEFAULT FALSE"
    )
    private boolean wasLiked = false;

    @Column(
            name = "WAS_DISLIKED",
            nullable = false,
            columnDefinition = "BOOLEAN DEFAULT FALSE"
    )
    private boolean wasDisliked = false;

    public void setId(Integer id) {
        this.id = id;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public void setQuestionId(Integer questionId) {
        this.questionId = questionId;
    }

    public void setWasLiked(boolean wasLiked) {
        this.wasLiked = wasLiked;
    }

    public void setWasDisliked(boolean wasDisliked) {
        this.wasDisliked = wasDisliked;
    }

    public Integer getId() {
        return this.id;
    }

    public Integer getUserId() {
        return this.userId;
    }

    public Integer getQuestionId() {
        return this.questionId;
    }

    public boolean getWasLiked() {
        return this.wasLiked;
    }

    public boolean getWasDisliked() {
        return this.wasDisliked;
    }

    public QuestionLike() {}

    public QuestionLike(Integer userId, Integer questionId, boolean wasLiked, boolean wasDisliked) {
        this.userId = userId;
        this.questionId = questionId;
        this.wasLiked = wasLiked;
        this.wasDisliked = wasDisliked;
    }

}
