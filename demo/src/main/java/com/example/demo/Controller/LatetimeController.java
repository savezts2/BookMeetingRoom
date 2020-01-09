package com.example.demo.Controller;


import com.example.demo.entity.BookMeetingRoom;
import com.example.demo.entity.Latetime;
import com.example.demo.entity.TimeNotify;
import com.example.demo.repository.LatetimeRepository;
import com.example.demo.repository.TimeNotifyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("*")
public class LatetimeController {

    @Autowired
    private LatetimeRepository latetimeRepository;
    @Autowired
    private TimeNotifyRepository timeNotifyRepository;

    @GetMapping("/Latetime")
    public Latetime getLatetime(){
        long id = 1;
        Latetime latetime = latetimeRepository.findById(id).filter(this::Latetimeactive).get();
        return latetime;
    }

    @GetMapping("/TimeNotyfy")
    public TimeNotify getTimeNo(){
        long id = 1;
        TimeNotify timeNotify = timeNotifyRepository.findById(id).filter(this::TimeActive).get();
        return timeNotify;
    }

    @PostMapping(path = "/setlatetime/{time}")
    public Latetime latetime(@PathVariable int time) {
        long id = 1 ;
        Latetime latetime = latetimeRepository.findById(id).get();
        latetime.setLatetimecheckout(time);
        latetimeRepository.save(latetime);
        return latetime;
    }

    @PostMapping(path = "/settimenotify/{time}")
    public TimeNotify timeNotify(@PathVariable int time) {
        long id = 1 ;
        TimeNotify timeNotify = timeNotifyRepository.findById(id).get();
        timeNotify.setTimenotify(time);
        timeNotifyRepository.save(timeNotify);
        return timeNotify;
    }

    private boolean Latetimeactive(Latetime latetime) {
        return latetime.getIsActive().equals("1");
    }

    private boolean TimeActive(TimeNotify timeNotify) {
        return timeNotify.getIsActive().equals("1");
    }
}
