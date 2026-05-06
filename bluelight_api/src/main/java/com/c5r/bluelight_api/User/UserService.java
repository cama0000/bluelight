package com.c5r.bluelight_api.User;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class UserService {
    @Autowired
    UserRepository userRepository;

    public User save(User user){
        log.info("Saved user with ID: {{}}", user.getId());
        return userRepository.save(user);
    }

    public void delete(User user){
        log.info("Deleted user with ID: {{}}", user.getId());
        userRepository.delete(user);
    }

    public List<User> findAll(){ return userRepository.findAll();}
    public Optional<User> findById(long id){ return userRepository.findById(id);}
    public Optional<User> findByFirebaseUid(String firebaseUid){ return userRepository.findByFirebaseUid(firebaseUid);}
}
