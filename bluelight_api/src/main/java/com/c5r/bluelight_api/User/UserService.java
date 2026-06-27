package com.c5r.bluelight_api.User;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class UserService {
    @Autowired
    UserRepository userRepository;

    @Caching(evict = {
            @CacheEvict(value = "userById", key = "#user.id"),
            @CacheEvict(value = "userByFirebaseUid", key = "#user.firebaseUid")
    })
    public User save(User user){
        log.info("Saved user with ID: {{}}", user.getId());
        return userRepository.save(user);
    }

    @Caching(evict = {
            @CacheEvict(value = "userById", key = "#user.id"),
            @CacheEvict(value = "userByFirebaseUid", key = "#user.firebaseUid")
    })
    public void delete(User user){
        log.info("Deleted user with ID: {{}}", user.getId());
        userRepository.delete(user);
    }

    @Cacheable(value = "userById", key = "#id")
    public Optional<User> findById(long id){ return userRepository.findById(id);}

    @Cacheable(value = "userByFirebaseUid", key = "#firebaseUid")
    public Optional<User> findByFirebaseUid(String firebaseUid){ return userRepository.findByFirebaseUid(firebaseUid);}
}
