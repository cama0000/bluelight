package com.c5r.bluelight_api.Controllers;

import com.c5r.bluelight_api.Firebase.FirebaseService;
import com.c5r.bluelight_api.Question.Question;
import com.c5r.bluelight_api.Question.QuestionService;
import com.c5r.bluelight_api.Question.QuestionType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/questions")
public class QuestionController {
    @Autowired
    private QuestionService questionService;

    @Autowired
    private FirebaseService firebaseService;

    @PostMapping("/save")
    public ResponseEntity<?> saveQuestion(@RequestHeader("Authorization") String authHeader,
                                          @RequestBody Question question) {
        try{
            String idToken = authHeader.replace("Bearer ", "");
            firebaseService.verifyToken(idToken);

            System.out.println(question.getTitle());
            System.out.println(question.getPrompt());
            System.out.println(question.getCategory());
            System.out.println(question.getDifficulty());
            System.out.println(question.getType());
            System.out.println(question.getAnswerIndex());
            System.out.println(question.getAnswerChoices());



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
            return ResponseEntity.ok(questions);
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
            firebaseService.verifyToken(idToken);

            Optional<Question> question = questionService.findById(questionId);

            if(question.isPresent()){
                return ResponseEntity.ok(question.get());
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
}
