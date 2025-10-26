package com.c5r.bluelight_api.Question;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = Question.TABLE_NAME)
public class Question {
    public static final String TABLE_NAME = "QUESTIONS";

    @Id
    @SequenceGenerator(
            name = "question_id_seq",
            sequenceName = "question_id_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "question_id_seq"
    )
    private Integer id;

    @Column(
            name = "TITLE",
            nullable = false
    )
    private String title;

    @Column(
            name = "PROMPT",
            columnDefinition = "TEXT"
    )
    private String prompt;

    @Column(
            name = "CATEGORY"
    )
    @Enumerated(EnumType.STRING)
    private Category category;

    @Column(
            name = "DIFFICULTY"
    )
    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    @Column(
            name = "TYPE"
    )
    @Enumerated(EnumType.STRING)
    private QuestionType type;

    @ElementCollection
    @CollectionTable(
            name = "ANSWER_CHOICES",
            joinColumns = @JoinColumn(name = "QUESTION_ID")
    )
    private List<String> answerChoices = new ArrayList<>();

    @Column(
            name = "ANSWER_INDEX"
    )
    private int answerIndex;




    public Integer getId() {
        return this.id;
    }

    public String getTitle() {
        return this.title;
    }

    public String getPrompt() {
        return this.prompt;
    }

    public Difficulty getDifficulty() {
        return this.difficulty;
    }

    public Category getCategory() {
        return this.category;
    }

    public QuestionType getType() {
        return this.type;
    }

    public List<String> getAnswerChoices() {
        return this.answerChoices;
    }

    public int getAnswerIndex() {
        return this.answerIndex;
    }
}
