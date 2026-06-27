package com.c5r.bluelight_api.UserQuestion;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserQuestionRepository extends JpaRepository<UserQuestion, Long> {
    Optional<UserQuestion> findByQuestionId(long id);
    Optional<UserQuestion> findByUserIdAndQuestionId(Integer userId, Integer questionId);
    List<UserQuestion> findAllByUserIdAndWasCorrect(Integer id, boolean wasCorrect);

    List<UserQuestion> findAllByUserId(Integer id);
}