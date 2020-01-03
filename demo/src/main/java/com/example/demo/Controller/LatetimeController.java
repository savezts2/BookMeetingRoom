package com.example.demo.Controller;


import com.example.demo.entity.BookMeetingRoom;
import com.example.demo.entity.Latetime;
import com.example.demo.repository.LatetimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("*")
public class LatetimeController {

    @Autowired
    private LatetimeRepository latetimeRepository;

    @GetMapping("/Latetime")
    public Latetime getLatetime(){
        long id = 1;
        Latetime latetime = latetimeRepository.findById(id).filter(this::Latetimeactive).get();
        return latetime;
    }

    private boolean Latetimeactive(Latetime latetime) {
        return latetime.getIsActive().equals("1");
    }
}
