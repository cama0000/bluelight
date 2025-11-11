package com.c5r.bluelight_api.QuestionLike;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionLikeService {
    @Autowired
    QuestionLikeRepository questionLikeRepository;

    public QuestionLike save(QuestionLike questionLike){ return questionLikeRepository.save(questionLike);}
    public void delete(QuestionLike questionLike){ questionLikeRepository.delete(questionLike);};
    public List<QuestionLike> findAll(){ return questionLikeRepository.findAll();}
    public Optional<QuestionLike> findById(long id){ return questionLikeRepository.findById(id);}
    public Optional<QuestionLike> findByQuestionId(long id){ return questionLikeRepository.findByQuestionId(id);}
    public Optional<QuestionLike> findByUserIdAndQuestionId(Integer id, Integer questionId) {
        return questionLikeRepository.findByUserIdAndQuestionId(id, questionId);
    }
}
