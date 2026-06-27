package com.c5r.bluelight_api.UserQuestion;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
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

    public Optional<UserQuestion> findByQuestionId(long questionId){
        return userQuestionRepository.findByQuestionId(questionId);
    }

    public Optional<UserQuestion> findByUserIdAndQuestionId(Integer userId, Integer questionId) {
        return userQuestionRepository.findByUserIdAndQuestionId(userId, questionId);
    }

    public List<UserQuestion> findAllByUserIdAndWasCorrect(Integer userId, boolean wasCorrect) {
        return userQuestionRepository.findAllByUserIdAndWasCorrect(userId, wasCorrect);
    }

    public List<UserQuestion> findAllByUserId(Integer userId) {
        return userQuestionRepository.findAllByUserId(userId);
    }
}
