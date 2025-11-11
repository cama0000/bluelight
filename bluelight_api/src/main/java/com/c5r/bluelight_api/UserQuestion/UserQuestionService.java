package com.c5r.bluelight_api.UserQuestion;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserQuestionService {
    @Autowired
    UserQuestionRepository userQuestionRepository;

    public UserQuestion save(UserQuestion userQuestion){ return userQuestionRepository.save(userQuestion);}
    public void delete(UserQuestion userQuestion){ userQuestionRepository.delete(userQuestion);};
    public List<UserQuestion> findAll(){ return userQuestionRepository.findAll();}
    public Optional<UserQuestion> findById(long id){ return userQuestionRepository.findById(id);}
    public Optional<UserQuestion> findByQuestionId(long id){ return userQuestionRepository.findByQuestionId(id);}
    public Optional<UserQuestion> findByUserIdAndQuestionId(Integer id, Integer questionId) {
        return userQuestionRepository.findByUserIdAndQuestionId(id, questionId);
    }
}
