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
    private Long id;

    @Column(
            name = "USER_ID",
            nullable = false
    )
    private Long userId;

    @Column(
            name = "QUESTION_ID",
            nullable = false
    )
    private Long questionId;

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

    public Long getId() {
        return this.id;
    }

    public Long getUserId() {
        return this.userId;
    }

    public Long getQuestionId() {
        return this.questionId;
    }

    public boolean getWasCorrect() {
        return this.wasCorrect;
    }

    public int getPointsEarned() {
        return this.pointsEarned;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setQuestionId(Long questionId) {
        this.questionId = questionId;
    }

    public void setWasCorrect(boolean wasCorrect) {
        this.wasCorrect = wasCorrect;
    }

    public void setPointsEarned(int pointsEarned) {
        this.pointsEarned = pointsEarned;
    }
}
