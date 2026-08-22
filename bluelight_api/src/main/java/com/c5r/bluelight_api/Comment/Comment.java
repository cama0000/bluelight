package com.c5r.bluelight_api.Comment;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = Comment.TABLE_NAME)
public class Comment {
    public static final String TABLE_NAME = "COMMENTS";

    @Id
    @SequenceGenerator(
            name = "comment_id_seq",
            sequenceName = "comment_id_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "comment_id_seq"
    )
    private Long id;

    @Column(
            name = "QUESTION_ID",
            nullable = false
    )
    private Long questionId;

    @Column(
            name = "USER_ID",
            nullable = false
    )
    private Long userId;

    @Column(
            name = "USERNAME",
            nullable = false
    )
    private String username;

    @Column(
            name = "CONTENT",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String content;

    @Column(
            name = "CREATED_AT",
            nullable = false
    )
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(
            name = "UPDATED_AT"
    )
    private LocalDateTime updatedAt = LocalDateTime.now();

    public Comment(){
    }

    public Comment(long questionId, long userId, String username, String content) {
        this.questionId = questionId;
        this.userId = userId;
        this.username = username;
        this.content = content;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
}