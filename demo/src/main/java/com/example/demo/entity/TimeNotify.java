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

@EqualsAndHashCode
public class TimeNotify {


    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long time_id;

    private int timenotify;

    private String isActive;


    public TimeNotify(){}

    public String getIsActive() {
        return isActive;
    }

    public void setIsActive(String isActive) {
        this.isActive = isActive;
    }

    public Long getTime_id() {
        return time_id;
    }

    public void setTime_id(Long time_id) {
        this.time_id = time_id;
    }

    public int getTimenotify() {
        return timenotify;
    }

    public void setTimenotify(int timenotify) {
        this.timenotify = timenotify;
    }
}
