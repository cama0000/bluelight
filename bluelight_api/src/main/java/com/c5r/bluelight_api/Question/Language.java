package com.c5r.bluelight_api.Question;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum Language {
    JAVA("Java"),
    JAVASCRIPT("JavaScript"),
    TYPESCRIPT("TypeScript"),
    CPP("C++"),
    C("C"),
    PYTHON("Python");

    private final String value;

    Language(String value) {
        this.value = value;
    }

    @JsonCreator
    public static Language fromDisplayName(String value) {
        for (Language language : Language.values()) {
            if (language.value.equalsIgnoreCase(value)) {
                return language;
            }
        }
        throw new IllegalArgumentException("Unknown Language: " + value);
    }
}
