package com.example.demo.repository;

import com.example.demo.entity.BookMeetingRoom;
import com.example.demo.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;


@Repository
public interface ReportRepository extends JpaRepository<Report,Long> {

    @Query(value = "SELECT * FROM report WHERE date = :date AND is_active = '1'",nativeQuery = true)
    Collection<Report> getDateReport(@Param("date") String date );

    @Query(value = "SELECT * FROM report WHERE date_book BETWEEN :datestart AND :dateend AND is_active = '1'",nativeQuery = true)
    Collection<Report> getDateDashBoard(@Param("datestart") String datestart , @Param("dateend") String dateend );

    Report findByBookMeetingRoom(BookMeetingRoom bookMeetingRoom);

    @Query(value = "SELECT * FROM report WHERE date_book BETWEEN :datestart AND :dateend ORDER BY date_book DESC",nativeQuery = true)
    Collection<Report> getDateDashBoardReport(@Param("datestart") String datestart , @Param("dateend") String dateend );

    @Query(value = "SELECT TOP 1 report_id,create_by,create_date,\n" +
            "date,date_book,is_active,update_by,update_date,book_meeting_room_book_id,\n" +
            "users_user_id,roomnamebook FROM report WHERE is_active = '1' ORDER BY date_book desc\n",nativeQuery = true)
    Collection<Report> getreportdesc();
}
