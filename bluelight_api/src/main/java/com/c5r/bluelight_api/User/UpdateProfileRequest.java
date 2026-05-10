package com.c5r.bluelight_api.User;

import lombok.Data;

@Data
public class UpdateProfileRequest {
    private String username;
    private String bio;
    private String profilePicUrl;
}
