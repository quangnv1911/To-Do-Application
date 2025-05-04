package com.spring.to_do_application.backend.mapper;

import com.spring.to_do_application.backend.dto.data.user.UserPayloadData;
import com.spring.to_do_application.backend.dto.request.user.UserCreationRequest;
import com.spring.to_do_application.backend.dto.response.user.UserResponse;
import com.spring.to_do_application.backend.entity.User;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.stream.Collectors;

@Mapper(builder = @Builder(disableBuilder = true), imports = Collectors.class)
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);


    UserCreationRequest toUserCreationRequest(User user);

    @Mapping(source = "role.roleName", target = "roleName")
    UserResponse toUserResponse(User user);
    UserPayloadData toUserPayloadData(User user);
}
