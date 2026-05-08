package com.c5r.bluelight_api.Controllers;

import com.c5r.bluelight_api.Comment.CommentService;
import com.c5r.bluelight_api.Firebase.FirebaseService;
import com.c5r.bluelight_api.Question.Question;
import com.c5r.bluelight_api.Question.QuestionResponse;
import com.c5r.bluelight_api.Question.QuestionService;
import com.c5r.bluelight_api.QuestionLike.QuestionLike;
import com.c5r.bluelight_api.QuestionLike.QuestionLikeService;
import com.c5r.bluelight_api.QuestionLike.VoteRequest;
import com.c5r.bluelight_api.UserFavorite.FavoriteRequest;

import com.c5r.bluelight_api.User.User;
import com.c5r.bluelight_api.User.UserService;
import com.c5r.bluelight_api.UserFavorite.UserFavorite;
import com.c5r.bluelight_api.UserFavorite.UserFavoriteService;
import com.c5r.bluelight_api.UserQuestion.UserQuestion;
import com.c5r.bluelight_api.UserQuestion.UserQuestionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@Slf4j
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
    @Autowired
    private UserFavoriteService userFavoriteService;
    @Autowired
    private CommentService commentService;

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/save")
    public ResponseEntity<Question> saveQuestion(@RequestBody Question question) {
        questionService.save(question);

        return ResponseEntity.ok(question);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/getAllQuestions")
    public ResponseEntity<List<QuestionResponse>> getAllQuestions() {
        final List<Question> questions = questionService.findAll();

        final List<QuestionResponse> questionResponses = questionService.generateAllQuestionResponses(questions);

        return ResponseEntity.ok(questionResponses);
    }


    @PreAuthorize("isAuthenticated()")
    @GetMapping("/getCompletedQuestions")
    public ResponseEntity<List<QuestionResponse>> getCompletedQuestions() {
        String firebaseId = (String) SecurityContextHolder.getContext()
                                        .getAuthentication()
                                        .getPrincipal();

        final User user = userService.findByFirebaseUid(firebaseId).orElseThrow();

        List<UserQuestion> userQuestions = userQuestionService.findAllByUserId(user.getId());

        final List<QuestionResponse> completedResponses = questionService.generateCompletedQuestionResponses(userQuestions);

        return ResponseEntity.ok(completedResponses);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/getFavoritedQuestions")
    public ResponseEntity<List<QuestionResponse>> getFavoritedQuestions() {
        String firebaseId = (String) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();

        final User user = userService.findByFirebaseUid(firebaseId).orElseThrow();

        List<UserFavorite> userFavorites = userFavoriteService.findAllByUserId(user.getId());

        final List<QuestionResponse> favoritedResponses = questionService.generateFavoritedQuestionResponses(userFavorites);

        return ResponseEntity.ok(favoritedResponses);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/getQuestionById/{questionId}")
    public ResponseEntity<QuestionResponse> getQuestionById(@PathVariable Integer questionId) {
        String firebaseId = (String) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();

        final User user = userService.findByFirebaseUid(firebaseId).orElseThrow();


        // TODO: this controller needs some cleanup, maybe also a service method for it
        Question question = questionService.findById(questionId).orElseThrow();
        Optional<UserQuestion> checkUserQuestion = userQuestionService.findByUserIdAndQuestionId(user.getId(), questionId);
        Optional<QuestionLike> checkQuestionLike = questionLikeService.findByUserIdAndQuestionId(user.getId(), questionId);
        Optional<UserFavorite> checkUserFavorite = userFavoriteService.findByUserIdAndQuestionId(user.getId(), questionId);

        boolean wasCorrect = false;
        boolean wasLiked = false;
        boolean wasDisliked = false;
        boolean wasFavorited = false;

        if(checkUserQuestion.isPresent()){
            UserQuestion userQuestion = checkUserQuestion.get();
            wasCorrect = userQuestion.getWasCorrect();
        }

        if(checkQuestionLike.isPresent()){
            QuestionLike questionLike = checkQuestionLike.get();
            wasLiked = questionLike.getWasLiked();
            wasDisliked = questionLike.getWasDisliked();
        }

        if(checkUserFavorite.isPresent()){
            UserFavorite userFavorite = checkUserFavorite.get();
            wasFavorited = true;
        }

        QuestionResponse questionResponse = new QuestionResponse(question, wasCorrect, wasLiked, wasDisliked, wasFavorited);

        return ResponseEntity.ok(questionResponse);
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/submitLikeDislike")
    public ResponseEntity<QuestionResponse> submitLikeDislike(@RequestBody VoteRequest voteRequestBody) {
        String firebaseId = (String) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();

        final User user = userService.findByFirebaseUid(firebaseId).orElseThrow();

        // TODO: this controller needs some cleanup, maybe also a service method for it
        int userId = user.getId();
        int questionId = voteRequestBody.getQuestionId();
        boolean isLiked = voteRequestBody.getIsLiked();

        Question question = questionService.findById(questionId).orElseThrow();

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

        return ResponseEntity.ok(new QuestionResponse(question, isCorrect, finalLiked, finalDisliked, false));
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/submitFavorite")
    public ResponseEntity<?> submitFavorite(@RequestBody FavoriteRequest favoriteRequestBody) {
        String firebaseId = (String) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();

        final User user = userService.findByFirebaseUid(firebaseId).orElseThrow();
        final int userId = user.getId();
        final int questionId = favoriteRequestBody.getQuestionId();

        final Question question = questionService.findById(questionId).orElseThrow();

        final Optional<UserFavorite> userFavoriteOpt =
                userFavoriteService.findByUserIdAndQuestionId(userId, questionId);

        boolean favorited = false;

        if(userFavoriteOpt.isEmpty()) {
            userFavoriteService.save(new UserFavorite(userId, questionId));
            favorited = true;
        }
        else{
            UserFavorite userFavorite = userFavoriteOpt.get();
            userFavoriteService.delete(userFavorite);
        }

        return ResponseEntity.ok(new QuestionResponse(question, false, false, false, favorited));
    }
}
