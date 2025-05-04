package com.spring.to_do_application.backend.configuration.security;

import com.spring.to_do_application.backend.exception.ErrorCode;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

import java.io.IOException;

// Không có quyền
public class JwtAccessDeniedHandler implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException
    accessDeniedException)
            throws IOException {

        ErrorCode errorCode = ErrorCode.UNAUTHORIZED;
        JwtAuthenticationEntryPoint.handleResponse(response, errorCode);

    }
}

