package com.example.demo.entity;


import lombok.*;

import javax.persistence.*;

@Entity
@Data
@Setter
@Getter
@NoArgsConstructor
@EqualsAndHashCode
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long user_id;

    private String firstname;

    private String Lastname;

    private String username;

    private String password;

    private String isActive;

    private String department;

    private String position;

    private String status;


    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getIsActive() {
        return isActive;
    }

    public void setIsActive(String isActive) {
        this.isActive = isActive;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }



    public String getLastname() {
        return Lastname;
    }

    public void setLastname(String lastname) {
        Lastname = lastname;
    }




    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
