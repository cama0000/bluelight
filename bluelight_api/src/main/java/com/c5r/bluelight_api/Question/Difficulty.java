package com.c5r.bluelight_api.Question;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum Difficulty {
    EASY("Easy"),
    MEDIUM("Medium"),
    HARD("Hard"),
    FAANG("FAANG");

    private final String value;

    Difficulty(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    @JsonCreator
    public static Difficulty fromDisplayName(String value) {
        for (Difficulty difficulty : Difficulty.values()) {
            if (difficulty.value.equalsIgnoreCase(value)) {
                return difficulty;
            }
        }
        throw new IllegalArgumentException("Unknown category: " + value);
    }
}
