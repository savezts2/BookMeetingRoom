package com.example.demo.Controller;


import com.example.demo.entity.Emailmaster;
import com.example.demo.repository.EmailmasterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("*")
public class EmailmasterController {
    @Autowired
    private EmailmasterRepository emailmasterRepository ;



    @GetMapping("/Emailmaster")
    public Collection<Emailmaster> Actives() {
        return emailmasterRepository.findAll().stream().filter(this::EmailActive).collect(Collectors.toList());
    }

    private boolean EmailActive(Emailmaster emailmaster) {
        return emailmaster.getIsActive().equals("1");
    }
}
