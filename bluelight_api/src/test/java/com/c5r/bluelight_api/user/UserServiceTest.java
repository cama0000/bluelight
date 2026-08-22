package com.c5r.bluelight_api.user;

import com.c5r.bluelight_api.User.User;
import com.c5r.bluelight_api.User.UserRepository;
import com.c5r.bluelight_api.User.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    UserRepository userRepository;

    UserService userService;

    @BeforeEach
    public void beforeTest(){
        userService = new UserService(userRepository);
    }

    @Test
    public void findUserById() {
        User user = new User();
        long userId = 1L;

        user.setId(userId);

        when(userRepository.findById(userId))
                .thenReturn(Optional.of(user));

        Optional<User> resultUser = userService.findById(userId);

        assertTrue(resultUser.isPresent());
        assertEquals(user.getId(), resultUser.get().getId());
    }

    @Test
    public void findUserByFirebaseId() {
        User user = new User();
        String firebaseUid = "firebase-uid";

        user.setFirebaseUid(firebaseUid);

        when(userRepository.findByFirebaseUid(firebaseUid))
                .thenReturn(Optional.of(user));

        Optional<User> resultUser = userService.findByFirebaseUid(firebaseUid);

        assertTrue(resultUser.isPresent());
        assertEquals(user.getFirebaseUid(), resultUser.get().getFirebaseUid());
    }

    @Test
    public void findUserByFirebaseId_whenUserDoesNotExist() {
        String firebaseUid = "firebase-uid-incorrect";

        when(userRepository.findByFirebaseUid(firebaseUid))
                .thenReturn(Optional.empty());

        Optional<User> resultUser =
                userService.findByFirebaseUid(firebaseUid);

        assertTrue(resultUser.isEmpty());
    }

    @Test
    public void saveUser(){
        User user = new User();
        user.setId(1L);

        when(userRepository.save(user))
                .thenReturn(user);

        User resultUser = userService.save(user);

        assertEquals(user.getId(), resultUser.getId());
    }
}
