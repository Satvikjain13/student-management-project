package com.example.studentcrud.exceptionhandler;

public class InvalidLoginException extends RuntimeException {

    private final String field;

    public InvalidLoginException(String field, String message) {
        super(message);
        this.field = field;
    }

    public String getField() {
        return field;
    }
}