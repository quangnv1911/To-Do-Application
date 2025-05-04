package com.spring.to_do_application.backend.mapper;

import com.spring.to_do_application.backend.dto.request.category.CategoryCreate;
import com.spring.to_do_application.backend.dto.response.category.CategoryResponse;
import com.spring.to_do_application.backend.entity.Category;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(builder = @Builder(disableBuilder = true), imports = Collectors.class)
public interface CategoryMapper {
    CategoryMapper INSTANCE = Mappers.getMapper(CategoryMapper.class);

    CategoryResponse toCategoryResponse(com.spring.to_do_application.backend.entity.Category category);
    List<CategoryResponse> toCategoryResponseList(List<Category> categories);

    Category toCategoryFromCreateCategory(CategoryCreate categoryCreateDto);
    void updateCategoryFromDto(CategoryCreate dto, @MappingTarget Category category);


}
