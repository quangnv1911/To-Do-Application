package com.spring.to_do_application.backend.aspects;

import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class LoggingAspect {
    @Around("execution(* com.spring.to_do_application.backend.*(..))")
    public Object logAround(ProceedingJoinPoint joinPoint) throws Throwable {
        Object result = null;

        try {
            log.debug("Entering {} with arguments {}", joinPoint.getSignature(), joinPoint.getArgs());

            result = joinPoint.proceed();

            log.debug("Exiting {} with return value {}", joinPoint.getSignature(), result);

        } catch (Throwable ex) {
            log.error("Exception thrown in {} with arguments {}",
                    joinPoint.getSignature(), joinPoint.getArgs(), ex);

            throw ex;
        }

        return result;
    }
}
