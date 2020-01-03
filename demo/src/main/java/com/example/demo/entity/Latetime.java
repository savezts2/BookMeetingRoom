package com.example.demo.entity;


import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data
@Setter
@Getter
@NoArgsConstructor
@EqualsAndHashCode
public class Latetime {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long latetime_id;

    private int latetimecheckout;

    private String isActive;

    public Long getLatetime_id() {
        return latetime_id;
    }

    public void setLatetime_id(Long latetime_id) {
        this.latetime_id = latetime_id;
    }

    public int getLatetimecheckout() {
        return latetimecheckout;
    }

    public void setLatetimecheckout(int latetimecheckout) {
        this.latetimecheckout = latetimecheckout;
    }

    public String getIsActive() {
        return isActive;
    }

    public void setIsActive(String isActive) {
        this.isActive = isActive;
    }
}
