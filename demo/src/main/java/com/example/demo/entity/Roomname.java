package com.example.demo.entity;


import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import java.util.Date;

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
    private Date update_date;
    private Date create_date;
    private String create_by;
    private String update_by;

    public Date getUpdate_date() {
        return update_date;
    }

    public void setUpdate_date(Date update_date) {
        this.update_date = update_date;
    }

    public Date getCreate_date() {
        return create_date;
    }

    public void setCreate_date(Date create_date) {
        this.create_date = create_date;
    }

    public String getCreate_by() {
        return create_by;
    }

    public void setCreate_by(String create_by) {
        this.create_by = create_by;
    }

    public String getUpdate_by() {
        return update_by;
    }

    public void setUpdate_by(String update_by) {
        this.update_by = update_by;
    }

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
