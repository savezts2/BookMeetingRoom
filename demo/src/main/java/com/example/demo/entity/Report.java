package com.example.demo.entity;


import lombok.*;

import javax.persistence.*;

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

    private String date;

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

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
