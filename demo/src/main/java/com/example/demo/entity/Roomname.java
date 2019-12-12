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
public class Roomname {

    @Id
    @SequenceGenerator(initialValue=1,
            allocationSize=1,
            name = "roomn_seq",
            sequenceName="roomn_seq")
    @GeneratedValue(generator="roomn_seq")
    private Long roomname_id;

    private String roomnames;
    private String isActive;

    public Long getRoomname_id() {
        return roomname_id;
    }

    public void setRoomname_id(Long roomname_id) {
        this.roomname_id = roomname_id;
    }

    public String getRoomnames() {
        return roomnames;
    }

    public void setRoomnames(String roomnames) {
        this.roomnames = roomnames;
    }

    public String getIsActive() {
        return isActive;
    }

    public void setIsActive(String isActive) {
        this.isActive = isActive;
    }
}
