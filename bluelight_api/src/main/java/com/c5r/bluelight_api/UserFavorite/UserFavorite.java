package com.c5r.bluelight_api.UserFavorite;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(
        name = UserFavorite.TABLE_NAME
)
public class UserFavorite {
    public static final String TABLE_NAME = "USER_FAVORITE";

    @Id
    @SequenceGenerator(
            name = "user_favorite_id_seq",
            sequenceName = "user_favorite_id_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "user_favorite_id_seq"
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


    public Integer getId() {
        return this.id;
    }

    public Integer getUserId() {
        return this.userId;
    }

    public Integer getQuestionId() {
        return this.questionId;
    }

    public UserFavorite() {
    }

    public UserFavorite(Integer userId, Integer questionId) {
        this.userId = userId;
        this.questionId = questionId;
    }
}
