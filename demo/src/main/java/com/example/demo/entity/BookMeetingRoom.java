package com.example.demo.entity;


import lombok.*;

import javax.persistence.*;


@Entity
@Data
@Setter
@Getter
@NoArgsConstructor
@EqualsAndHashCode
public class BookMeetingRoom {

    @Id
    @SequenceGenerator(name = "book_seq", sequenceName = "book_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "book_seq")
    private Long book_id;

    private String dateBookMeetingRoom ;

    private String starttime;

    private String endtime;

    private String telbookingby;

    private String topic;

    private String attendees;

    private String remark ;

    private String roomname;

    private int lengthtime;

    private String isActive;


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

    public String getRoomname() {
        return roomname;
    }

    public void setRoomname(String roomname) {
        this.roomname = roomname;
    }

    public int getLengthtime() {
        return lengthtime;
    }

    public void setLengthtime(int lengthtime) {
        this.lengthtime = lengthtime;
    }


}
