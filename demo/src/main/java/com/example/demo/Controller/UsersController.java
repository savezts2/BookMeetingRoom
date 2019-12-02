package com.example.demo.Controller;


import com.example.demo.entity.Users;
import com.example.demo.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("*")

public class UsersController {



    @Autowired
    private UsersRepository usersRepository;

    @GetMapping("/Users/{username}/Password/{password}")
    public Users getUserid(@PathVariable("username") String username , @PathVariable("password") String password){
        Users users = usersRepository.findByUsernameAndPassword(username,password);
        return users;
    }

    @GetMapping("/Users")
    public Collection<Users> Actives() {
        return usersRepository.findAll().stream().filter(this::Active).collect(Collectors.toList());
    }

    private boolean Active(Users users) {
        return users.getIsActive().equals("1");
    }


    @GetMapping("/Userid/{username}")
    public  Users users(@PathVariable String username){
        return this.usersRepository.findByUsernameAndIsActive(username,"1");
    }

    @PostMapping(path = "/Adduser/{firstname}/{lastname}/{department}/{position}/{username}/{password}/{status}")
    public Users users(@PathVariable String firstname, @PathVariable String lastname, @PathVariable String department, @PathVariable String position,
                       @PathVariable String username,@PathVariable String password,@PathVariable String status) {
        Users users = new Users();
        users.setFirstname(firstname);
        users.setLastname(lastname);
        users.setDepartment(department);
        users.setPosition(position);
        users.setUsername(username);
        users.setPassword(password);
        users.setStatus(status);
        users.setIsActive("1");
        usersRepository.save(users);
        return users;
    }


    @PostMapping(path = "/Edituser/{firstname}/{lastname}/{department}/{position}/{username}/{password}/{status}")
    public Users edituser(@PathVariable String firstname, @PathVariable String lastname, @PathVariable String department, @PathVariable String position,
                       @PathVariable String username,@PathVariable String password,@PathVariable String status) {
        Users users = usersRepository.findByUsernameAndIsActive(username,"1");
        users.setFirstname(firstname);
        users.setStatus(status);
        users.setPassword(password);
        users.setPosition(position);
        users.setLastname(lastname);
        users.setDepartment(department);
        usersRepository.save(users);
        return users;
    }

    @PostMapping(path = "/Deleteuser/{username}")
    public Users deleteuser(@PathVariable String username) {
        Users users = usersRepository.findByUsernameAndIsActive(username,"1");
        users.setIsActive("0");
        usersRepository.save(users);
        return users;
    }



}
