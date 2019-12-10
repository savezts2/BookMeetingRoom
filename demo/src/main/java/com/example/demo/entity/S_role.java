package com.example.demo.entity;


import lombok.*;

import javax.persistence.*;

@Entity
@Data
@Setter
@Getter
@NoArgsConstructor
@EqualsAndHashCode
public class S_role {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long s_role_id;

    private String role;

    private String isActive;

    public Long getS_role_id() {
        return s_role_id;
    }

    public void setS_role_id(Long s_role_id) {
        this.s_role_id = s_role_id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getIsActive() {
        return isActive;
    }

    public void setIsActive(String isActive) {
        this.isActive = isActive;
    }
}
