package com.spring.to_do_application.backend.dto.request.category;

import com.spring.to_do_application.backend.dto.request.BaseFilterRequest;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CategoryFilter extends BaseFilterRequest {
    String name;
}
