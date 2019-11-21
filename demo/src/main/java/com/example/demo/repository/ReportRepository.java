package com.example.demo.repository;

import com.example.demo.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Collection;


@RepositoryRestResource
@CrossOrigin(origins = "*")
public interface ReportRepository extends JpaRepository<Report,Long> {

    @Query(value = "SELECT * FROM report WHERE date = :date",nativeQuery = true)
    Collection<Report> getDateReport(@Param("date") String date );
}
