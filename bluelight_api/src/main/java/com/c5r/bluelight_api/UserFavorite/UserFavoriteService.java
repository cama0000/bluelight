package com.c5r.bluelight_api.UserFavorite;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class UserFavoriteService {
    public final UserFavoriteRepository userFavoriteRepository;

    public UserFavoriteService(UserFavoriteRepository userFavoriteRepository) {
        this.userFavoriteRepository = userFavoriteRepository;
    }

    public UserFavorite save(UserFavorite userFavorite){
        log.info("Saved user favorite with user ID {{}} and question with ID: {{}}", userFavorite.getUserId(), userFavorite.getQuestionId());
        return userFavoriteRepository.save(userFavorite);
    }

    public void delete(UserFavorite userFavorite){
        log.info("Deleted user favorite with user ID {{}} and question with ID: {{}}", userFavorite.getUserId(), userFavorite.getQuestionId());
        userFavoriteRepository.delete(userFavorite);
    }

    public List<UserFavorite> findAllByUserId(long userId){ return userFavoriteRepository.findAllByUserId(userId);}
    public Optional<UserFavorite> findByUserIdAndQuestionId(long userId, long questionId) {
        return userFavoriteRepository.findByUserIdAndQuestionId(userId, questionId);
    }
}