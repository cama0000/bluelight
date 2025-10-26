package com.c5r.bluelight_api.Question;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum Category {
    ALGORITHMS("Algorithms"),
    DATA_STRUCTURES("Data Structures"),
    DATABASES("Databases"),
    OPERATING_SYSTEMS("Operating Systems"),
    NETWORKING("Networking"),
    WEB_DEVELOPMENT("Web Development"),
    LANGUAGES("Languages");

    private final String value;

    Category(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    @JsonCreator
    public static Category fromDisplayName(String value) {
        for (Category category : Category.values()) {
            if (category.value.equalsIgnoreCase(value)) {
                return category;
            }
        }
        throw new IllegalArgumentException("Unknown category: " + value);
    }
}