package com.c5r.bluelight_api.Question;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum QuestionType {
    MULTIPLE_CHOICE("Multiple Choice"),
    FREE_RESPONSE("Free Response"),
    CODING("Coding");

    private final String value;

    QuestionType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    @JsonCreator
    public static QuestionType fromDisplayName(String value) {
        for (QuestionType questionType : QuestionType.values()) {
            if (questionType.value.equalsIgnoreCase(value)) {
                return questionType;
            }
        }
        throw new IllegalArgumentException("Unknown QuestionType: " + value);
    }
}
