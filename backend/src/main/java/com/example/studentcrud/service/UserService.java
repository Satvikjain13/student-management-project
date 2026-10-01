package com.example.studentcrud.service;

import com.example.studentcrud.entity.User;

public interface UserService {

    User signup(User user);

    User login(String email, String password);
}