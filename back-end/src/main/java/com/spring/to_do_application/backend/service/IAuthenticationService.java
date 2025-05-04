package com.spring.to_do_application.backend.service;

import com.nimbusds.jose.JOSEException;
import com.spring.to_do_application.backend.dto.request.auth.RegisterRequest;
import com.spring.to_do_application.backend.dto.request.authen.AuthenticateRequest;
import com.spring.to_do_application.backend.dto.request.authen.LogoutRequest;
import com.spring.to_do_application.backend.dto.request.authen.RegisterRequest;
import com.spring.to_do_application.backend.dto.request.authen.VerifyAccountRequest;
import com.spring.to_do_application.backend.dto.response.authen.AuthenticateResponse;
import com.spring.to_do_application.backend.entity.User;
import jakarta.servlet.http.HttpServletRequest;

import java.text.ParseException;

public interface IAuthenticationService {
    void handleLogout(LogoutRequest request) throws ParseException, JOSEException;
    String handleRegister(RegisterRequest registerRequest, HttpServletRequest request);
    AuthenticateResponse authenticate(AuthenticateRequest request, HttpServletRequest requestHeader);
    void handleVerifyAccount(VerifyAccountRequest request);
}
