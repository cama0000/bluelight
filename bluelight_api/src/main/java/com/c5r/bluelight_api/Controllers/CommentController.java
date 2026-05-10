package com.c5r.bluelight_api.Controllers;

import com.c5r.bluelight_api.Comment.Comment;
import com.c5r.bluelight_api.Comment.CommentService;
import com.c5r.bluelight_api.User.User;
import com.c5r.bluelight_api.User.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private UserService userService;


    @PreAuthorize("isAuthenticated()")
    @PostMapping("/save")
    public ResponseEntity<Comment> saveComment(@RequestBody Comment commentRequest) {
        String firebaseId = (String) SecurityContextHolder.getContext()
                                        .getAuthentication()
                                        .getPrincipal();

        final User user = userService.findByFirebaseUid(firebaseId).orElseThrow();

        final Comment comment = new Comment(
                commentRequest.getQuestionId(),
                user.getId(),
                user.getUsername(),
                commentRequest.getContent()
        );

        final Comment savedComment = commentService.save(comment);

        return ResponseEntity.ok(savedComment);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/getCommentsByQuestionId/{questionId}")
    public ResponseEntity<List<Comment>> getCommentsByQuestionId(@PathVariable Integer questionId) {
        final List<Comment> comments = commentService.findAllByQuestionId(questionId);

        final List<Comment> updatedComments = commentService.getUpdatedComments(comments);

        return ResponseEntity.ok(updatedComments);
    }
}
