package com.c5r.bluelight_api.QuestionLike;

import com.c5r.bluelight_api.UserQuestion.UserQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

public interface QuestionLikeRepository extends JpaRepository<QuestionLike, Long> {
    Optional<QuestionLike> findByQuestionId(long id);
    Optional<QuestionLike> findByUserIdAndQuestionId(Integer userId, Integer questionId);
}
