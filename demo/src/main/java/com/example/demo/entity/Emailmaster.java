package com.example.demo.entity;


import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

@Entity
@Data
@Setter
@Getter
@NoArgsConstructor
@EqualsAndHashCode
public class Emailmaster {

    @Id
    @SequenceGenerator(initialValue=1,
            allocationSize=1,
            name = "email_seq",
            sequenceName="email_seq")
    @GeneratedValue(generator="email_seq")
    private Long emailmaster_id;

    private String email;
    private String firstname ;
    private String isActive;

    public Long getEmailmaster_id() {
        return emailmaster_id;
    }

    public void setEmailmaster_id(Long emailmaster_id) {
        this.emailmaster_id = emailmaster_id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getIsActive() {
        return isActive;
    }

    public void setIsActive(String isActive) {
        this.isActive = isActive;
    }
}
