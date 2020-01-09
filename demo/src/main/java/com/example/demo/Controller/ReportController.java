package com.example.demo.Controller;


import com.example.demo.entity.BookMeetingRoom;
import com.example.demo.entity.Latetime;
import com.example.demo.entity.Report;
import com.example.demo.entity.Users;
import com.example.demo.repository.BookMeetingRoomRepository;
import com.example.demo.repository.LatetimeRepository;
import com.example.demo.repository.MailService;
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
    @Autowired
    private LatetimeRepository latetimeRepository;
    @Autowired
    private MailService notificationService;
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
       // System.out.println(fulltime);

        Date date = new Date();
      //  System.out.println(date);
        long id = 1 ;
        String latetimeString ;
        Latetime latetime = latetimeRepository.findById(id).get();
       // System.out.println(latetime.getLatetimecheckout());
        if(latetime.getLatetimecheckout() - 1 < 10){
            latetimeString = "0"+(latetime.getLatetimecheckout()-1);
        }else{
            latetimeString = ""+(latetime.getLatetimecheckout()-1);
        }

        for(int i = 0 ; i < itemsArray.length ; i++){

            Date date2 = new Date(itemsArray[i].getDateBookMeetingRoom().substring(3,5)+'/'+itemsArray[i].getDateBookMeetingRoom().substring(0,2) + "/"+
                    itemsArray[i].getDateBookMeetingRoom().substring(6,10));




            ////////////////////////////////////   ////////////////////
            ///             late 15 To day                      ///
            //////////////////////////////////////////////////////
            if(itemsArray[i].getStatusbooking().equals("Booking")){

                if(fulltime.compareToIgnoreCase("08.14") == 1 && date2.before(date)){
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
                 if(fulltime.compareToIgnoreCase("09.14") == 1 && date2.before(date)){
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
                if(fulltime.compareToIgnoreCase("10.14") == 1 && date2.before(date)){
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
                if(fulltime.compareToIgnoreCase("11.14") == 1 && date2.before(date)){
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
                if(fulltime.compareToIgnoreCase("12.14") == 1 && date2.before(date)){
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
                if(fulltime.compareToIgnoreCase("13.14") == 1 && date2.before(date)){

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
                if(fulltime.compareToIgnoreCase("14.14") == 1 && date2.before(date)){
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
                if(fulltime.compareToIgnoreCase("15.14") == 1 && date2.before(date)){
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
                if(fulltime.compareToIgnoreCase("16.14") == 1 && date2.before(date)){
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
                if(fulltime.compareToIgnoreCase("17.14") == 1 && date2.before(date)){
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
                if(fulltime.compareToIgnoreCase("18.14") == 1 && date2.before(date)){
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
                if(fulltime.compareToIgnoreCase("19.14") == 1 && date2.before(date)){
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
                if(fulltime.compareToIgnoreCase("20.14") == 1 && date2.before(date)){
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
                if(fulltime.compareToIgnoreCase("21.14") == 1 && date2.before(date)){
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
                if(fulltime.compareToIgnoreCase("22.14") == 1 && date2.before(date)){
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

            ////////////////////////////////////////////////
            ///             Over late                   ////
            ////////////////////////////////////////////////

           // System.out.println("08."+latetimeString);

            if( fulltime.compareToIgnoreCase("08."+latetimeString) == 1 && date2.before(date)){

                if(itemsArray[i].getStarttime().equals("08.00") && (itemsArray[i].getStatusbooking().equals("Not Checkin") ||
                        itemsArray[i].getStatusbooking().equals("Booking")) && (itemsArray[i].getLatetime() == 15 || itemsArray[i].getLatetime() == 0)){
                    System.out.println("Success");
                    BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findById(itemsArray[i].getBook_id()).get();
                    bookMeetingRoom.setStatusbooking("Not Checkin");
                    bookMeetingRoom.setEndtime("08.00");
                    bookMeetingRoom.setLengthtime(1);
                    bookMeetingRoom.setLatetime(Integer.valueOf(latetimeString));
                    bookMeetingRoom.setLate("Late");
                    bookMeetingRoom.setUpdate_date(new Date());
                    bookMeetingRoom.setUpdate_by("Updatesys");
                    bookMeetingRoom.setCheckoutby("Checkoutsys");
                    bookMeetingRoom.setCheckouttime(fulltime);
                    bookMeetingRoomRepository.save(bookMeetingRoom);
                    Report report = reportRepository.findByBookMeetingRoom(bookMeetingRoom);
                    notificationService.sendNotifyNotCheckin(report.getUsers().getEmail());
                }

            }
            if( fulltime.compareToIgnoreCase("09."+latetimeString) == 1 && date2.before(date)){

                if(itemsArray[i].getStarttime().equals("09.00") && (itemsArray[i].getStatusbooking().equals("Not Checkin") ||
                        itemsArray[i].getStatusbooking().equals("Booking")) && (itemsArray[i].getLatetime() == 15 || itemsArray[i].getLatetime() == 0)){
                    System.out.println("Success");
                    BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findById(itemsArray[i].getBook_id()).get();
                    bookMeetingRoom.setStatusbooking("Not Checkin");
                    bookMeetingRoom.setEndtime("09.00");
                    bookMeetingRoom.setLengthtime(1);
                    bookMeetingRoom.setLatetime(Integer.valueOf(latetimeString));
                    bookMeetingRoom.setLate("Late");
                    bookMeetingRoom.setUpdate_date(new Date());
                    bookMeetingRoom.setUpdate_by("Updatesys");
                    bookMeetingRoom.setCheckoutby("Checkoutsys");
                    bookMeetingRoom.setCheckouttime(fulltime);
                    bookMeetingRoomRepository.save(bookMeetingRoom);
                    Report report = reportRepository.findByBookMeetingRoom(bookMeetingRoom);
                    notificationService.sendNotifyNotCheckin(report.getUsers().getEmail());
                }

            }
            if( fulltime.compareToIgnoreCase("10."+latetimeString) == 1 && date2.before(date)){

                if(itemsArray[i].getStarttime().equals("10.00") && (itemsArray[i].getStatusbooking().equals("Not Checkin") ||
                        itemsArray[i].getStatusbooking().equals("Booking")) && (itemsArray[i].getLatetime() == 15 || itemsArray[i].getLatetime() == 0)){
                    System.out.println("Success");
                    BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findById(itemsArray[i].getBook_id()).get();
                    bookMeetingRoom.setStatusbooking("Not Checkin");
                    bookMeetingRoom.setEndtime("10.00");
                    bookMeetingRoom.setLengthtime(1);
                    bookMeetingRoom.setLatetime(Integer.valueOf(latetimeString));
                    bookMeetingRoom.setLate("Late");
                    bookMeetingRoom.setUpdate_date(new Date());
                    bookMeetingRoom.setUpdate_by("Updatesys");
                    bookMeetingRoom.setCheckoutby("Checkoutsys");
                    bookMeetingRoom.setCheckouttime(fulltime);
                    bookMeetingRoomRepository.save(bookMeetingRoom);
                    Report report = reportRepository.findByBookMeetingRoom(bookMeetingRoom);
                    notificationService.sendNotifyNotCheckin(report.getUsers().getEmail());
                }
            }
            if( fulltime.compareToIgnoreCase("11."+latetimeString) == 1 && date2.before(date)){
                if(itemsArray[i].getStarttime().equals("11.00") && (itemsArray[i].getStatusbooking().equals("Not Checkin") ||
                        itemsArray[i].getStatusbooking().equals("Booking")) && (itemsArray[i].getLatetime() == 15 || itemsArray[i].getLatetime() == 0)){
                    System.out.println("Success");
                    BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findById(itemsArray[i].getBook_id()).get();
                    bookMeetingRoom.setStatusbooking("Not Checkin");
                    bookMeetingRoom.setEndtime("11.00");
                    bookMeetingRoom.setLengthtime(1);
                    bookMeetingRoom.setLatetime(Integer.valueOf(latetimeString));
                    bookMeetingRoom.setLate("Late");
                    bookMeetingRoom.setUpdate_date(new Date());
                    bookMeetingRoom.setUpdate_by("Updatesys");
                    bookMeetingRoom.setCheckoutby("Checkoutsys");
                    bookMeetingRoom.setCheckouttime(fulltime);
                    bookMeetingRoomRepository.save(bookMeetingRoom);
                    Report report = reportRepository.findByBookMeetingRoom(bookMeetingRoom);
                    notificationService.sendNotifyNotCheckin(report.getUsers().getEmail());
                }

            }
            if( fulltime.compareToIgnoreCase("12."+latetimeString) == 1 && date2.before(date)){

                if(itemsArray[i].getStarttime().equals("12.00") && (itemsArray[i].getStatusbooking().equals("Not Checkin") ||
                        itemsArray[i].getStatusbooking().equals("Booking")) && (itemsArray[i].getLatetime() == 15 || itemsArray[i].getLatetime() == 0)){
                    System.out.println("Success");
                    BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findById(itemsArray[i].getBook_id()).get();
                    bookMeetingRoom.setStatusbooking("Not Checkin");
                    bookMeetingRoom.setEndtime("12.00");
                    bookMeetingRoom.setLengthtime(1);
                    bookMeetingRoom.setLatetime(Integer.valueOf(latetimeString));
                    bookMeetingRoom.setLate("Late");
                    bookMeetingRoom.setUpdate_date(new Date());
                    bookMeetingRoom.setUpdate_by("Updatesys");
                    bookMeetingRoom.setCheckoutby("Checkoutsys");
                    bookMeetingRoom.setCheckouttime(fulltime);
                    bookMeetingRoomRepository.save(bookMeetingRoom);
                    Report report = reportRepository.findByBookMeetingRoom(bookMeetingRoom);
                    notificationService.sendNotifyNotCheckin(report.getUsers().getEmail());
                }
            }
            if( fulltime.compareToIgnoreCase("13."+latetimeString) == 1 && date2.before(date)){

                if(itemsArray[i].getStarttime().equals("13.00") && (itemsArray[i].getStatusbooking().equals("Not Checkin") ||
                        itemsArray[i].getStatusbooking().equals("Booking")) && (itemsArray[i].getLatetime() == 15 || itemsArray[i].getLatetime() == 0)){
                    System.out.println("Success");
                    BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findById(itemsArray[i].getBook_id()).get();
                    bookMeetingRoom.setStatusbooking("Not Checkin");
                    bookMeetingRoom.setEndtime("13.00");
                    bookMeetingRoom.setLengthtime(1);
                    bookMeetingRoom.setLatetime(Integer.valueOf(latetimeString));
                    bookMeetingRoom.setLate("Late");
                    bookMeetingRoom.setUpdate_date(new Date());
                    bookMeetingRoom.setUpdate_by("Updatesys");
                    bookMeetingRoom.setCheckoutby("Checkoutsys");
                    bookMeetingRoom.setCheckouttime(fulltime);
                    bookMeetingRoomRepository.save(bookMeetingRoom);
                    Report report = reportRepository.findByBookMeetingRoom(bookMeetingRoom);
                    notificationService.sendNotifyNotCheckin(report.getUsers().getEmail());
                }
            }
            if( fulltime.compareToIgnoreCase("14."+latetimeString) == 1 && date2.before(date)){
                if(itemsArray[i].getStarttime().equals("14.00") && (itemsArray[i].getStatusbooking().equals("Not Checkin") ||
                        itemsArray[i].getStatusbooking().equals("Booking")) && (itemsArray[i].getLatetime() == 15 || itemsArray[i].getLatetime() == 0)){
                    System.out.println("Success");
                    BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findById(itemsArray[i].getBook_id()).get();
                    bookMeetingRoom.setStatusbooking("Not Checkin");
                    bookMeetingRoom.setEndtime("14.00");
                    bookMeetingRoom.setLengthtime(1);
                    bookMeetingRoom.setLatetime(Integer.valueOf(latetimeString));
                    bookMeetingRoom.setLate("Late");
                    bookMeetingRoom.setUpdate_date(new Date());
                    bookMeetingRoom.setUpdate_by("Updatesys");
                    bookMeetingRoom.setCheckoutby("Checkoutsys");
                    bookMeetingRoom.setCheckouttime(fulltime);
                    bookMeetingRoomRepository.save(bookMeetingRoom);
                    Report report = reportRepository.findByBookMeetingRoom(bookMeetingRoom);
                    notificationService.sendNotifyNotCheckin(report.getUsers().getEmail());
                }

            }
            if( fulltime.compareToIgnoreCase("15."+latetimeString) == 1 && date2.before(date)){

                if(itemsArray[i].getStarttime().equals("15.00") && (itemsArray[i].getStatusbooking().equals("Not Checkin") ||
                        itemsArray[i].getStatusbooking().equals("Booking")) && (itemsArray[i].getLatetime() == 15 || itemsArray[i].getLatetime() == 0)){
                    System.out.println("Success");
                    BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findById(itemsArray[i].getBook_id()).get();
                    bookMeetingRoom.setStatusbooking("Not Checkin");
                    bookMeetingRoom.setEndtime("15.00");
                    bookMeetingRoom.setLengthtime(1);
                    bookMeetingRoom.setLatetime(Integer.valueOf(latetimeString));
                    bookMeetingRoom.setLate("Late");
                    bookMeetingRoom.setUpdate_date(new Date());
                    bookMeetingRoom.setUpdate_by("Updatesys");
                    bookMeetingRoom.setCheckoutby("Checkoutsys");
                    bookMeetingRoom.setCheckouttime(fulltime);
                    bookMeetingRoomRepository.save(bookMeetingRoom);
                    Report report = reportRepository.findByBookMeetingRoom(bookMeetingRoom);
                    notificationService.sendNotifyNotCheckin(report.getUsers().getEmail());
                }
            }
            if( fulltime.compareToIgnoreCase("16."+latetimeString) == 1 && date2.before(date)){

                if(itemsArray[i].getStarttime().equals("16.00") && (itemsArray[i].getStatusbooking().equals("Not Checkin") ||
                        itemsArray[i].getStatusbooking().equals("Booking")) && (itemsArray[i].getLatetime() == 15 || itemsArray[i].getLatetime() == 0)){
                    System.out.println("Success");
                    BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findById(itemsArray[i].getBook_id()).get();
                    bookMeetingRoom.setStatusbooking("Not Checkin");
                    bookMeetingRoom.setEndtime("16.00");
                    bookMeetingRoom.setLengthtime(1);
                    bookMeetingRoom.setLatetime(Integer.valueOf(latetimeString));
                    bookMeetingRoom.setLate("Late");
                    bookMeetingRoom.setUpdate_date(new Date());
                    bookMeetingRoom.setUpdate_by("Updatesys");
                    bookMeetingRoom.setCheckoutby("Checkoutsys");
                    bookMeetingRoom.setCheckouttime(fulltime);
                    bookMeetingRoomRepository.save(bookMeetingRoom);
                    Report report = reportRepository.findByBookMeetingRoom(bookMeetingRoom);
                    notificationService.sendNotifyNotCheckin(report.getUsers().getEmail());
                }
            }
            if( fulltime.compareToIgnoreCase("17."+latetimeString) == 1 && date2.before(date)){

                if(itemsArray[i].getStarttime().equals("17.00") && (itemsArray[i].getStatusbooking().equals("Not Checkin") ||
                        itemsArray[i].getStatusbooking().equals("Booking")) && (itemsArray[i].getLatetime() == 15 || itemsArray[i].getLatetime() == 0)){
                    System.out.println("Success");
                    BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findById(itemsArray[i].getBook_id()).get();
                    bookMeetingRoom.setStatusbooking("Not Checkin");
                    bookMeetingRoom.setEndtime("17.00");
                    bookMeetingRoom.setLengthtime(1);
                    bookMeetingRoom.setLatetime(Integer.valueOf(latetimeString));
                    bookMeetingRoom.setLate("Late");
                    bookMeetingRoom.setUpdate_date(new Date());
                    bookMeetingRoom.setUpdate_by("Updatesys");
                    bookMeetingRoom.setCheckoutby("Checkoutsys");
                    bookMeetingRoom.setCheckouttime(fulltime);
                    bookMeetingRoomRepository.save(bookMeetingRoom);
                    Report report = reportRepository.findByBookMeetingRoom(bookMeetingRoom);
                    notificationService.sendNotifyNotCheckin(report.getUsers().getEmail());
                }
            }
            if( fulltime.compareToIgnoreCase("18."+latetimeString) == 1 && date2.before(date)){

                if(itemsArray[i].getStarttime().equals("18.00") && (itemsArray[i].getStatusbooking().equals("Not Checkin") ||
                        itemsArray[i].getStatusbooking().equals("Booking")) && (itemsArray[i].getLatetime() == 15 || itemsArray[i].getLatetime() == 0)){
                    System.out.println("Success");
                    BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findById(itemsArray[i].getBook_id()).get();
                    bookMeetingRoom.setStatusbooking("Not Checkin");
                    bookMeetingRoom.setEndtime("18.00");
                    bookMeetingRoom.setLengthtime(1);
                    bookMeetingRoom.setLatetime(Integer.valueOf(latetimeString));
                    bookMeetingRoom.setLate("Late");
                    bookMeetingRoom.setUpdate_date(new Date());
                    bookMeetingRoom.setUpdate_by("Updatesys");
                    bookMeetingRoom.setCheckoutby("Checkoutsys");
                    bookMeetingRoom.setCheckouttime(fulltime);
                    bookMeetingRoomRepository.save(bookMeetingRoom);
                    Report report = reportRepository.findByBookMeetingRoom(bookMeetingRoom);
                    notificationService.sendNotifyNotCheckin(report.getUsers().getEmail());
                }
            }
            if( fulltime.compareToIgnoreCase("19."+latetimeString) == 1 && date2.before(date)){

                if(itemsArray[i].getStarttime().equals("19.00") && (itemsArray[i].getStatusbooking().equals("Not Checkin") ||
                        itemsArray[i].getStatusbooking().equals("Booking")) && (itemsArray[i].getLatetime() == 15 || itemsArray[i].getLatetime() == 0)){
                    BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findById(itemsArray[i].getBook_id()).get();
                    bookMeetingRoom.setStatusbooking("Not Checkin");
                    bookMeetingRoom.setEndtime("19.00");
                    bookMeetingRoom.setLengthtime(1);
                    bookMeetingRoom.setLatetime(Integer.valueOf(latetimeString));
                    bookMeetingRoom.setLate("Late");
                    bookMeetingRoom.setUpdate_date(new Date());
                    bookMeetingRoom.setUpdate_by("Updatesys");
                    bookMeetingRoom.setCheckoutby("Checkoutsys");
                    bookMeetingRoom.setCheckouttime(fulltime);
                    bookMeetingRoomRepository.save(bookMeetingRoom);
                    Report report = reportRepository.findByBookMeetingRoom(bookMeetingRoom);
                    notificationService.sendNotifyNotCheckin(report.getUsers().getEmail());
                }
            }
            if( fulltime.compareToIgnoreCase("20."+latetimeString) == 1 && date2.before(date)){

                if(itemsArray[i].getStarttime().equals("20.00") && (itemsArray[i].getStatusbooking().equals("Not Checkin") ||
                        itemsArray[i].getStatusbooking().equals("Booking")) && (itemsArray[i].getLatetime() == 15 || itemsArray[i].getLatetime() == 0)){
                    System.out.println("Success");
                    BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findById(itemsArray[i].getBook_id()).get();
                    bookMeetingRoom.setStatusbooking("Not Checkin");
                    bookMeetingRoom.setEndtime("20.00");
                    bookMeetingRoom.setLengthtime(1);
                    bookMeetingRoom.setLatetime(Integer.valueOf(latetimeString));
                    bookMeetingRoom.setLate("Late");
                    bookMeetingRoom.setUpdate_date(new Date());
                    bookMeetingRoom.setUpdate_by("Updatesys");
                    bookMeetingRoom.setCheckoutby("Checkoutsys");
                    bookMeetingRoom.setCheckouttime(fulltime);
                    bookMeetingRoomRepository.save(bookMeetingRoom);
                    Report report = reportRepository.findByBookMeetingRoom(bookMeetingRoom);
                    notificationService.sendNotifyNotCheckin(report.getUsers().getEmail());
                }
            }
            if( fulltime.compareToIgnoreCase("21."+latetimeString) == 1 && date2.before(date)){

                if(itemsArray[i].getStarttime().equals("21.00") && (itemsArray[i].getStatusbooking().equals("Not Checkin") ||
                        itemsArray[i].getStatusbooking().equals("Booking")) && (itemsArray[i].getLatetime() == 15 || itemsArray[i].getLatetime() == 0)){
                    System.out.println("Success");
                    BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findById(itemsArray[i].getBook_id()).get();
                    bookMeetingRoom.setStatusbooking("Not Checkin");
                    bookMeetingRoom.setEndtime("21.00");
                    bookMeetingRoom.setLengthtime(1);
                    bookMeetingRoom.setLatetime(Integer.valueOf(latetimeString));
                    bookMeetingRoom.setLate("Late");
                    bookMeetingRoom.setUpdate_date(new Date());
                    bookMeetingRoom.setUpdate_by("Updatesys");
                    bookMeetingRoom.setCheckoutby("Checkoutsys");
                    bookMeetingRoom.setCheckouttime(fulltime);
                    bookMeetingRoomRepository.save(bookMeetingRoom);
                    Report report = reportRepository.findByBookMeetingRoom(bookMeetingRoom);
                    notificationService.sendNotifyNotCheckin(report.getUsers().getEmail());
                }
            }
            if( fulltime.compareToIgnoreCase("22."+latetimeString) == 1 && date2.before(date)){

                if(itemsArray[i].getStarttime().equals("22.00") && (itemsArray[i].getStatusbooking().equals("Not Checkin") ||
                        itemsArray[i].getStatusbooking().equals("Booking")) && (itemsArray[i].getLatetime() == 15 || itemsArray[i].getLatetime() == 0)){
                    System.out.println("Success");
                    BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findById(itemsArray[i].getBook_id()).get();
                    bookMeetingRoom.setStatusbooking("Not Checkin");
                    bookMeetingRoom.setEndtime("22.00");
                    bookMeetingRoom.setLengthtime(1);
                    bookMeetingRoom.setLatetime(Integer.valueOf(latetimeString));
                    bookMeetingRoom.setLate("Late");
                    bookMeetingRoom.setUpdate_date(new Date());
                    bookMeetingRoom.setUpdate_by("Updatesys");
                    bookMeetingRoom.setCheckoutby("Checkoutsys");
                    bookMeetingRoom.setCheckouttime(fulltime);
                    bookMeetingRoomRepository.save(bookMeetingRoom);
                    Report report = reportRepository.findByBookMeetingRoom(bookMeetingRoom);
                    notificationService.sendNotifyNotCheckin(report.getUsers().getEmail());
                }
            }

            ////////////////////////////////////////////////////////
            ///             Checkout Auto                     ///
            //////////////////////////////////////////////////////
            if(itemsArray[i].getStatusbooking().equals("Checkin")){
                if(fulltime.compareToIgnoreCase("08.59") == 1 && date2.before(date)){
                    if(itemsArray[i].getEndtime().equals("09.00")){
                        BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findById(itemsArray[i].getBook_id()).get();
                        bookMeetingRoom.setCheckinby("Checkoutsys");
                        bookMeetingRoom.setCheckouttime(itemsArray[i].getEndtime());
                        bookMeetingRoom.setUpdate_by("Updatesys");
                        bookMeetingRoom.setUpdate_date(new Date());
                        bookMeetingRoom.setStatusbooking("Checkout");
                        bookMeetingRoomRepository.save(bookMeetingRoom);
                    }
                } if(fulltime.compareToIgnoreCase("09.59") == 1 && date2.before(date)){
                    if(itemsArray[i].getEndtime().equals("10.00")){
                        BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findById(itemsArray[i].getBook_id()).get();
                        bookMeetingRoom.setCheckinby("Checkoutsys");
                        bookMeetingRoom.setCheckouttime(itemsArray[i].getEndtime());
                        bookMeetingRoom.setUpdate_by("Updatesys");
                        bookMeetingRoom.setUpdate_date(new Date());
                        bookMeetingRoom.setStatusbooking("Checkout");
                        bookMeetingRoomRepository.save(bookMeetingRoom);
                    }
                } if(fulltime.compareToIgnoreCase("10.59") == 1 && date2.before(date)){
                    if(itemsArray[i].getEndtime().equals("11.00")){
                        BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findById(itemsArray[i].getBook_id()).get();
                        bookMeetingRoom.setCheckinby("Checkoutsys");
                        bookMeetingRoom.setCheckouttime(itemsArray[i].getEndtime());
                        bookMeetingRoom.setUpdate_by("Updatesys");
                        bookMeetingRoom.setUpdate_date(new Date());
                        bookMeetingRoom.setStatusbooking("Checkout");
                        bookMeetingRoomRepository.save(bookMeetingRoom);
                    }
                } if(fulltime.compareToIgnoreCase("11.59") == 1 && date2.before(date)){
                    if(itemsArray[i].getEndtime().equals("12.00")){
                        BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findById(itemsArray[i].getBook_id()).get();
                        bookMeetingRoom.setCheckinby("Checkoutsys");
                        bookMeetingRoom.setCheckouttime(itemsArray[i].getEndtime());
                        bookMeetingRoom.setUpdate_by("Updatesys");
                        bookMeetingRoom.setUpdate_date(new Date());
                        bookMeetingRoom.setStatusbooking("Checkout");
                        bookMeetingRoomRepository.save(bookMeetingRoom);
                    }
                } if(fulltime.compareToIgnoreCase("12.59") == 1 && date2.before(date)){
                    if(itemsArray[i].getEndtime().equals("13.00")){
                        BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findById(itemsArray[i].getBook_id()).get();
                        bookMeetingRoom.setCheckinby("Checkoutsys");
                        bookMeetingRoom.setCheckouttime(itemsArray[i].getEndtime());
                        bookMeetingRoom.setUpdate_by("Updatesys");
                        bookMeetingRoom.setUpdate_date(new Date());
                        bookMeetingRoom.setStatusbooking("Checkout");
                        bookMeetingRoomRepository.save(bookMeetingRoom);
                    }
                } if(fulltime.compareToIgnoreCase("13.59") == 1 && date2.before(date)){
                    if(itemsArray[i].getEndtime().equals("14.00")){
                        BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findById(itemsArray[i].getBook_id()).get();
                        bookMeetingRoom.setCheckinby("Checkoutsys");
                        bookMeetingRoom.setCheckouttime(itemsArray[i].getEndtime());
                        bookMeetingRoom.setUpdate_by("Updatesys");
                        bookMeetingRoom.setUpdate_date(new Date());
                        bookMeetingRoom.setStatusbooking("Checkout");
                        bookMeetingRoomRepository.save(bookMeetingRoom);
                    }
                } if(fulltime.compareToIgnoreCase("14.59") == 1 && date2.before(date)){
                    if(itemsArray[i].getEndtime().equals("15.00")){
                        BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findById(itemsArray[i].getBook_id()).get();
                        bookMeetingRoom.setCheckinby("Checkoutsys");
                        bookMeetingRoom.setCheckouttime(itemsArray[i].getEndtime());
                        bookMeetingRoom.setUpdate_by("Updatesys");
                        bookMeetingRoom.setUpdate_date(new Date());
                        bookMeetingRoom.setStatusbooking("Checkout");
                        bookMeetingRoomRepository.save(bookMeetingRoom);
                    }
                } if(fulltime.compareToIgnoreCase("15.59") == 1 && date2.before(date)){
                    if(itemsArray[i].getEndtime().equals("16.00")){
                        BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findById(itemsArray[i].getBook_id()).get();
                        bookMeetingRoom.setCheckinby("Checkoutsys");
                        bookMeetingRoom.setCheckouttime(itemsArray[i].getEndtime());
                        bookMeetingRoom.setUpdate_by("Updatesys");
                        bookMeetingRoom.setUpdate_date(new Date());
                        bookMeetingRoom.setStatusbooking("Checkout");
                        bookMeetingRoomRepository.save(bookMeetingRoom);
                    }
                } if(fulltime.compareToIgnoreCase("16.59") == 1 && date2.before(date)){
                    if(itemsArray[i].getEndtime().equals("17.00")){
                        BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findById(itemsArray[i].getBook_id()).get();
                        bookMeetingRoom.setCheckinby("Checkoutsys");
                        bookMeetingRoom.setCheckouttime(itemsArray[i].getEndtime());
                        bookMeetingRoom.setUpdate_by("Updatesys");
                        bookMeetingRoom.setUpdate_date(new Date());
                        bookMeetingRoom.setStatusbooking("Checkout");
                        bookMeetingRoomRepository.save(bookMeetingRoom);
                    }
                } if(fulltime.compareToIgnoreCase("17.59") == 1 && date2.before(date)){
                    if(itemsArray[i].getEndtime().equals("18.00")){
                        BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findById(itemsArray[i].getBook_id()).get();
                        bookMeetingRoom.setCheckinby("Checkoutsys");
                        bookMeetingRoom.setCheckouttime(itemsArray[i].getEndtime());
                        bookMeetingRoom.setUpdate_by("Updatesys");
                        bookMeetingRoom.setUpdate_date(new Date());
                        bookMeetingRoom.setStatusbooking("Checkout");
                        bookMeetingRoomRepository.save(bookMeetingRoom);
                    }
                } if(fulltime.compareToIgnoreCase("18.59") == 1 && date2.before(date)){
                    if(itemsArray[i].getEndtime().equals("19.00")){
                        BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findById(itemsArray[i].getBook_id()).get();
                        bookMeetingRoom.setCheckinby("Checkoutsys");
                        bookMeetingRoom.setCheckouttime(itemsArray[i].getEndtime());
                        bookMeetingRoom.setUpdate_by("Updatesys");
                        bookMeetingRoom.setUpdate_date(new Date());
                        bookMeetingRoom.setStatusbooking("Checkout");
                        bookMeetingRoomRepository.save(bookMeetingRoom);
                    }
                }
                if(fulltime.compareToIgnoreCase("19.59") == 1 && date2.before(date)){
                    if(itemsArray[i].getEndtime().equals("20.00")){
                        BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findById(itemsArray[i].getBook_id()).get();
                        bookMeetingRoom.setCheckinby("Checkoutsys");
                        bookMeetingRoom.setCheckouttime(itemsArray[i].getEndtime());
                        bookMeetingRoom.setUpdate_by("Updatesys");
                        bookMeetingRoom.setUpdate_date(new Date());
                        bookMeetingRoom.setStatusbooking("Checkout");
                        bookMeetingRoomRepository.save(bookMeetingRoom);
                    }
                }
                if(fulltime.compareToIgnoreCase("20.59") == 1 && date2.before(date)){
                    if(itemsArray[i].getEndtime().equals("21.00")){
                        BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findById(itemsArray[i].getBook_id()).get();
                        bookMeetingRoom.setCheckinby("Checkoutsys");
                        bookMeetingRoom.setCheckouttime(itemsArray[i].getEndtime());
                        bookMeetingRoom.setUpdate_by("Updatesys");
                        bookMeetingRoom.setUpdate_date(new Date());
                        bookMeetingRoom.setStatusbooking("Checkout");
                        bookMeetingRoomRepository.save(bookMeetingRoom);
                    }
                } if(fulltime.compareToIgnoreCase("21.59") == 1 && date2.before(date)){
                    if(itemsArray[i].getEndtime().equals("22.00")){
                        BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findById(itemsArray[i].getBook_id()).get();
                        bookMeetingRoom.setCheckinby("Checkoutsys");
                        bookMeetingRoom.setCheckouttime(itemsArray[i].getEndtime());
                        bookMeetingRoom.setUpdate_by("Updatesys");
                        bookMeetingRoom.setUpdate_date(new Date());
                        bookMeetingRoom.setStatusbooking("Checkout");
                        bookMeetingRoomRepository.save(bookMeetingRoom);
                    }
                }

            }


        } // for book
    }




}
