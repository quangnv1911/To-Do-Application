package com.spring.to_do_application.backend.configuration.initial;

import com.spring.to_do_application.backend.aspects.LoggingAspect;
import com.spring.to_do_application.backend.constant.PredefinedRole;
import com.spring.to_do_application.backend.entity.Role;
import com.spring.to_do_application.backend.repository.RoleRepository;
import com.spring.to_do_application.backend.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Optional;
import java.util.logging.Logger;

@Slf4j
@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ApplicationInitConfiguration {
    @Bean
    @Transactional
    @ConditionalOnProperty(
            prefix = "spring",
            value = "datasource.driver-class-name",
            havingValue = "com.mysql.cj.jdbc.Driver"
    )
    ApplicationRunner applicationRunner(RoleRepository roleRepository) {
        log.info("Initializing application.....");

        return args -> {
            Optional<Role> userRole = roleRepository.findByRoleName(PredefinedRole.USER_ROLE);
            if (userRole.isEmpty()) {
                Role role = Role.builder()
                        .roleName(PredefinedRole.USER_ROLE)
                        .description(PredefinedRole.USER_ROLE)
                                .build();
                roleRepository.save(role);
            }
            Optional<Role> userRole1 = roleRepository.findByRoleName(PredefinedRole.USER_ROLE);

            Optional<Role> adminRole = roleRepository.findByRoleName(PredefinedRole.ADMIN_ROLE);
            if (adminRole.isEmpty()) {
                roleRepository.save(Role.builder()
                        .roleName(PredefinedRole.ADMIN_ROLE)
                        .description("Admin role")
                        .build());
            }

            log.info("Application initialization completed .....");
        };
    }
}
