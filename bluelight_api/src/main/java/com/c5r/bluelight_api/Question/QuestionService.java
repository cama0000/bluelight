package com.c5r.bluelight_api.Question;

import com.c5r.bluelight_api.UserFavorite.UserFavorite;
import com.c5r.bluelight_api.UserQuestion.UserQuestion;
import com.c5r.bluelight_api.UserQuestion.UserQuestionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class QuestionService {
    @Autowired
    QuestionRepository questionRepository;

    @Autowired
    UserQuestionService userQuestionService;

    public Question save(Question question){
        log.info("Saved question with ID: {{}}", question.getId());
        return questionRepository.save(question);
    }

    public void delete(Question question){
        log.info("Deleted question with ID: {{}}", question.getId());
        questionRepository.delete(question);
    }

    public List<Question> findAll(){ return questionRepository.findAll();}
    public Optional<Question> findById(long id){ return questionRepository.findById(id);}

    public List<QuestionResponse> generateAllQuestionResponses(List<Question> questions){
        return questions.stream()
                        .map(question -> {
                            final Optional<UserQuestion> userQuestion = userQuestionService.findByQuestionId(question.getId());
                            final boolean isCorrect = userQuestion.isPresent() && userQuestion.get().getWasCorrect();

                            return new QuestionResponse(
                                    question,
                                    isCorrect,
                                    false,
                                    false,
                                    false
                            );
                        }).toList();
    }

    public List<QuestionResponse> generateCompletedQuestionResponses(List<UserQuestion> userQuestions){
        return userQuestions.stream()
                .map(userQuestion -> {
                    Question question = findById(userQuestion.getQuestionId()).orElseThrow();

                    return new QuestionResponse(
                            question,
                            userQuestion.getWasCorrect(),
                            false,
                            false,
                            false
                    );
                }).toList();
    }

    public List<QuestionResponse> generateFavoritedQuestionResponses(List<UserFavorite> userFavorites){
        return userFavorites.stream()
                .map(userFavorite -> {
                    Question question = findById(userFavorite.getQuestionId()).orElseThrow();

                    return new QuestionResponse(
                            question,
                            false,
                            false,
                            false,
                            true
                    );
                }).toList();
    }
}
