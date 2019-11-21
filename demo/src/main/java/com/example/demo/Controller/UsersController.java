package com.example.demo.Controller;



import com.example.demo.entity.Users;
import com.example.demo.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
public class UsersController {



    @Autowired
    private UsersRepository usersRepository;

    @PostMapping("/BookMeetingRoom/Users/{userid}/Password/{password}")
    public Users users(@PathVariable String userid , @PathVariable String password){
        return this.usersRepository.findByuseridAndPassword(userid,password);
    }
}
