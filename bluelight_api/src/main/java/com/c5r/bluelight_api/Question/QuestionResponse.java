package com.c5r.bluelight_api.Question;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class QuestionResponse {
    private int id;
    private String title;
    private String prompt;
    private Category category;
    private Difficulty difficulty;
    private QuestionType type;
    private List<String> answerChoices;
    private Integer answerIndex;
    private int points;
    private String freeResponseAnswer;
    private String explanation;
    private String codeSnippet;
    private Language language;
    private int likes;
    private int dislikes;

    @JsonProperty(value="isCorrect")
    private boolean isCorrect;

    @JsonProperty(value="isLiked")
    private boolean isLiked;

    @JsonProperty(value="isDisliked")
    private boolean isDisliked;

    @JsonProperty(value="isFavorited")
    private boolean isFavorited;


    public QuestionResponse(Question question, boolean isCorrect, boolean isLiked, boolean isDisliked, boolean isFavorited) {
        this.id = question.getId();
        this.title = question.getTitle();
        this.prompt = question.getPrompt();
        this.category = question.getCategory();
        this.difficulty = question.getDifficulty();
        this.type = question.getType();
        this.answerChoices = question.getAnswerChoices();
        this.answerIndex = question.getAnswerIndex();
        this.points = question.getPoints();
        this.freeResponseAnswer = question.getFreeResponseAnswer();
        this.explanation = question.getExplanation();
        this.codeSnippet = question.getCodeSnippet();
        this.language = question.getLanguage();
        this.likes = question.getLikes();
        this.dislikes = question.getDislikes();
        this.isCorrect = isCorrect;
        this.isLiked = isLiked;
        this.isDisliked = isDisliked;
        this.isFavorited = isFavorited;
    }

    public Integer getId() { return id; }
    public String getTitle() { return title; }
    public String getPrompt() { return prompt; }
    public Category getCategory() { return category; }
    public Difficulty getDifficulty() { return difficulty; }
    public QuestionType getType() { return type; }
    public List<String> getAnswerChoices() { return answerChoices; }
    public Integer getAnswerIndex() { return answerIndex; }
    public int getPoints() { return points; }
    public String getExplanation() { return explanation; }
    public String getFreeResponseAnswer() { return freeResponseAnswer; }
    public String getCodeSnippet() { return codeSnippet; }
    public Language getLanguage() { return language; }
    public int getLikes() { return likes; }
    public int getDislikes() { return dislikes; }
    public boolean isCorrect() { return isCorrect; }
    public boolean isLiked() { return isLiked; }
    public boolean isDisliked() { return isDisliked; }
    public boolean isFavorited() { return isFavorited; }


    @Override
    public String toString() {
        return "QuestionResponse{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", prompt='" + prompt + '\'' +
                ", category=" + category +
                ", difficulty=" + difficulty +
                ", type=" + type +
                ", answerChoices=" + answerChoices +
                ", answerIndex=" + answerIndex +
                ", points=" + points +
                ", isCorrect=" + isCorrect +
                '}';
    }



}
