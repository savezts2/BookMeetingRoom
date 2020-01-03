package com.example.demo.Controller;


import com.example.demo.entity.BookMeetingRoom;
import com.example.demo.entity.Report;
import com.example.demo.entity.Roomname;
import com.example.demo.entity.Users;
import com.example.demo.repository.BookMeetingRoomRepository;
import com.example.demo.repository.ReportRepository;
import com.example.demo.repository.RoomnameRepository;
import com.example.demo.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Locale;


@RestController
@CrossOrigin("*")

public class BookMeetingRoomController {

    @Autowired
    private BookMeetingRoomRepository bookMeetingRoomRepository;
    @Autowired
    private UsersRepository usersRepository;
    @Autowired
    private ReportRepository reportRepository;
    @Autowired
    private RoomnameRepository roomnameRepository;


    @GetMapping(path = "/getHourCurrent")
    public static String getHourCurrent() {
        String hour = Integer.toString(LocalDateTime.now().getHour());
        return hour;
    }

    @GetMapping(path = "/getMinuteCurrent")
    public static String getMinuteCurrent() {
        String minute = Integer.toString(LocalDateTime.now().getMinute());
        return minute;
    }

    @PostMapping(path = "/Notcheckin15min/{dateBookMeetingRoom}/{roomname}/{starttime}")
    public BookMeetingRoom updatenotcheckinbysys(@PathVariable String dateBookMeetingRoom,@PathVariable Long roomname, @PathVariable String starttime) {
        Roomname roomname1 = roomnameRepository.findById(roomname).get();

        BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findByDateBookMeetingRoomAndRoomnameAndStarttimeAndIsActive(dateBookMeetingRoom,roomname1,starttime,"1");

        bookMeetingRoom.setStatusbooking("Not Checkin");
        bookMeetingRoom.setLatetime(15);
        bookMeetingRoom.setLate("late");
        bookMeetingRoom.setUpdate_date(new Date());
        bookMeetingRoom.setUpdate_by("Updatesys");
        bookMeetingRoomRepository.save(bookMeetingRoom);
        return bookMeetingRoom;
    }

    @PostMapping(path = "/Notcheckin30min/{dateBookMeetingRoom}/{roomname}/{starttime}")
    public BookMeetingRoom updatenotcheckin30minbysys(@PathVariable String dateBookMeetingRoom,@PathVariable Long roomname, @PathVariable String starttime) {
        Roomname roomname1 = roomnameRepository.findById(roomname).get();
        String endtime;
        BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findByDateBookMeetingRoomAndRoomnameAndStarttimeAndIsActive(dateBookMeetingRoom,roomname1,starttime,"1");
        if(starttime.equals("08.00")){
            endtime = "08.00";
        }else if(starttime.equals("08.30")){endtime = "08.30";}
        else if(starttime.equals("09.00")){endtime = "09.00";}
        else if(starttime.equals("09.30")){endtime = "09.30";}
        else if(starttime.equals("10.00")){endtime = "10.00";}
        else if(starttime.equals("10.30")){endtime = "10.30";}
        else if(starttime.equals("11.00")){endtime = "11.00";}
        else if(starttime.equals("11.30")){endtime = "11.30";}
        else if(starttime.equals("12.00")){endtime = "12.00";}
        else if(starttime.equals("12.30")){endtime = "12.30";}
        else if(starttime.equals("13.00")){endtime = "14.00";}
        else if(starttime.equals("13.30")){endtime = "13.30";}
        else if(starttime.equals("14.00")){endtime = "14.00";}
        else if(starttime.equals("14.30")){endtime = "14.30";}
        else if(starttime.equals("15.00")){endtime = "15.00";}
        else if(starttime.equals("15.30")){endtime = "15.30";}
        else if(starttime.equals("16.00")){endtime = "16.00";}
        else{endtime = "16.30";}

        bookMeetingRoom.setStatusbooking("Not Checkin");
        bookMeetingRoom.setLatetime(30);
        bookMeetingRoom.setLate("late");
        bookMeetingRoom.setLengthtime(1);
        bookMeetingRoom.setUpdate_date(new Date());
        bookMeetingRoom.setUpdate_by("Updatesys");
        bookMeetingRoom.setEndtime(endtime);
        bookMeetingRoom.setCheckoutby("Checkoutsys");
        int minutess = Integer.valueOf(getMinuteCurrent());
        String min ;
        if(minutess < 10){
            min = "0"+minutess;
        }else{
            min = String.valueOf(minutess);
        }

        bookMeetingRoom.setCheckouttime(getHourCurrent() + ":" +min);
        bookMeetingRoom.setUpdate_by("Updatebysys");
        bookMeetingRoom.setUpdate_date(new Date());
        bookMeetingRoomRepository.save(bookMeetingRoom);
        return bookMeetingRoom;
    }

    @PostMapping(path = "/checkoutauto/{dateBookMeetingRoom}/{roomname}/{starttime}")
    public BookMeetingRoom checkoutbysys(@PathVariable String dateBookMeetingRoom,@PathVariable Long roomname, @PathVariable String starttime) {
        Roomname roomname1 = roomnameRepository.findById(roomname).get();
        String endtime;
        BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findByDateBookMeetingRoomAndRoomnameAndStarttimeAndIsActive(dateBookMeetingRoom,roomname1,starttime,"1");
        bookMeetingRoom.setCheckoutby("Checkoutsys");
        bookMeetingRoom.setCheckouttime(bookMeetingRoom.getEndtime());
        bookMeetingRoom.setUpdate_by("Updatesys");
        Date date = new Date();
        bookMeetingRoom.setUpdate_date(date);
        bookMeetingRoom.setStatusbooking("Checkout");
        bookMeetingRoomRepository.save(bookMeetingRoom);
        return bookMeetingRoom;
    }


    @PostMapping(path = "/bookrepeat/{id_book}")
    public BookMeetingRoom checkoutbysys(@PathVariable Long id_book) {
        BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findById(id_book).get();
        bookMeetingRoom.setStatusbooking("Not booking");
        bookMeetingRoom.setIsActive("0");
        bookMeetingRoom.setUpdate_by("Updatesys");
        bookMeetingRoom.setUpdate_date(new Date());
        bookMeetingRoom.setCheckoutby("Checkoutsys");
        int minutess = Integer.valueOf(getMinuteCurrent());
        String min ;
        if(minutess < 10){
            min = "0"+minutess;
        }else{
            min = String.valueOf(minutess);
        }
        bookMeetingRoom.setCheckouttime(getHourCurrent()+":"+min);
        bookMeetingRoomRepository.save(bookMeetingRoom);

        Report report = reportRepository.findByBookMeetingRoom(bookMeetingRoom);
        report.setIsActive("0");
        report.setUpdate_by("Updatesys");
        report.setUpdate_date(new Date());

        reportRepository.save(report);
        return bookMeetingRoom;
    }


 //8888888888888888888888888888888888888

    @PostMapping(path = "/Addroom/{firstname}/{roomname}")
    public Roomname AddRoom(@PathVariable String firstname, @PathVariable String roomname) {
        Roomname roomname1 = new Roomname();
        roomname1.setRoomnames(roomname);
        roomname1.setIsActive("1");
        Date date = new Date();
        roomname1.setCreate_by(firstname);
        roomname1.setCreate_date(date);
        roomname1.setUpdate_by(null);
        roomname1.setUpdate_date(null);
        roomnameRepository.save(roomname1);

        return roomname1;
    }

    @PostMapping(path = "/Editroom/{firstname}/{roomname}/{newroomname}")
    public Roomname Editroom(@PathVariable String firstname, @PathVariable String roomname, @PathVariable String newroomname) {
        Roomname roomname1 = roomnameRepository.findByRoomnamesAndIsActive(roomname,"1");
        roomname1.setRoomnames(newroomname);
        roomname1.setIsActive("1");
        Date date = new Date();
        roomname1.setUpdate_by(firstname);
        roomname1.setUpdate_date(date);
        roomnameRepository.save(roomname1);

        return roomname1;
    }

    @PostMapping(path = "/Deleteroom/{firstname}/{roomname}")
    public Roomname Deleteroom(@PathVariable String firstname, @PathVariable String roomname) {
        Roomname roomname1 = roomnameRepository.findByRoomnamesAndIsActive(roomname,"1");
        roomname1.setIsActive("0");
        Date date = new Date();
        roomname1.setUpdate_by(firstname);
        roomname1.setUpdate_date(date);
        roomnameRepository.save(roomname1);

        return roomname1;
    }



    @PostMapping(path = "/CancelBooking/{firstname}/{dateBookMeetingRoom}/{roomname}/{starttime}")
    public BookMeetingRoom bookMeetingRoom2(@PathVariable String firstname,@PathVariable String dateBookMeetingRoom, @PathVariable Long roomname, @PathVariable String starttime) {

        Roomname roomname1 = roomnameRepository.findById(roomname).get();
        BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findByDateBookMeetingRoomAndRoomnameAndStarttimeAndIsActive(dateBookMeetingRoom,roomname1,starttime,"1");
        bookMeetingRoom.setIsActive("0");
        bookMeetingRoomRepository.save(bookMeetingRoom);
        Date date = new Date();
        bookMeetingRoom.setUpdate_date(date);
        bookMeetingRoom.setUpdate_by(firstname);
        bookMeetingRoom.setStatusbooking("Cancel");
        Report report = reportRepository.findByBookMeetingRoom(bookMeetingRoom);
        report.setIsActive("0");
        report.setUpdate_by(firstname);
        report.setUpdate_date(date);

        reportRepository.save(report);
        return bookMeetingRoom;
    }

    @PostMapping(path = "/CheckIn/{firstname}/{dateBookMeetingRoom}/{roomname}/{starttime}/{checkintime}")
    public BookMeetingRoom bookMeetingRoom4(@PathVariable String firstname,@PathVariable String dateBookMeetingRoom, @PathVariable Long roomname, @PathVariable String starttime, @PathVariable String checkintime ) {

        Roomname roomname1 = roomnameRepository.findById(roomname).get();
        BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findByDateBookMeetingRoomAndRoomnameAndStarttimeAndIsActive(dateBookMeetingRoom,roomname1,starttime,"1");
        Date date = new Date();
        bookMeetingRoom.setStatusbooking("Checkin");
        bookMeetingRoom.setUpdate_date(date);
        bookMeetingRoom.setUpdate_by(firstname);
        int minutess = Integer.valueOf(getMinuteCurrent());
        String min ;
        if(minutess < 10){
            min = "0"+minutess;
        }else{
            min = String.valueOf(minutess);
        }
        bookMeetingRoom.setCheckintime(getHourCurrent()+":"+min);
        bookMeetingRoom.setCheckinby("Checkinusr");
        bookMeetingRoomRepository.save(bookMeetingRoom);
        Report report = reportRepository.findByBookMeetingRoom(bookMeetingRoom);
        report.setUpdate_by(firstname);
        report.setUpdate_date(date);
        reportRepository.save(report);
        return bookMeetingRoom;
    }



    @PostMapping(path = "/Checkout/{firstname}/{dateBookMeetingRoom}/{roomname}/{starttime}/{hour}/{minute}/{checkouttime}")
    public BookMeetingRoom checkout(@PathVariable String firstname,@PathVariable String dateBookMeetingRoom, @PathVariable Long roomname, @PathVariable String starttime
            , @PathVariable int hour, @PathVariable int minute, @PathVariable String checkouttime) {
        String endtime2;


        if(hour == 8 && minute <= 30){
            endtime2 = "08.00";
        }else if(hour == 8 && minute > 30){
            endtime2 = "08.30";
        }else if(hour == 9 && minute <= 30){
            endtime2 = "09.00";
        }else if(hour == 9 && minute > 30){
            endtime2 = "09.30";
        }else if(hour == 10 && minute <= 30){
            endtime2 = "10.00";
        }else if(hour == 10 && minute > 30){
            endtime2 = "10.30";
        }else if(hour == 11 && minute <= 30){
            endtime2 = "11.00";
        }else if(hour == 11 && minute > 30){
            endtime2 = "11.30";
        }else if(hour == 12 && minute <= 30){
            endtime2 = "12.00";
        }else if(hour == 12 && minute > 30){
            endtime2 = "12.30";
        }else if(hour == 13 && minute <= 30){
            endtime2 = "13.00";
        }else if(hour == 13 && minute > 30){
            endtime2 = "13.30";
        }else if(hour == 14 && minute <= 30){
            endtime2 = "14.00";
        }else if(hour == 14 && minute > 30){
            endtime2 = "14.30";
        }else if(hour == 15 && minute <= 30){
            endtime2 = "15.00";
        }else if(hour == 15 && minute > 30){
            endtime2 = "15.30";
        }else if(hour == 16 && minute <= 30){
            endtime2 = "16.00";
        }else{
            endtime2 = "16.30";
        }

        Roomname roomname1 = roomnameRepository.findById(roomname).get();
        BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findByDateBookMeetingRoomAndRoomnameAndStarttimeAndIsActive(dateBookMeetingRoom,roomname1,starttime,"1");
        bookMeetingRoom.setCheckoutby("Checkoutusr");
        bookMeetingRoom.setCheckouttime(checkouttime);
        int lengthh = convertLengthTime(starttime,endtime2);
        bookMeetingRoom.setLengthtime(lengthh);
        bookMeetingRoom.setEndtime(endtime2);
        bookMeetingRoom.setStatusbooking("Checkout");
        Date date = new Date();
        bookMeetingRoom.setUpdate_date(date);
        bookMeetingRoom.setUpdate_by(firstname);
        Report report = reportRepository.findByBookMeetingRoom(bookMeetingRoom);
        report.setUpdate_date(date);
        report.setUpdate_by(firstname);
        bookMeetingRoomRepository.save(bookMeetingRoom);
        return bookMeetingRoom;
    }

    @GetMapping("/Bookeiei/{dateBookMeetingRoom}/{roomname}/{starttime}")
    public  BookMeetingRoom bookMeetingRoom(@PathVariable String dateBookMeetingRoom, @PathVariable Long roomname, @PathVariable String starttime){

        return this.bookMeetingRoomRepository.getBookday(dateBookMeetingRoom,roomname,starttime,"1","booking");
    }

    @PostMapping(path = "/Editbook/{firstname}/{dateBookMeetingRoom}/{roomname}/{starttime}/{newstarttime}/{endtime}/{atten}/{topic}/{remark}/{tel}")
    public BookMeetingRoom bookMeetingRoom3(@PathVariable String firstname,@PathVariable String dateBookMeetingRoom, @PathVariable Long roomname, @PathVariable String starttime,
   @PathVariable String newstarttime,@PathVariable String endtime,@PathVariable String atten,@PathVariable String topic,@PathVariable String remark,@PathVariable String tel ) {

        Roomname roomname1 = roomnameRepository.findById(roomname).get();
        BookMeetingRoom bookMeetingRoom = bookMeetingRoomRepository.findByDateBookMeetingRoomAndRoomnameAndStarttimeAndIsActive(dateBookMeetingRoom,roomname1,starttime,"1");
        bookMeetingRoom.setStarttime(newstarttime);
        bookMeetingRoom.setEndtime(endtime);
        bookMeetingRoom.setAttendees(atten);
        bookMeetingRoom.setTopic(topic);
        bookMeetingRoom.setRemark(remark);
        bookMeetingRoom.setTelbookingby(tel);
        Date date = new Date();
        bookMeetingRoom.setUpdate_by(firstname);
        bookMeetingRoom.setUpdate_date(date);
        int length = convertLengthTime(newstarttime,endtime);
        bookMeetingRoom.setLengthtime(length);
        bookMeetingRoomRepository.save(bookMeetingRoom);
        Report report = reportRepository.findByBookMeetingRoom(bookMeetingRoom);
        report.setUpdate_date(date);
        report.setUpdate_by(firstname);
        reportRepository.save(report);
        return bookMeetingRoom;
    }



    @PostMapping(path = "/booklate/{userid}/{fromtime}/{totime}/{tel}/{topic}/{atten}/{remark}/{roomname}/{date}")
    public BookMeetingRoom booklate(@PathVariable String userid, @PathVariable String fromtime, @PathVariable String totime,
                                           @PathVariable String  tel, @PathVariable String topic,@PathVariable String atten,@PathVariable String remark
            ,@PathVariable String roomname ,@PathVariable String date) throws Exception {
        BookMeetingRoom bookMeetingRoom = new BookMeetingRoom();
        bookMeetingRoom.setStarttime(fromtime);
        bookMeetingRoom.setEndtime(totime);
        bookMeetingRoom.setTelbookingby(tel);
        bookMeetingRoom.setTopic(topic);
        bookMeetingRoom.setAttendees(atten);
        bookMeetingRoom.setRemark(remark);
        bookMeetingRoom.setCheckinby("Checkinusr");
        int minutess = Integer.valueOf(getMinuteCurrent());
        String min ;
        if(minutess < 10){
            min = "0"+minutess;
        }else{
            min = String.valueOf(minutess);
        }
        bookMeetingRoom.setCheckintime(getHourCurrent()+":"+min);
        Date date1 = new Date();
        int length = convertLengthTime(fromtime,totime);

        bookMeetingRoom.setLengthtime(length);
        Roomname roomname1 = roomnameRepository.findByRoomnamesAndIsActive(roomname,"1");
        bookMeetingRoom.setRoomname(roomname1);
        bookMeetingRoom.setDateBookMeetingRoom(date);
        bookMeetingRoom.setIsActive("1");
        bookMeetingRoomRepository.save(bookMeetingRoom);

        bookMeetingRoom.setStatusbooking("Checkin");
        bookMeetingRoom.setCreate_date(date1);

        Users users = usersRepository.findByUsernameAndIsActive(userid,"1");
        bookMeetingRoom.setCreate_by(users.getFirstname());

        Report report = new Report();
        report.setBookMeetingRoom(bookMeetingRoom);
        report.setDate(date);
        report.setUsers(users);

        SimpleDateFormat formatter2=new SimpleDateFormat("dd-MM-yyyy");
        String[] dateSplit;
        dateSplit = date.split("-");

        int yearSplit = Integer.valueOf(dateSplit[2]) ;
        String fullPatternyear = dateSplit[0] + '-' + dateSplit[1] + '-' + String.valueOf(yearSplit);

        Date date2=formatter2.parse(fullPatternyear);
        report.setDateBook(date2);
        report.setIsActive("1");
        report.setCreate_by(users.getFirstname());
        report.setCreate_date(date1);
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
        Date date1 = new Date();
        int length = convertLengthTime(fromtime,totime);

        bookMeetingRoom.setLengthtime(length);
        Roomname roomname1 = roomnameRepository.findByRoomnamesAndIsActive(roomname,"1");
        bookMeetingRoom.setRoomname(roomname1);
        bookMeetingRoom.setDateBookMeetingRoom(date);
        bookMeetingRoom.setIsActive("1");
        bookMeetingRoomRepository.save(bookMeetingRoom);

        bookMeetingRoom.setStatusbooking("Booking");
        bookMeetingRoom.setCreate_date(date1);

        Users users = usersRepository.findByUsernameAndIsActive(userid,"1");
        bookMeetingRoom.setCreate_by(users.getFirstname());

        Report report = new Report();
        report.setBookMeetingRoom(bookMeetingRoom);
        report.setDate(date);
        report.setUsers(users);
        SimpleDateFormat formatter2=new SimpleDateFormat("dd-MM-yyyy");
        String[] dateSplit;
        dateSplit = date.split("-");
        int yearSplit = Integer.valueOf(dateSplit[2])  ;
        String fullPatternyear = dateSplit[0] + '-' + dateSplit[1] + '-' + String.valueOf(yearSplit);
        Date date2=formatter2.parse(fullPatternyear);
        report.setDateBook(date2);
        report.setIsActive("1");
        report.setCreate_by(users.getFirstname());
        report.setCreate_date(date1);
        reportRepository.save(report);

        return bookMeetingRoom;
    }



    public static int convertLengthTime(String fromtime, String totime){
        int length = 0 ;

        String from , to ,fromback, toback;
        from = fromtime.substring(0,2);
        to = totime.substring(0,2);
        fromback = fromtime.substring(3,5);
        toback = totime.substring(3,5);


        if(from.equals("08")  && to.equals("09")){
                length = 1;
        }else if(from.equals("08")  && to.equals("10")){
                length = 2;
        }else if(from.equals("08")  && to.equals("11")){
                length = 3;
        }else if(from.equals("08")  && to.equals("12")){
                length = 4;
        }else if(from.equals("08")  && to.equals("13")){
                length = 5;
        }else if(from.equals("08")  && to.equals("14")){
                length = 6;
        }else if(from.equals("08")  && to.equals("15")){
                length = 7;
        }else if(from.equals("08")  && to.equals("16")){
                length = 8;
        }else if(from.equals("08")  && to.equals("17")){
            length = 9;
        }else if(from.equals("08")  && to.equals("18")){
            length = 10;
        }else if(from.equals("08")  && to.equals("19")){
            length = 11;
        }else if(from.equals("08")  && to.equals("20")){
            length = 12;
        }else if(from.equals("08")  && to.equals("21")){
            length = 13;
        }else if(from.equals("08")  && to.equals("22")){
            length = 14;
        }


        else if(from.equals("09")  && to.equals("10")){
            length = 1;
        }else if(from.equals("09")  && to.equals("11")){
            length = 2;
        }else if(from.equals("09")  && to.equals("12")){
            length = 3;
        }else if(from.equals("09")  && to.equals("13")){
            length = 4;
        }else if(from.equals("09")  && to.equals("14")){
            length = 5;
        }else if(from.equals("09")  && to.equals("15")){
            length = 6;
        }else if(from.equals("09")  && to.equals("16")){
            length = 7;
        }else if(from.equals("09")  && to.equals("17")){
            length = 8;
        }else if(from.equals("09")  && to.equals("18")){
            length = 9;
        }else if(from.equals("09")  && to.equals("19")){
            length = 10;
        }else if(from.equals("09")  && to.equals("20")){
            length = 11;
        }else if(from.equals("09")  && to.equals("21")){
            length = 12;
        }else if(from.equals("09")  && to.equals("22")) {
            length = 13;
        }


        else if(from.equals("10")  && to.equals("11")){
            length = 1;
        }else if(from.equals("10")  && to.equals("12")){
            length = 2;
        }else if(from.equals("10")  && to.equals("13")){
            length = 3;
        }else if(from.equals("10")  && to.equals("14")){
            length = 4;
        }else if(from.equals("10")  && to.equals("15")){
            length = 5;
        }else if(from.equals("10")  && to.equals("16")){
            length = 6;
        }else if(from.equals("10")  && to.equals("17")){
            length = 7;
        }else if(from.equals("10")  && to.equals("18")){
            length = 8;
        }else if(from.equals("10")  && to.equals("19")){
            length = 9;
        }else if(from.equals("10")  && to.equals("20")){
            length = 10;
        }else if(from.equals("10")  && to.equals("21")){
            length = 11;
        }else if(from.equals("10")  && to.equals("22")){
            length = 12;
        }


        else if(from.equals("11")  && to.equals("12")){
            length = 1;
        }else if(from.equals("11")  && to.equals("13")){
            length = 2;
        }else if(from.equals("11")  && to.equals("14")){
            length = 3;
        }else if(from.equals("11")  && to.equals("15")){
            length = 4;
        }else if(from.equals("11")  && to.equals("16")){
            length = 5;
        }else if(from.equals("11")  && to.equals("17")){
            length = 6;
        }else if(from.equals("11")  && to.equals("18")){
            length = 7;
        }else if(from.equals("11")  && to.equals("19")){
            length = 8;
        }else if(from.equals("11")  && to.equals("20")){
            length = 9;
        }else if(from.equals("11")  && to.equals("21")){
            length = 10;
        }else if(from.equals("11")  && to.equals("22")){
            length = 11;
        }


        else if(from.equals("12")  && to.equals("13")){
            length = 1;
        }else if(from.equals("12")  && to.equals("14")){
            length = 2;
        }else if(from.equals("12")  && to.equals("15")){
            length = 3;
        }else if(from.equals("12")  && to.equals("16")){
            length = 4;
        }else if(from.equals("12")  && to.equals("17")){
            length = 5;
        }else if(from.equals("12")  && to.equals("18")){
            length = 6;
        }else if(from.equals("12")  && to.equals("19")){
            length = 7;
        }else if(from.equals("12")  && to.equals("20")){
            length = 8;
        }else if(from.equals("12")  && to.equals("21")){
            length = 9;
        }else if(from.equals("12")  && to.equals("22")){
            length = 10;
        }


        else if(from.equals("13")  && to.equals("14")){
            length = 1;
        }else if(from.equals("13")  && to.equals("15")){
            length = 2;
        }else if(from.equals("13")  && to.equals("16")){
            length = 3;
        }else if(from.equals("13")  && to.equals("17")){
            length = 4;
        }else if(from.equals("13")  && to.equals("18")){
            length = 5;
        }else if(from.equals("13")  && to.equals("19")){
            length = 6;
        }else if(from.equals("13")  && to.equals("20")){
            length = 7;
        }else if(from.equals("13")  && to.equals("21")){
            length = 8;
        }else if(from.equals("13")  && to.equals("22")){
            length = 9;
        }


        else if(from.equals("14")  && to.equals("15")){
            length = 1;
        }else if(from.equals("14")  && to.equals("16")){
            length = 2;
        }else if(from.equals("14")  && to.equals("17")){
            length = 3;
        }else if(from.equals("14")  && to.equals("18")){
            length = 4;
        }else if(from.equals("14")  && to.equals("19")){
            length = 5;
        }else if(from.equals("14")  && to.equals("20")){
            length = 6;
        }else if(from.equals("14")  && to.equals("21")){
            length = 7;
        }else if(from.equals("14")  && to.equals("22")){
            length = 8;
        }

        else if(from.equals("15")  && to.equals("16")){
            length = 1;
        }else if(from.equals("15")  && to.equals("17")){
            length = 2;
        }else if(from.equals("15")  && to.equals("18")){
            length = 3;
        }else if(from.equals("15")  && to.equals("19")){
            length = 4;
        }else if(from.equals("15")  && to.equals("20")){
            length = 5;
        }else if(from.equals("15")  && to.equals("21")){
            length = 6;
        }else if(from.equals("15")  && to.equals("22")){
            length = 7;
        }

        else if(from.equals("16")  && to.equals("17")){
            length = 1;
        }else if(from.equals("16")  && to.equals("18")){
            length = 2;
        }else if(from.equals("16")  && to.equals("19")){
            length = 3;
        }else if(from.equals("16")  && to.equals("20")){
            length = 4;
        }else if(from.equals("16")  && to.equals("21")){
            length = 5;
        }else if(from.equals("16")  && to.equals("22")){
            length = 6;
        }

        else if(from.equals("17")  && to.equals("18")){
            length = 1;
        }else if(from.equals("17")  && to.equals("19")){
            length = 2;
        }else if(from.equals("17")  && to.equals("20")){
            length = 3;
        }else if(from.equals("17")  && to.equals("21")){
            length = 4;
        }else if(from.equals("17")  && to.equals("22")){
            length = 5;
        }

        else if(from.equals("18")  && to.equals("19")){
            length = 1;
        }else if(from.equals("18")  && to.equals("20")){
            length = 2;
        }else if(from.equals("18")  && to.equals("21")){
            length = 3;
        }else if(from.equals("18")  && to.equals("22")){
            length = 4;
        }

        else if(from.equals("19")  && to.equals("20")){
            length = 1;
        }else if(from.equals("19")  && to.equals("21")){
            length = 2;
        }else if(from.equals("19")  && to.equals("22")){
            length = 3;
        }

        else if(from.equals("20")  && to.equals("21")){
            length = 1;
        }else if(from.equals("20")  && to.equals("22")){
            length = 2;
        }

        else if(from.equals("21")  && to.equals("22")){
            length = 1;
        }



        return length ;

    }


    @GetMapping("/Getroomname/{roomnames}")
    public  Roomname roomname(@PathVariable String roomnames){
        return this.roomnameRepository.findByRoomnamesAndIsActive(roomnames,"1");
    }


}
