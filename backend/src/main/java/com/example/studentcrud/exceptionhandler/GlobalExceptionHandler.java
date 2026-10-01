package com.example.studentcrud.exceptionhandler;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import com.example.studentcrud.exceptionhandler.InvalidLoginException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationExceptions(
            MethodArgumentNotValidException ex) {

        Map<String, Object> response = new HashMap<>();

        Map<String, List<String>> errors = new HashMap<>();

        ex.getBindingResult()
                .getAllErrors()
                .forEach(error -> {

                    String fieldName = ((FieldError) error).getField();
                    String errorMessage = error.getDefaultMessage();

                    errors.computeIfAbsent(
                            fieldName,
                            key -> new ArrayList<>()
                    ).add(errorMessage);
                });

        response.put("status", 400);
        response.put("message", "Validation failed");
        response.put("errors", errors);

        return new ResponseEntity<>(
                response,
                HttpStatus.BAD_REQUEST
        );
    }


    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleResourceNotFound(
            ResourceNotFoundException ex) {

        Map<String, Object> response = new HashMap<>();

        response.put("status", 404);
        response.put("message", ex.getMessage());

        return new ResponseEntity<>(
                response,
                HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Map<String, Object>> handleInvalidJson(
            HttpMessageNotReadableException ex) {

        Map<String, Object> response = new HashMap<>();

        response.put("status", 400);
        response.put(
                "message",
                "Invalid request data. Check JSON format and date values."
        );

        return new ResponseEntity<>(
                response,
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, Object>> handleDataIntegrityViolation(
            DataIntegrityViolationException ex) {

        Map<String, Object> response = new HashMap<>();
        Map<String, List<String>> errors = new HashMap<>();

        String message = ex.getMostSpecificCause().getMessage();

        System.out.println("DUPLICATE ERROR: " + message);

        if (message != null && message.contains("index: email")) {
            errors.put("email", List.of("Email already exists"));
        }  else if (message != null && message.contains("index: phoneNumber")) {
            errors.put("phoneNumber", List.of("Phone number already exists"));
        } else {
            errors.put(
                    "email",
                    List.of("Email or phone number already exists")
            );
        }

        response.put("status", 409);
        response.put("message", "Duplicate value");
        response.put("errors", errors);

        return new ResponseEntity<>(response, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(InvalidLoginException.class)
    public ResponseEntity<Map<String, Object>> handleInvalidLogin(
            InvalidLoginException ex) {

        Map<String, Object> response = new HashMap<>();
        Map<String, List<String>> errors = new HashMap<>();

        errors.put(ex.getField(), List.of(ex.getMessage()));

        response.put("status", 401);
        response.put("message", "Login failed");
        response.put("errors", errors);

        return new ResponseEntity<>(
                response,
                HttpStatus.UNAUTHORIZED
        );
    }

    @ExceptionHandler(DuplicateUserException.class)
    public ResponseEntity<Map<String, Object>> handleDuplicateUser(
            DuplicateUserException ex) {

        Map<String, Object> response = new HashMap<>();
        Map<String, List<String>> errors = new HashMap<>();

        errors.put(ex.getField(), List.of(ex.getMessage()));

        response.put("status", 409);
        response.put("message", "Duplicate value");
        response.put("errors", errors);

        return new ResponseEntity<>(
                response,
                HttpStatus.CONFLICT
        );
    }
}