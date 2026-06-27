package com.c5r.bluelight_api.Comment;

import com.c5r.bluelight_api.User.User;
import com.c5r.bluelight_api.User.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class CommentService {
    @Autowired
    UserService userService;

    @Autowired
    CommentRepository commentRepository;

    @CacheEvict(value = "comments", key = "#comment.questionId")
    public Comment save(Comment comment){
        log.info("Saved comment with question ID: {{}}", comment.getQuestionId());
        return commentRepository.save(comment);
    }

    @CacheEvict(value = "comments", key = "#comment.questionId")
    public void delete(Comment comment){
        log.info("Deleted comment with question ID: {{}}", comment.getQuestionId());
        commentRepository.delete(comment);
    }

    @Cacheable(value = "comments", key = "#questionId")
    public List<Comment> findAllByQuestionId(long questionId){ return commentRepository.findAllByQuestionId(questionId);}

    public List<Comment> getUpdatedComments(List<Comment> comments) {
        return comments.stream()
                .peek(comment -> {
                    final User user = userService.findById(comment.getUserId()).orElseThrow();
                    comment.setUsername(user.getUsername());
                }).toList();
    }
}
