package com.c5r.bluelight_api.User;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.List;

@Data
@Entity
@Table(
        name = User.TABLE_NAME
)
public class User{

    public static final String TABLE_NAME = "USERS";

    @Id
    @SequenceGenerator(
            name = "user_id_seq",
            sequenceName = "user_id_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "user_id_seq"
    )
    private Integer id;

    @Column(
            name = "FIREBASE_UID",
            unique = true,
            nullable = false
    )
    private String firebaseUid;

    @Column(
            name = "EMAIL",
            nullable = false
    )
    private String email;

    @Column(
            name = "USERNAME",
            nullable = false
    )
    private String username;

    @Column(
            name = "BIO",
            columnDefinition = "TEXT"
    )
    private String bio;

    @Setter
    @Column(
            name = "PROFILE_PIC_URL",
            unique = true
    )
    private String profilePicUrl;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(
            name = "POINTS",
            nullable = false,
            columnDefinition = "INT DEFAULT 0"
    )
    private int points = 0;

//    public User(String firebaseUid, String email, String username, String bio, Role role) {
//        this.firebaseUid = firebaseUid;
//        this.email = email;
//        this.username = username;
//        this.bio = bio;
//        this.role = role;
//    }

    public Integer getId() {
        return this.id;
    }

    public String getFirebaseUid() {
        return this.firebaseUid;
    }

    public String getEmail() {
        return this.email;
    }

    public String getUsername() {
        return this.username;
    }

    public String getBio() {
        return this.bio;
    }

    public Role getRole() {
        return this.role;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setFirebaseUid(String firebaseUid) {
        this.firebaseUid = firebaseUid;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public int getPoints() {
        return this.points;
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }
}
