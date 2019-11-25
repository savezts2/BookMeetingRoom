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
    @SequenceGenerator(name = "report_seq", sequenceName = "report_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "report_seq")
    private Long report_id;

    @ManyToOne
    private Users users;

    @ManyToOne
    private BookMeetingRoom bookMeetingRoom;

    @Temporal(TemporalType.DATE)
    private Date dateBook;

    private String date;

    private String isActive;

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
