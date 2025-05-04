package com.spring.to_do_application.backend.service.impl;

import com.spring.to_do_application.backend.dto.request.category.CategoryCreate;
import com.spring.to_do_application.backend.dto.request.category.CategoryFilter;
import com.spring.to_do_application.backend.dto.response.PageResponse;
import com.spring.to_do_application.backend.dto.response.category.CategoryResponse;
import com.spring.to_do_application.backend.entity.Category;
import com.spring.to_do_application.backend.exception.AppException;
import com.spring.to_do_application.backend.exception.ErrorCode;
import com.spring.to_do_application.backend.mapper.CategoryMapper;
import com.spring.to_do_application.backend.repository.CategoryRepository;
import com.spring.to_do_application.backend.service.ICategoryService;
import com.spring.to_do_application.backend.util.PaginationUtil;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryService implements ICategoryService {
    CategoryRepository categoryRepository;
    CategoryMapper categoryMapper;

    @Override
    public PageResponse<CategoryResponse> getCategories(CategoryFilter filter) {
        Pageable pageRequest = PaginationUtil.createPageRequest(
                filter.getPage(), filter.getPageSize(), filter.getSortBy(), filter.getSortOrder()
        );

        String name = (filter.getName() != null && !filter.getName().isEmpty()) ? filter.getName() : null;

        var categories = categoryRepository.findByNameContaining(name, pageRequest);
        return PageResponse.fromPage(categories, categoryMapper::toCategoryResponse);
    }

    @Override
    public CategoryResponse getCategory(UUID id) {
        var category = checkCategoryExist(id);
        return categoryMapper.toCategoryResponse(category);
    }

    @Override
    public CategoryResponse createCategory(CategoryCreate categoryCreateDto) {
        Category category = categoryMapper.toCategoryFromCreateCategory(categoryCreateDto);
        var newCategory = categoryRepository.save(category);
        return categoryMapper.toCategoryResponse(newCategory);
    }

    @Override
    public void deleteCategory(UUID id) {
        checkCategoryExist(id);
        categoryRepository.deleteById(id);
    }

    @Override
    public CategoryResponse updateCategory(UUID id, CategoryCreate categoryCreateDto) {
        var category = checkCategoryExist(id);
        categoryMapper.updateCategoryFromDto(categoryCreateDto, category);
        var updatedCategory = categoryRepository.save(category);
        return categoryMapper.toCategoryResponse(updatedCategory);
    }


    private Category checkCategoryExist(UUID id) {
        return categoryRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_EXIST));
    }
}
