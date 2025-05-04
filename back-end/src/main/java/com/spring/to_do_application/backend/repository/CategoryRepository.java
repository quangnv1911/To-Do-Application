package com.spring.to_do_application.backend.repository;

import com.spring.to_do_application.backend.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CategoryRepository extends JpaRepository<Category, UUID> {
    Page<Category> findByNameContaining(String name, Pageable pageRequest);

}
