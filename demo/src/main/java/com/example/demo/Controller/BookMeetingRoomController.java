package com.example.demo.Controller;


import com.example.demo.entity.BookMeetingRoom;
import com.example.demo.entity.Report;
import com.example.demo.entity.Users;
import com.example.demo.repository.BookMeetingRoomRepository;
import com.example.demo.repository.ReportRepository;
import com.example.demo.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.stream.Collectors;


@RestController
@CrossOrigin(origins = "*")
public class BookMeetingRoomController {

    @Autowired
    private BookMeetingRoomRepository bookMeetingRoomRepository;
    @Autowired
    private UsersRepository usersRepository;
    @Autowired
    private ReportRepository reportRepository;

    @PostMapping("/BookMeetingRoom/Bookmaster/{date}")
    public Iterable<BookMeetingRoom> Bookmaster(@PathVariable String date) {
        return this.bookMeetingRoomRepository.getBookmaster(date);
    }


    @PostMapping(path = "/BookMeetingRoom/{userid}/{fromtime}/{totime}/{tel}/{topic}/{atten}/{remark}/{roomname}/{date}")
    public BookMeetingRoom bookMeetingRoom(@PathVariable String userid, @PathVariable String fromtime, @PathVariable String totime,
                                     @PathVariable String  tel, @PathVariable String topic,@PathVariable String atten,@PathVariable String remark
            ,@PathVariable String roomname ,@PathVariable String date) {
        BookMeetingRoom bookMeetingRoom = new BookMeetingRoom();
        bookMeetingRoom.setStarttime(fromtime);
        bookMeetingRoom.setEndtime(totime);
        bookMeetingRoom.setTelbookingby(tel);
        bookMeetingRoom.setTopic(topic);
        bookMeetingRoom.setAttendees(atten);
        bookMeetingRoom.setRemark(remark);
        int length = convertLengthTime(fromtime,totime);
        bookMeetingRoom.setLengthtime(length);
        bookMeetingRoom.setRoomname(roomname);
        bookMeetingRoom.setDateBookMeetingRoom(date);
        bookMeetingRoomRepository.save(bookMeetingRoom);

        Users users = usersRepository.findByuserid(userid);


        Report report = new Report();
        report.setBookMeetingRoom(bookMeetingRoom);
        report.setDate(date);
        report.setUsers(users);
        reportRepository.save(report);



        return bookMeetingRoom;
    }

    public static int convertLengthTime(String fromtime, String totime){
        int length = 0 ;
        String from , to ;
        from = fromtime.substring(0,2);
        to = totime.substring(0,2);
        length = Integer.parseInt(to) - Integer.parseInt(from) + 1;
        return length ;
    }


}
