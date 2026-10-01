package com.example.studentcrud.service;

import com.example.studentcrud.entity.User;
import com.example.studentcrud.exceptionhandler.DuplicateUserException;
import com.example.studentcrud.exceptionhandler.InvalidLoginException;
import com.example.studentcrud.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User signup(User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new DuplicateUserException(
                    "email",
                    "Email already exists"
            );
        }

        return userRepository.save(user);
    }

    @Override
    public User login(String email, String password) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new InvalidLoginException(
                                "email",
                                "Email not registered"
                        )
                );

        if (!user.getPassword().equals(password)) {
            throw new InvalidLoginException(
                    "password",
                    "Incorrect password"
            );
        }

        return user;
    }
}