package com.example.demo.Controller;


import com.example.demo.entity.BookMeetingRoom;
import com.example.demo.entity.Report;
import com.example.demo.entity.Users;
import com.example.demo.repository.BookMeetingRoomRepository;
import com.example.demo.repository.ReportRepository;
import com.example.demo.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;


@RestController
@CrossOrigin("*")

public class BookMeetingRoomController {

    @Autowired
    private BookMeetingRoomRepository bookMeetingRoomRepository;
    @Autowired
    private UsersRepository usersRepository;
    @Autowired
    private ReportRepository reportRepository;

    @GetMapping("/BookMeetingRoom/{date}")
    public Iterable<BookMeetingRoom> Bookmaster(@PathVariable String date) {
        return this.bookMeetingRoomRepository.getBookmaster(date);
    }



    @PostMapping(path = "/CancelBooking/{dateBookMeetingRoom}/{roomname}/{starttime}")
    public BookMeetingRoom bookMeetingRoom2(@PathVariable String dateBookMeetingRoom, @PathVariable String roomname, @PathVariable String starttime) {
        BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findByDateBookMeetingRoomAndRoomnameAndStarttimeAndIsActive(dateBookMeetingRoom,roomname,starttime,"1");
        bookMeetingRoom.setIsActive("0");
        bookMeetingRoomRepository.save(bookMeetingRoom);
        Report report = reportRepository.findByBookMeetingRoom(bookMeetingRoom);
        report.setIsActive("0");
        reportRepository.save(report);
        return bookMeetingRoom;
    }




    @PostMapping(path = "/{userid}/{fromtime}/{totime}/{tel}/{topic}/{atten}/{remark}/{roomname}/{date}")
    public BookMeetingRoom bookMeetingRoom(@PathVariable String userid, @PathVariable String fromtime, @PathVariable String totime,
                                     @PathVariable String  tel, @PathVariable String topic,@PathVariable String atten,@PathVariable String remark
            ,@PathVariable String roomname ,@PathVariable String date) throws Exception {
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
        bookMeetingRoom.setIsActive("1");
        bookMeetingRoomRepository.save(bookMeetingRoom);

        Users users = usersRepository.findByUsername(userid);


        Report report = new Report();
        report.setBookMeetingRoom(bookMeetingRoom);
        report.setDate(date);
        report.setUsers(users);
        SimpleDateFormat formatter2=new SimpleDateFormat("dd-MM-yyyy");
        String[] dateSplit;
        dateSplit = date.split("-");
        int yearSplit = Integer.valueOf(dateSplit[2]) + 543 ;
        String fullPatternyear = dateSplit[0] + '-' + dateSplit[1] + '-' + String.valueOf(yearSplit);
        Date date2=formatter2.parse(fullPatternyear);
        report.setDateBook(date2);
        report.setIsActive("1");
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
