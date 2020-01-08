package com.example.demo.Controller;


import com.example.demo.entity.BookMeetingRoom;
import com.example.demo.entity.Report;
import com.example.demo.entity.Users;
import com.example.demo.repository.BookMeetingRoomRepository;
import com.example.demo.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("*")

public class ReportController {


    @Autowired
    private ReportRepository reportRepository;
    @Autowired
    private BookMeetingRoomRepository bookMeetingRoomRepository;

    @GetMapping("/Report")
    public Collection<Report> Actives() {
        return reportRepository.findAll().stream().filter(this::Reportactive).collect(Collectors.toList());
    }

    private boolean Reportactive(Report report) {
        return report.getIsActive().equals("1");
    }
    private boolean Bookactive(BookMeetingRoom bookMeetingRoom) {
        return bookMeetingRoom.getIsActive().equals("1");
    }

    @GetMapping("/Report/{date}")
    public Iterable<Report> Report(@PathVariable String date) {
        return this.reportRepository.getDateReport(date);
    }

    @GetMapping("/Report/{datestart}/{dateend}")
    public Iterable<Report> getDateDashBoard(@PathVariable String datestart , @PathVariable String dateend) {
        return this.reportRepository.getDateDashBoard(datestart,dateend);
    }

    @GetMapping("/ReportDashBoard/{datestart}/{dateend}")
    public Iterable<Report> getDateDashBoardReport(@PathVariable String datestart , @PathVariable String dateend) {
        return this.reportRepository.getDateDashBoardReport(datestart,dateend);
    }


    @Scheduled(fixedRate = 3000)
    public void scheduleTaskWithFixedRate() {

        List<BookMeetingRoom> bookMeetingRooms = bookMeetingRoomRepository.findAll().stream().filter(this::Bookactive).collect(Collectors.toList());

        BookMeetingRoom[] itemsArray = new BookMeetingRoom[bookMeetingRooms.size()];
        itemsArray = bookMeetingRooms.toArray(itemsArray);
        String hour = "";
        String minute = "";
        String fulltime;

        if( Integer.valueOf(BookMeetingRoomController.getHourCurrent()) < 10){
            hour = "0"+BookMeetingRoomController.getHourCurrent();
        }else{
            hour = BookMeetingRoomController.getHourCurrent();
        }

        if( Integer.valueOf(BookMeetingRoomController.getMinuteCurrent()) < 10){
            minute = "0"+BookMeetingRoomController.getMinuteCurrent();
        }else{
            minute = BookMeetingRoomController.getMinuteCurrent();
        }


        fulltime = hour+"."+minute;
        System.out.println(fulltime);

        for(int i = 0 ; i < itemsArray.length ; i++){

            if(itemsArray[i].getStatusbooking().equals("Booking")){
                if(fulltime.compareToIgnoreCase("08.14") == 1){
                    if(itemsArray[i].getStarttime().equals("08.00") && itemsArray[i].getStatusbooking().equals("Booking")){
                        BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findById(itemsArray[i].getBook_id()).get();
                        bookMeetingRoom.setStatusbooking("Not Checkin");
                        bookMeetingRoom.setLatetime(15);
                        bookMeetingRoom.setLate("late");
                        bookMeetingRoom.setUpdate_date(new Date());
                        bookMeetingRoom.setUpdate_by("Updatesys");
                        bookMeetingRoomRepository.save(bookMeetingRoom);
                    }
                }
                 if(fulltime.compareToIgnoreCase("09.14") == 1){
                    if(itemsArray[i].getStarttime().equals("09.00") && itemsArray[i].getStatusbooking().equals("Booking")){
                        BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findById(itemsArray[i].getBook_id()).get();
                        bookMeetingRoom.setStatusbooking("Not Checkin");
                        bookMeetingRoom.setLatetime(15);
                        bookMeetingRoom.setLate("late");
                        bookMeetingRoom.setUpdate_date(new Date());
                        bookMeetingRoom.setUpdate_by("Updatesys");
                        bookMeetingRoomRepository.save(bookMeetingRoom);
                    }
                }
                if(fulltime.compareToIgnoreCase("10.14") == 1){
                    if(itemsArray[i].getStarttime().equals("10.00") && itemsArray[i].getStatusbooking().equals("Booking")){
                        BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findById(itemsArray[i].getBook_id()).get();
                        bookMeetingRoom.setStatusbooking("Not Checkin");
                        bookMeetingRoom.setLatetime(15);
                        bookMeetingRoom.setLate("late");
                        bookMeetingRoom.setUpdate_date(new Date());
                        bookMeetingRoom.setUpdate_by("Updatesys");
                        bookMeetingRoomRepository.save(bookMeetingRoom);
                    }
                }
                if(fulltime.compareToIgnoreCase("11.14") == 1){
                    if(itemsArray[i].getStarttime().equals("11.00") && itemsArray[i].getStatusbooking().equals("Booking")){
                        BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findById(itemsArray[i].getBook_id()).get();
                        bookMeetingRoom.setStatusbooking("Not Checkin");
                        bookMeetingRoom.setLatetime(15);
                        bookMeetingRoom.setLate("late");
                        bookMeetingRoom.setUpdate_date(new Date());
                        bookMeetingRoom.setUpdate_by("Updatesys");
                        bookMeetingRoomRepository.save(bookMeetingRoom);
                    }
                }
                if(fulltime.compareToIgnoreCase("12.14") == 1){
                    if(itemsArray[i].getStarttime().equals("12.00") && itemsArray[i].getStatusbooking().equals("Booking")){
                        BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findById(itemsArray[i].getBook_id()).get();
                        bookMeetingRoom.setStatusbooking("Not Checkin");
                        bookMeetingRoom.setLatetime(15);
                        bookMeetingRoom.setLate("late");
                        bookMeetingRoom.setUpdate_date(new Date());
                        bookMeetingRoom.setUpdate_by("Updatesys");
                        bookMeetingRoomRepository.save(bookMeetingRoom);
                    }
                }
                if(fulltime.compareToIgnoreCase("13.14") == 1){
                    if(itemsArray[i].getStarttime().equals("13.00") && itemsArray[i].getStatusbooking().equals("Booking")){
                        BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findById(itemsArray[i].getBook_id()).get();
                        bookMeetingRoom.setStatusbooking("Not Checkin");
                        bookMeetingRoom.setLatetime(15);
                        bookMeetingRoom.setLate("late");
                        bookMeetingRoom.setUpdate_date(new Date());
                        bookMeetingRoom.setUpdate_by("Updatesys");
                        bookMeetingRoomRepository.save(bookMeetingRoom);
                    }
                }
                if(fulltime.compareToIgnoreCase("14.14") == 1){
                    if(itemsArray[i].getStarttime().equals("14.00") && itemsArray[i].getStatusbooking().equals("Booking")){
                        BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findById(itemsArray[i].getBook_id()).get();
                        bookMeetingRoom.setStatusbooking("Not Checkin");
                        bookMeetingRoom.setLatetime(15);
                        bookMeetingRoom.setLate("late");
                        bookMeetingRoom.setUpdate_date(new Date());
                        bookMeetingRoom.setUpdate_by("Updatesys");
                        bookMeetingRoomRepository.save(bookMeetingRoom);
                    }
                }
                if(fulltime.compareToIgnoreCase("15.14") == 1){
                    if(itemsArray[i].getStarttime().equals("15.00") && itemsArray[i].getStatusbooking().equals("Booking")){
                        BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findById(itemsArray[i].getBook_id()).get();
                        bookMeetingRoom.setStatusbooking("Not Checkin");
                        bookMeetingRoom.setLatetime(15);
                        bookMeetingRoom.setLate("late");
                        bookMeetingRoom.setUpdate_date(new Date());
                        bookMeetingRoom.setUpdate_by("Updatesys");
                        bookMeetingRoomRepository.save(bookMeetingRoom);
                    }
                }
                if(fulltime.compareToIgnoreCase("16.14") == 1){
                    if(itemsArray[i].getStarttime().equals("16.00") && itemsArray[i].getStatusbooking().equals("Booking")){
                        BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findById(itemsArray[i].getBook_id()).get();
                        bookMeetingRoom.setStatusbooking("Not Checkin");
                        bookMeetingRoom.setLatetime(15);
                        bookMeetingRoom.setLate("late");
                        bookMeetingRoom.setUpdate_date(new Date());
                        bookMeetingRoom.setUpdate_by("Updatesys");
                        bookMeetingRoomRepository.save(bookMeetingRoom);
                    }
                }
                if(fulltime.compareToIgnoreCase("17.14") == 1){
                    if(itemsArray[i].getStarttime().equals("17.00") && itemsArray[i].getStatusbooking().equals("Booking")){
                        BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findById(itemsArray[i].getBook_id()).get();
                        bookMeetingRoom.setStatusbooking("Not Checkin");
                        bookMeetingRoom.setLatetime(15);
                        bookMeetingRoom.setLate("late");
                        bookMeetingRoom.setUpdate_date(new Date());
                        bookMeetingRoom.setUpdate_by("Updatesys");
                        bookMeetingRoomRepository.save(bookMeetingRoom);
                    }
                }
                if(fulltime.compareToIgnoreCase("18.14") == 1){
                    if(itemsArray[i].getStarttime().equals("18.00") && itemsArray[i].getStatusbooking().equals("Booking")){
                        BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findById(itemsArray[i].getBook_id()).get();
                        bookMeetingRoom.setStatusbooking("Not Checkin");
                        bookMeetingRoom.setLatetime(15);
                        bookMeetingRoom.setLate("late");
                        bookMeetingRoom.setUpdate_date(new Date());
                        bookMeetingRoom.setUpdate_by("Updatesys");
                        bookMeetingRoomRepository.save(bookMeetingRoom);
                    }
                }
                if(fulltime.compareToIgnoreCase("19.14") == 1){
                    if(itemsArray[i].getStarttime().equals("19.00") && itemsArray[i].getStatusbooking().equals("Booking")){
                        BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findById(itemsArray[i].getBook_id()).get();
                        bookMeetingRoom.setStatusbooking("Not Checkin");
                        bookMeetingRoom.setLatetime(15);
                        bookMeetingRoom.setLate("late");
                        bookMeetingRoom.setUpdate_date(new Date());
                        bookMeetingRoom.setUpdate_by("Updatesys");
                        bookMeetingRoomRepository.save(bookMeetingRoom);
                    }
                }
                if(fulltime.compareToIgnoreCase("20.14") == 1){
                    if(itemsArray[i].getStarttime().equals("20.00") && itemsArray[i].getStatusbooking().equals("Booking")){
                        BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findById(itemsArray[i].getBook_id()).get();
                        bookMeetingRoom.setStatusbooking("Not Checkin");
                        bookMeetingRoom.setLatetime(15);
                        bookMeetingRoom.setLate("late");
                        bookMeetingRoom.setUpdate_date(new Date());
                        bookMeetingRoom.setUpdate_by("Updatesys");
                        bookMeetingRoomRepository.save(bookMeetingRoom);
                    }
                }
                if(fulltime.compareToIgnoreCase("21.14") == 1){
                    if(itemsArray[i].getStarttime().equals("21.00") && itemsArray[i].getStatusbooking().equals("Booking")){
                        BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findById(itemsArray[i].getBook_id()).get();
                        bookMeetingRoom.setStatusbooking("Not Checkin");
                        bookMeetingRoom.setLatetime(15);
                        bookMeetingRoom.setLate("late");
                        bookMeetingRoom.setUpdate_date(new Date());
                        bookMeetingRoom.setUpdate_by("Updatesys");
                        bookMeetingRoomRepository.save(bookMeetingRoom);
                    }
                }
                if(fulltime.compareToIgnoreCase("22.14") == 1){
                    if(itemsArray[i].getStarttime().equals("22.00") && itemsArray[i].getStatusbooking().equals("Booking")){
                        BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findById(itemsArray[i].getBook_id()).get();
                        bookMeetingRoom.setStatusbooking("Not Checkin");
                        bookMeetingRoom.setLatetime(15);
                        bookMeetingRoom.setLate("late");
                        bookMeetingRoom.setUpdate_date(new Date());
                        bookMeetingRoom.setUpdate_by("Updatesys");
                        bookMeetingRoomRepository.save(bookMeetingRoom);
                    }
                }
            }

        }
    }




}
