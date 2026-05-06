package com.c5r.bluelight_api.Question;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class QuestionService {
    @Autowired
    QuestionRepository questionRepository;

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
}
