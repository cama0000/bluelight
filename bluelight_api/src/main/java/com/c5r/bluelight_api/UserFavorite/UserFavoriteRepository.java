package com.c5r.bluelight_api.UserFavorite;

import com.c5r.bluelight_api.QuestionLike.QuestionLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserFavoriteRepository extends JpaRepository<UserFavorite, Long> {
    List<UserFavorite> findAllByUserId(long id);
    Optional<UserFavorite> findByUserIdAndQuestionId(Integer userId, Integer questionId);
}