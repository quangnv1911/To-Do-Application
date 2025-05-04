package com.spring.to_do_application.backend.entity;

import com.spring.to_do_application.backend.base.BaseEntity;
import com.spring.to_do_application.backend.enums.TaskPriority;
import com.spring.to_do_application.backend.enums.TaskStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.Accessors;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "task")
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Task extends BaseEntity<UUID> {

    @Column(name = "priority", nullable = false)
    @Enumerated(EnumType.STRING)
    TaskPriority priority;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    @Builder.Default
    TaskStatus status = TaskStatus.INCOMPLETE;

    @Column(name = "due_date")
    Date dueDate;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval = true)
    Set<Tag> tags = new HashSet<>();
}
