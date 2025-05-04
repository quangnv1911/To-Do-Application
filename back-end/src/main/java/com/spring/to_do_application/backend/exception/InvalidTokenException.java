package com.spring.to_do_application.backend.exception;

public class InvalidTokenException extends AppException{
    public InvalidTokenException() {
        super(ErrorCode.UNAUTHENTICATED);
    }
}
