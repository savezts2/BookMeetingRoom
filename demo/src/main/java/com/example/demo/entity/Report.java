package com.example.demo.entity;


import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Data
@Setter
@Getter
@NoArgsConstructor
@EqualsAndHashCode
public class Report {

    @Id
    @SequenceGenerator(initialValue=1,
            allocationSize=1,
            name = "report_seq",
            sequenceName="report_seq")
    @GeneratedValue(generator="report_seq")
    private Long report_id;

    @ManyToOne
    private Users users;

    @ManyToOne
    private BookMeetingRoom bookMeetingRoom;

    @Temporal(TemporalType.DATE)
    private Date dateBook;

    private String date;

    private String isActive;



    private Date update_date;
    private Date create_date;
    private String create_by;
    private String update_by;
    private String roomnamebook;

    public String getRoomnamebook() {
        return roomnamebook;
    }

    public void setRoomnamebook(String roomnamebook) {
        this.roomnamebook = roomnamebook;
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

    public String getIsActive() {
        return isActive;
    }

    public void setIsActive(String isActive) {
        this.isActive = isActive;
    }

    public Long getReport_id() {
        return report_id;
    }

    public void setReport_id(Long report_id) {
        this.report_id = report_id;
    }

    public Users getUsers() {
        return users;
    }

    public void setUsers(Users users) {
        this.users = users;
    }

    public BookMeetingRoom getBookMeetingRoom() {
        return bookMeetingRoom;
    }

    public void setBookMeetingRoom(BookMeetingRoom bookMeetingRoom) {
        this.bookMeetingRoom = bookMeetingRoom;
    }

    public Date getDateBook() {
        return dateBook;
    }

    public void setDateBook(Date dateBook) {
        this.dateBook = dateBook;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

}
