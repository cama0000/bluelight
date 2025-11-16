package com.c5r.bluelight_api.UserFavorite;

import com.c5r.bluelight_api.QuestionLike.QuestionLike;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserFavoriteService {
    @Autowired
    UserFavoriteRepository userFavoriteRepository;

    public UserFavorite save(UserFavorite userFavorite){ return userFavoriteRepository.save(userFavorite);}
    public void delete(UserFavorite userFavorite){ userFavoriteRepository.delete(userFavorite);};
    public Optional<UserFavorite> findById(long id){ return userFavoriteRepository.findById(id);}
    public List<UserFavorite> findAllByUserId(long userId){ return userFavoriteRepository.findAllByUserId(userId);}
    public Optional<UserFavorite> findByUserIdAndQuestionId(Integer userId, Integer questionId) {
        return userFavoriteRepository.findByUserIdAndQuestionId(userId, questionId);
    }
}