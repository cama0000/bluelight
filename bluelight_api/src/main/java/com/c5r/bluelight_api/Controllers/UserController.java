package com.c5r.bluelight_api.Controllers;

import com.c5r.bluelight_api.Firebase.FirebaseService;
import com.c5r.bluelight_api.Question.Question;
import com.c5r.bluelight_api.Question.QuestionService;
import com.c5r.bluelight_api.User.Role;
import com.c5r.bluelight_api.User.User;
import com.c5r.bluelight_api.User.UserService;
import com.c5r.bluelight_api.UserQuestion.AnswerRequest;
import com.c5r.bluelight_api.UserQuestion.UserQuestion;
import com.c5r.bluelight_api.UserQuestion.UserQuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

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

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody User userBody) {

        try{
            String idToken = authHeader.replace("Bearer ", "");
            firebaseService.verifyToken(idToken);

            Optional<User> checkUser = userService.findByFirebaseUid(userBody.getFirebaseUid());
            if(checkUser.isPresent()) {
                return ResponseEntity.ok(checkUser.get());
            }

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

    @PutMapping("/answerQuestion")
    public ResponseEntity<?> answerQuestion(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody AnswerRequest requestBody){
        try{
            String idToken = authHeader.replace("Bearer ", "");
            firebaseService.verifyToken(idToken);

            Optional<User> checkUser = userService.findByFirebaseUid(requestBody.getUserId());

            if(checkUser.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("User not found");
            }

            User user = checkUser.get();

            Optional<UserQuestion> checkUserQuestion = userQuestionService.findByUserIdAndQuestionId(user.getId(), requestBody.getQuestionId());
            Optional<Question> checkQuestion = questionService.findById(requestBody.getQuestionId());

            if(checkQuestion.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Question not found");
            }

            Question question = checkQuestion.get();

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

            userService.save(user);

            return ResponseEntity.ok(user);
        }
        catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid Firebase token: " + e.getMessage());
        }

    }
}
