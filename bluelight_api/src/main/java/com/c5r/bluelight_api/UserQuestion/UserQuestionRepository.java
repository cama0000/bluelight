package com.c5r.bluelight_api.UserQuestion;

import com.c5r.bluelight_api.User.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserQuestionRepository extends JpaRepository<UserQuestion, Long> {
    Optional<UserQuestion> findByQuestionId(long id);
    Optional<UserQuestion> findByUserIdAndQuestionId(Integer userId, Integer questionId);
}