package com.spring.to_do_application.backend.exception;

public class ExpiredTokenException extends AppException{
    public ExpiredTokenException() {
        super(ErrorCode.EXPIRED_TOKEN);
    }
}
