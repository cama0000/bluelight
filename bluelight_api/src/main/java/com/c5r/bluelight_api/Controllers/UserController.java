package com.c5r.bluelight_api.Controllers;

import com.c5r.bluelight_api.Firebase.FirebaseService;
import com.c5r.bluelight_api.Question.Question;
import com.c5r.bluelight_api.Question.QuestionService;
import com.c5r.bluelight_api.User.Role;
import com.c5r.bluelight_api.User.UpdateProfileRequest;
import com.c5r.bluelight_api.User.User;
import com.c5r.bluelight_api.User.UserService;
import com.c5r.bluelight_api.UserQuestion.AnswerRequest;
import com.c5r.bluelight_api.UserQuestion.UserQuestion;
import com.c5r.bluelight_api.UserQuestion.UserQuestionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private FirebaseService firebaseService;

    @Autowired
    private QuestionService questionService;

    @Autowired
    private UserQuestionService userQuestionService;

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User userBody) {
        String firebaseUid = (String) SecurityContextHolder.getContext()
                                        .getAuthentication()
                                        .getPrincipal();

        return userService.findByFirebaseUid(firebaseUid)
                .map(ResponseEntity::ok)
                .orElseGet(() -> {
                    User user = new User();
                    user.setFirebaseUid(userBody.getFirebaseUid());
                    user.setUsername(userBody.getUsername());
                    user.setEmail(userBody.getEmail());
                    user.setBio("");
                    user.setProfilePicUrl(userBody.getProfilePicUrl());
                    user.setRole(Role.USER);

                    return ResponseEntity.ok(userService.save(user));
                });
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/me")
    public ResponseEntity<User> getMe() {
        String firebaseUid = (String) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();

        return userService.findByFirebaseUid(firebaseUid)
                .map(ResponseEntity::ok)
                .orElseThrow();
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/updateProfile")
    public ResponseEntity<User> updateProfile(@RequestBody UpdateProfileRequest updateProfileRequest) {
        String firebaseUid = (String) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();

        return userService.findByFirebaseUid(firebaseUid)
                .map(user -> {
                    user.setProfilePicUrl(updateProfileRequest.getProfilePicUrl());
                    user.setUsername(updateProfileRequest.getUsername());
                    user.setBio(updateProfileRequest.getBio());

                    return ResponseEntity.ok(userService.save(user));
                }).orElseThrow();
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/answerQuestion")
    public ResponseEntity<?> answerQuestion(@RequestBody AnswerRequest requestBody){
        String firebaseId = (String) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();

        final User user = userService.findByFirebaseUid(firebaseId).orElseThrow();

        Optional<UserQuestion> checkUserQuestion = userQuestionService.findByUserIdAndQuestionId(user.getId(), requestBody.getQuestionId());
        Question question = questionService.findById(requestBody.getQuestionId()).orElseThrow();

        if(checkUserQuestion.isPresent()) {
            UserQuestion userQuestion = checkUserQuestion.get();

            if(userQuestion.getWasCorrect()){
                return ResponseEntity.ok(user);
            }

            if(requestBody.getIsCorrect()){
                int points = user.getPoints() + (question.getPoints() / 2);

                userQuestion.setWasCorrect(true);
                user.setPoints(points);
                userQuestion.setPointsEarned(question.getPoints() / 2);
            }

            userQuestionService.save(userQuestion);
        }
        else{
            UserQuestion userQuestion = new UserQuestion();
            userQuestion.setQuestionId(requestBody.getQuestionId());
            userQuestion.setUserId(user.getId());

            if(requestBody.getIsCorrect()){
                int points = user.getPoints() + question.getPoints();

                userQuestion.setWasCorrect(true);
                user.setPoints(points);
                userQuestion.setPointsEarned(question.getPoints());
            }

            userQuestionService.save(userQuestion);
        }

        return ResponseEntity.ok(userService.save(user));
    }
}
