package com.c5r.bluelight_api.Controllers;

import com.c5r.bluelight_api.Comment.Comment;
import com.c5r.bluelight_api.Comment.CommentService;
import com.c5r.bluelight_api.Firebase.FirebaseService;
import com.c5r.bluelight_api.Question.Question;
import com.c5r.bluelight_api.Question.QuestionService;
import com.c5r.bluelight_api.User.User;
import com.c5r.bluelight_api.User.UserService;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    private FirebaseService firebaseService;

    @Autowired
    private CommentService commentService;

    @Autowired
    private QuestionService questionService;

    @Autowired
    private UserService userService;


    @PostMapping("/save")
    public ResponseEntity<?> saveComment(@RequestHeader("Authorization") String authHeader,
                                          @RequestBody Comment commentRequest) {
        try{
            String idToken = authHeader.replace("Bearer ", "");
            FirebaseToken firebaseToken = firebaseService.verifyToken(idToken);
            String firebaseId = firebaseToken.getUid();

            final Optional<User> userOpt = userService.findByFirebaseUid(firebaseId);

            if(userOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("User not found");
            }

            final User user = userOpt.get();

            final Comment comment = new Comment(
                    commentRequest.getQuestionId(),
                    user.getId(),
                    user.getUsername(),
                    commentRequest.getContent()
            );

            commentService.save(comment);

            return ResponseEntity.ok(comment);
        }
        catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error saving comment: " + e.getMessage());
        }
    }

    @GetMapping("/getCommentsByQuestionId/{questionId}")
    public ResponseEntity<?> getCommentsByQuestionId(@RequestHeader("Authorization") String authHeader, @PathVariable Integer questionId) {
        try{
            String idToken = authHeader.replace("Bearer ", "");
            FirebaseToken firebaseToken = firebaseService.verifyToken(idToken);
            String firebaseId = firebaseToken.getUid();

            final Optional<Question> checkQuestion = questionService.findById(questionId);
            final Optional<User> checkUser = userService.findByFirebaseUid(firebaseId);

            if(checkUser.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("User not found");
            }

            if(checkQuestion.isPresent()){
                List<Comment> comments = commentService.findAllByQuestionId(questionId);
                return ResponseEntity.ok(comments);
            }
            else{
                throw new Exception("Question not found");
            }
        }
        catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching comments: " + e.getMessage());
        }
    }
}
