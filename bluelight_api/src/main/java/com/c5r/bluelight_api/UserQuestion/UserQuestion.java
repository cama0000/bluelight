package com.c5r.bluelight_api.UserQuestion;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(
        name = UserQuestion.TABLE_NAME
)
public class UserQuestion {

    public static final String TABLE_NAME = "USER_QUESTIONS";

    @Id
    @SequenceGenerator(
            name = "user_question_id_seq",
            sequenceName = "user_question_id_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "user_question_id_seq"
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
            name = "WAS_CORRECT",
            nullable = false,
            columnDefinition = "BOOLEAN DEFAULT FALSE"
    )
    private boolean wasCorrect = false;

    @Column(
            name = "POINTS_EARNED",
            nullable = false,
            columnDefinition = "INT DEFAULT 0"
    )
    private int pointsEarned = 0;

    public Integer getId() {
        return this.id;
    }

    public Integer getUserId() {
        return this.userId;
    }

    public Integer getQuestionId() {
        return this.questionId;
    }

    public boolean getWasCorrect() {
        return this.wasCorrect;
    }

    public int getPointsEarned() {
        return this.pointsEarned;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public void setQuestionId(Integer questionId) {
        this.questionId = questionId;
    }

    public void setWasCorrect(boolean wasCorrect) {
        this.wasCorrect = wasCorrect;
    }

    public void setPointsEarned(int pointsEarned) {
        this.pointsEarned = pointsEarned;
    }
}
