package com.c5r.bluelight_api.UserQuestion;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class UserQuestionService {
    @Autowired
    UserQuestionRepository userQuestionRepository;

    public UserQuestion save(UserQuestion userQuestion){
        log.info("Saved user question with user ID {{}} and question with ID: {{}}", userQuestion.getUserId(), userQuestion.getQuestionId());
        return userQuestionRepository.save(userQuestion);
    }

    public void delete(UserQuestion userQuestion){
        log.info("Deleted user question with user ID {{}} and question with ID: {{}}", userQuestion.getUserId(), userQuestion.getQuestionId());
        userQuestionRepository.delete(userQuestion);
    }

    public List<UserQuestion> findAll(){ return userQuestionRepository.findAll();}
    public Optional<UserQuestion> findById(long id){ return userQuestionRepository.findById(id);}
    public Optional<UserQuestion> findByQuestionId(long id){ return userQuestionRepository.findByQuestionId(id);}
    public Optional<UserQuestion> findByUserIdAndQuestionId(Integer id, Integer questionId) {
        return userQuestionRepository.findByUserIdAndQuestionId(id, questionId);
    }
    public List<UserQuestion> findAllByUserIdAndWasCorrect(Integer id, boolean wasCorrect) {
        return userQuestionRepository.findAllByUserIdAndWasCorrect(id, wasCorrect);
    }

    public List<UserQuestion> findAllByUserId(Integer id) {
        return userQuestionRepository.findAllByUserId(id);
    }
}
