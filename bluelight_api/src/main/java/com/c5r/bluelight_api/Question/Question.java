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
    private Integer answerIndex;

    @Column(name = "FREE_RESPONSE_ANSWER", columnDefinition = "TEXT")
    private String freeResponseAnswer;

    @Column(
            name = "POINTS"
    )
    private int points;

    @Column(
            name = "EXPLANATION",
            columnDefinition = "TEXT"
    )
    private String explanation;

    @Column(
            name = "CODE_SNIPPET",
            columnDefinition = "TEXT"
    )
    private String codeSnippet;

    @Column(
            name = "LANGUAGE"
    )
    @Enumerated(EnumType.STRING)
    private Language language;

    @Column(
            name = "LIKES",
            nullable = false,
            columnDefinition = "INT DEFAULT 0"
    )
    private int likes;

    @Column(
            name = "DISLIKES",
            nullable = false,
            columnDefinition = "INT DEFAULT 0"
    )
    private int dislikes;

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public void setDislikes(int dislikes) {
        this.dislikes = dislikes;
    }

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

    public Integer getAnswerIndex() {
        return this.answerIndex;
    }

    public int getPoints() {
        return this.points;
    }

    public String getFreeResponseAnswer() {
        return this.freeResponseAnswer;
    }

    public String getExplanation() {
        return this.explanation;
    }

    public String getCodeSnippet() {
        return this.codeSnippet;
    }

    public Language getLanguage() {
        return this.language;
    }

    public int getLikes() {
        return this.likes;
    }
    public int getDislikes() {
        return this.dislikes;
    }

}
