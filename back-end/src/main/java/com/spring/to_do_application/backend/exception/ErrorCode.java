package com.spring.to_do_application.backend.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(999, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    EXPIRED_TOKEN(1000, "Token has expired", HttpStatus.UNAUTHORIZED),
    UNAUTHENTICATED(1001, "User is not authenticated", HttpStatus.UNAUTHORIZED),
    INVALID_KEY(1002, "Invalid key", HttpStatus.BAD_REQUEST),
    CATEGORY_NOT_EXIST(1003, "Category not exist", HttpStatus.BAD_REQUEST);

    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

    private final int code;
    private final String message;
    private final HttpStatusCode statusCode;
}