package com.example.demo.repository;


import com.example.demo.entity.BookMeetingRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Collection;

@Repository
public interface BookMeetingRoomRepository extends JpaRepository<BookMeetingRoom,Long> {

    @Query(value = "SELECT * FROM book_meeting_room WHERE date_book_meeting_room = :date_book_meeting_room",nativeQuery = true)
    Collection<BookMeetingRoom> getBookmaster(@Param("date_book_meeting_room") String date_book_meeting_room );
    //BookMeetingRoom findByDateBookMeetingRoom(String dateBookMeetingRoom);



    BookMeetingRoom findByDateBookMeetingRoomAndRoomnameAndStarttimeAndIsActive(String dateBookMeetingRoom , String roomname, String starttime, String IsActive);


    BookMeetingRoom findByRoomnameAndStarttimeAndDateBookMeetingRoom(String roomnamme , String starttime , String dateBookMeetingRoom);

    @Query(value = "SELECT * FROM book_meeting_room WHERE date_book_meeting_room = :date_book_meeting_room AND roomname = :roomname AND starttime = :starttime AND is_active = :is_active AND (statusbooking = :statusbooking OR statusbooking = \'notcheckin\')",nativeQuery = true)
    BookMeetingRoom getBookday(@Param("date_book_meeting_room") String date_book_meeting_room ,@Param("roomname") String roomname,
                               @Param("starttime") String starttime,@Param("is_active") String is_active,@Param("statusbooking") String statusbooking);
}
