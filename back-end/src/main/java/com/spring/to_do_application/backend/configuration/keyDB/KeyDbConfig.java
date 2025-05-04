package com.spring.to_do_application.backend.configuration.keyDB;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializer;

@Configuration
public class KeyDbConfig {
    @Value("${keydb.host}")
    private String keydbHost;

    @Value("${keydb.port}")
    private int keydbPort;

    @Bean
    public LettuceConnectionFactory redisConnectionFactory() {
        // Create Standalone Connection to Redis
        return new LettuceConnectionFactory(new RedisStandaloneConfiguration(keydbHost, keydbPort));
    }


    @Bean
    @Primary
    public RedisTemplate<String, Object> keyDbTemplate(RedisConnectionFactory redisConnectionFactory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(redisConnectionFactory);

        // Serialize/deserialize to JSON
        Jackson2JsonRedisSerializer<Object> serializer = new Jackson2JsonRedisSerializer<>(Object.class);

        template.setKeySerializer(RedisSerializer.string());
        template.setValueSerializer(serializer);


        template.setHashKeySerializer(RedisSerializer.string());
        template.setHashValueSerializer(serializer);

        return template;
    }
}
