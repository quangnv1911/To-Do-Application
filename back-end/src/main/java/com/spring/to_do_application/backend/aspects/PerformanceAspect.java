package com.spring.to_do_application.backend.aspects;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Slf4j
public class PerformanceAspect {

    @Around("execution(* com.spring.to_do_application.backend.*(..))")
    public Object measurePerformance(ProceedingJoinPoint joinPoint) throws Throwable {
        long startTime = System.currentTimeMillis();
        long startMemory = 0;

        boolean logMemoryUsage = true;
        startMemory = Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory();

        log.debug("Starting performance measurement for {}.", joinPoint.getSignature());

        Object result;
        try {
            result = joinPoint.proceed();
        } finally {
            long elapsedTime = System.currentTimeMillis() - startTime;

            long endMemory = Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory();
            long memoryUsed = endMemory - startMemory;

            log.info("Performance measurement: {} executed in {} ms and used {} bytes.",
                    joinPoint.getSignature(), elapsedTime, memoryUsed);

            int thresholdMilliseconds = 100;
            if (elapsedTime > thresholdMilliseconds) {
                log.warn("Performance issue: {} took {} ms (threshold: {} ms).",
                        joinPoint.getSignature(), elapsedTime, thresholdMilliseconds);
            }
        }

        return result;
    }
}
