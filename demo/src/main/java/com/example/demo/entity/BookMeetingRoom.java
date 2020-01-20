package com.example.demo.entity;


import lombok.*;

import javax.persistence.*;
import java.util.Date;


@Entity
@Data
@Setter
@Getter
@NoArgsConstructor
@EqualsAndHashCode
public class BookMeetingRoom {

    @Id
    @SequenceGenerator(initialValue=1,
            allocationSize=1,
            name = "book_seq",
            sequenceName="book_seq")
    @GeneratedValue(generator="book_seq")
    private Long book_id;

    private String dateBookMeetingRoom ;

    private String starttime;

    private String endtime;

    private String telbookingby;

    private String topic;

    private String attendees;

    private String remark ;


    @ManyToOne
    private Roomname roomname;

    private int lengthtime;

    private String isActive;

    private String statusbooking;

    private Date update_date;
    private Date create_date;
    private String create_by;
    private String update_by;

        private int latetime;
        private String late;
        private String checkintime;
        private String checkouttime;
        private String checkinby;
        private String checkoutby;

        private String notify;
        private String checklate;
        private String sendemailto;

    public String getSendemailto() {
        return sendemailto;
    }

    public void setSendemailto(String sendemailto) {
        this.sendemailto = sendemailto;
    }

    public String getChecklate() {
        return checklate;
    }

    public void setChecklate(String checklate) {
        this.checklate = checklate;
    }

    public String getNotify() {
        return notify;
    }

    public void setNotify(String notify) {
        this.notify = notify;
    }

    public Roomname getRoomname() {
        return roomname;
    }

    public String getCheckintime() {
        return checkintime;
    }

    public void setCheckintime(String checkintime) {
        this.checkintime = checkintime;
    }

    public String getCheckouttime() {
        return checkouttime;
    }

    public void setCheckouttime(String checkouttime) {
        this.checkouttime = checkouttime;
    }

    public String getCheckinby() {
        return checkinby;
    }

    public void setCheckinby(String checkinby) {
        this.checkinby = checkinby;
    }

    public String getCheckoutby() {
        return checkoutby;
    }

    public void setCheckoutby(String checkoutby) {
        this.checkoutby = checkoutby;
    }

    public void setRoomname(Roomname roomname) {
        this.roomname = roomname;
    }

    public int getLatetime() {
        return latetime;
    }

    public void setLatetime(int latetime) {
        this.latetime = latetime;
    }

    public String getLate() {
        return late;
    }

    public void setLate(String late) {
        this.late = late;
    }

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

    public String getStatusbooking() {
        return statusbooking;
    }

    public void setStatusbooking(String statusbooking) {
        this.statusbooking = statusbooking;
    }

    public String getIsActive() {
        return isActive;
    }

    public void setIsActive(String isActive) {
        this.isActive = isActive;
    }

    public Long getBook_id() {
        return book_id;
    }

    public void setBook_id(Long book_id) {
        this.book_id = book_id;
    }

    public String getDateBookMeetingRoom() {
        return dateBookMeetingRoom;
    }

    public void setDateBookMeetingRoom(String dateBookMeetingRoom) {
        this.dateBookMeetingRoom = dateBookMeetingRoom;
    }

    public String getStarttime() {
        return starttime;
    }

    public void setStarttime(String starttime) {
        this.starttime = starttime;
    }

    public String getEndtime() {
        return endtime;
    }

    public void setEndtime(String endtime) {
        this.endtime = endtime;
    }

    public String getTelbookingby() {
        return telbookingby;
    }

    public void setTelbookingby(String telbookingby) {
        this.telbookingby = telbookingby;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getAttendees() {
        return attendees;
    }

    public void setAttendees(String attendees) {
        this.attendees = attendees;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }



    public int getLengthtime() {
        return lengthtime;
    }

    public void setLengthtime(int lengthtime) {
        this.lengthtime = lengthtime;
    }


}
