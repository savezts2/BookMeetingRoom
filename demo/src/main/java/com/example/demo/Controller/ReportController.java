package com.example.demo.Controller;


import com.example.demo.entity.Report;
import com.example.demo.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")

public class ReportController {


    @Autowired
    private ReportRepository reportRepository;

    @GetMapping("/Report/{date}")
    public Iterable<Report> Report(@PathVariable String date) {
        return this.reportRepository.getDateReport(date);
    }

    @GetMapping("/Report/{datestart}/{dateend}")
    public Iterable<Report> getDateDashBoard(@PathVariable String datestart , @PathVariable String dateend) {
        return this.reportRepository.getDateDashBoard(datestart,dateend);
    }




}
