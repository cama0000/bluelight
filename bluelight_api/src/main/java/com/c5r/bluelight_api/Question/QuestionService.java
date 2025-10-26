package com.c5r.bluelight_api.Question;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {
    @Autowired
    QuestionRepository questionRepository;

    public Question save(Question question){ return questionRepository.save(question); }
    public void delete(Question question){ questionRepository.delete(question);}
    public List<Question> findAll(){ return questionRepository.findAll();}
    public Optional<Question> findById(long id){ return questionRepository.findById(id);}
}
