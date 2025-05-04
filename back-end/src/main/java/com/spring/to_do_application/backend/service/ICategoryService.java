package com.spring.to_do_application.backend.service;

import com.spring.to_do_application.backend.dto.request.category.CategoryCreate;
import com.spring.to_do_application.backend.dto.request.category.CategoryFilter;
import com.spring.to_do_application.backend.dto.response.PageResponse;
import com.spring.to_do_application.backend.dto.response.category.CategoryResponse;

import java.util.List;
import java.util.UUID;

public interface ICategoryService {
    PageResponse<CategoryResponse> getCategories(CategoryFilter filter);

    CategoryResponse getCategory(UUID id);

    CategoryResponse createCategory(CategoryCreate categoryCreateDto);

    void deleteCategory(UUID id);

    CategoryResponse updateCategory(UUID id, CategoryCreate categoryCreateDto);


}
