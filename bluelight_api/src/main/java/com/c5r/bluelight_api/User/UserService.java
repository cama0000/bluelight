package com.c5r.bluelight_api.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public User save(User user){ return userRepository.save(user);}
    public void delete(User user){ userRepository.delete(user);};
    public List<User> findAll(){ return userRepository.findAll();}
    public Optional<User> findById(long id){ return userRepository.findById(id);}
}
