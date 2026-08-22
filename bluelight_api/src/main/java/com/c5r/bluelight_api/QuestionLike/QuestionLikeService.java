package com.c5r.bluelight_api.QuestionLike;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class QuestionLikeService {
    public final QuestionLikeRepository questionLikeRepository;

    public QuestionLikeService(QuestionLikeRepository questionLikeRepository) {
        this.questionLikeRepository = questionLikeRepository;
    }

    public QuestionLike save(QuestionLike questionLike){
        log.info("Saved question like with question ID: {{}}", questionLike.getQuestionId());
        return questionLikeRepository.save(questionLike);
    }

    public void delete(QuestionLike questionLike){ questionLikeRepository.delete(questionLike);};
    public List<QuestionLike> findAll(){ return questionLikeRepository.findAll();}
    public Optional<QuestionLike> findById(long id){ return questionLikeRepository.findById(id);}
    public Optional<QuestionLike> findByQuestionId(long id){ return questionLikeRepository.findByQuestionId(id);}
    public Optional<QuestionLike> findByUserIdAndQuestionId(long id, long questionId) {
        return questionLikeRepository.findByUserIdAndQuestionId(id, questionId);
    }
}
