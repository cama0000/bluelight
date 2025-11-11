package com.c5r.bluelight_api.Controllers;

import com.c5r.bluelight_api.Firebase.FirebaseService;
import com.c5r.bluelight_api.Question.Question;
import com.c5r.bluelight_api.Question.QuestionResponse;
import com.c5r.bluelight_api.Question.QuestionService;
import com.c5r.bluelight_api.QuestionLike.QuestionLike;
import com.c5r.bluelight_api.QuestionLike.QuestionLikeService;
import com.c5r.bluelight_api.QuestionLike.VoteRequest;
import com.c5r.bluelight_api.User.User;
import com.c5r.bluelight_api.User.UserService;
import com.c5r.bluelight_api.UserQuestion.UserQuestion;
import com.c5r.bluelight_api.UserQuestion.UserQuestionService;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/questions")
public class QuestionController {
    @Autowired
    private QuestionService questionService;
    @Autowired
    private FirebaseService firebaseService;
    @Autowired
    private UserQuestionService userQuestionService;
    @Autowired
    private UserService userService;
    @Autowired
    private QuestionLikeService questionLikeService;

    @PostMapping("/save")
    public ResponseEntity<?> saveQuestion(@RequestHeader("Authorization") String authHeader,
                                          @RequestBody Question question) {
        try{
            String idToken = authHeader.replace("Bearer ", "");
            firebaseService.verifyToken(idToken);
            questionService.save(question);

            return ResponseEntity.ok(question);
        }
        catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error saving question: " + e.getMessage());
        }
    }

    @GetMapping("/getAllQuestions")
    public ResponseEntity<?> getAllQuestions(@RequestHeader("Authorization") String authHeader) {
        try{
            String idToken = authHeader.replace("Bearer ", "");
            firebaseService.verifyToken(idToken);

            List<Question> questions = questionService.findAll();
            List<QuestionResponse> questionResponses = new ArrayList<>();


            questions.forEach(question -> {
                Optional<UserQuestion> userQuestion = userQuestionService.findByQuestionId(question.getId());

                boolean isCorrect = false;

                if(userQuestion.isPresent()) {
                    isCorrect = userQuestion.get().getWasCorrect();
                }

                // required to send in isLiked and isDisliked. Just sending in false since we do not display
                // whether the user liked or disliked a question on this page at the moment
                questionResponses.add(new QuestionResponse(question, isCorrect, false, false));
            });

            return ResponseEntity.ok(questionResponses);
        }
        catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching questions: " + e.getMessage());
        }
    }

    @GetMapping("/getQuestionById/{questionId}")
    public ResponseEntity<?> getQuestionById(@RequestHeader("Authorization") String authHeader, @PathVariable Integer questionId) {
        try{
            String idToken = authHeader.replace("Bearer ", "");
            FirebaseToken firebaseToken = firebaseService.verifyToken(idToken);
            String firebaseId = firebaseToken.getUid();

            Optional<User> checkUser = userService.findByFirebaseUid(firebaseId);

            if(checkUser.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("User not found");
            }

            User user = checkUser.get();

            Optional<Question> checkQuestion = questionService.findById(questionId);
            Optional<UserQuestion> checkUserQuestion = userQuestionService.findByUserIdAndQuestionId(user.getId(), questionId);
            Optional<QuestionLike> checkQuestionLike = questionLikeService.findByUserIdAndQuestionId(user.getId(), questionId);

            boolean wasCorrect = false;
            boolean wasLiked = false;
            boolean wasDisliked = false;


            if(checkQuestion.isPresent()){
                Question question = checkQuestion.get();

                if(checkUserQuestion.isPresent()){
                    UserQuestion userQuestion = checkUserQuestion.get();
                    wasCorrect = userQuestion.getWasCorrect();
                }

                if(checkQuestionLike.isPresent()){
                    QuestionLike questionLike = checkQuestionLike.get();
                    wasLiked = questionLike.getWasLiked();
                    wasDisliked = questionLike.getWasDisliked();
                }

                QuestionResponse questionResponse = new QuestionResponse(question, wasCorrect, wasLiked, wasDisliked);

                return ResponseEntity.ok(questionResponse);
            }
            else{
                throw new Exception("Question not found");
            }
        }
        catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching questions: " + e.getMessage());
        }
    }

    @PostMapping("/submitLikeDislike")
    public ResponseEntity<?> submitLikeDislike(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody VoteRequest voteRequestBody) {

        try {
            String idToken = authHeader.replace("Bearer ", "");
            FirebaseToken firebaseToken = firebaseService.verifyToken(idToken);
            String firebaseId = firebaseToken.getUid();

            Optional<User> checkUser = userService.findByFirebaseUid(firebaseId);
            if (checkUser.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }

            User user = checkUser.get();
            int userId = user.getId();
            int questionId = voteRequestBody.getQuestionId();

            Optional<Question> checkQuestion = questionService.findById(questionId);
            if (checkQuestion.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Question not found");
            }

            Question question = checkQuestion.get();
            boolean isLiked = voteRequestBody.getIsLiked();

            Optional<QuestionLike> checkQuestionLike =
                    questionLikeService.findByUserIdAndQuestionId(userId, questionId);


            boolean isCorrect = false;
            Optional<UserQuestion> checkUserQuestion = userQuestionService.findByUserIdAndQuestionId(userId, questionId);

            boolean finalLiked = false;
            boolean finalDisliked = false;

            if(checkUserQuestion.isPresent()){
                UserQuestion userQuestion = checkUserQuestion.get();
                isCorrect = userQuestion.getWasCorrect();
            }

            if (checkQuestionLike.isPresent()) {
                QuestionLike existingLike = checkQuestionLike.get();
                boolean wasLiked = existingLike.getWasLiked();
                boolean wasDisliked = existingLike.getWasDisliked();

                if (isLiked) {
                    if (wasLiked) {
                        // Undo like
                        existingLike.setWasLiked(false);
                        question.setLikes(question.getLikes() - 1);
                    } else {
                        // Like (and remove dislike if it existed)
                        existingLike.setWasLiked(true);
                        if (wasDisliked) {
                            existingLike.setWasDisliked(false);
                            question.setDislikes(question.getDislikes() - 1);
                        }
                        question.setLikes(question.getLikes() + 1);
                    }
                } else {
                    if (wasDisliked) {
                        // Undo dislike
                        existingLike.setWasDisliked(false);
                        question.setDislikes(question.getDislikes() - 1);
                    } else {
                        // Dislike (and remove like if it existed)
                        existingLike.setWasDisliked(true);
                        if (wasLiked) {
                            existingLike.setWasLiked(false);
                            question.setLikes(question.getLikes() - 1);
                        }
                        question.setDislikes(question.getDislikes() + 1);
                    }
                }

                finalLiked = existingLike.getWasLiked();
                finalDisliked = existingLike.getWasDisliked();

                questionLikeService.save(existingLike);
            } else {
                // First time like/dislike
                QuestionLike newLike = new QuestionLike(userId, questionId, isLiked, !isLiked);
                questionLikeService.save(newLike);
                if (isLiked) question.setLikes(question.getLikes() + 1);
                else question.setDislikes(question.getDislikes() + 1);

                finalLiked = newLike.getWasLiked();
                finalDisliked = newLike.getWasDisliked();
            }

            questionService.save(question);



            return ResponseEntity.ok(new QuestionResponse(question, isCorrect, finalLiked, finalDisliked));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error saving like/dislike: " + e.getMessage());
        }
    }

}
