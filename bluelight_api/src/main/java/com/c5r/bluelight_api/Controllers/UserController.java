package com.c5r.bluelight_api.Controllers;

import com.c5r.bluelight_api.Firebase.FirebaseService;
import com.c5r.bluelight_api.User.Role;
import com.c5r.bluelight_api.User.User;
import com.c5r.bluelight_api.User.UserService;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private FirebaseService firebaseService;

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody User userBody) {

        try{
            String idToken = authHeader.replace("Bearer ", "");
            firebaseService.verifyToken(idToken);

//            User user = new User(userBody.getFirebaseUid(), userBody.getEmail(), userBody.getUsername(), userBody.getBio(), Role.USER);
            User user = new User();
            user.setFirebaseUid(userBody.getFirebaseUid());
            user.setUsername(userBody.getUsername());
            user.setEmail(userBody.getEmail());
            user.setBio("");
            user.setRole(Role.USER);

            return ResponseEntity.ok(userService.save(user));
        }
        catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid Firebase token: " + e.getMessage());
        }

    }
}
