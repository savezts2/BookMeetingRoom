package com.example.demo.Controller;


import com.example.demo.entity.*;
import com.example.demo.repository.*;
import org.hibernate.exception.DataException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("*")

public class UsersController {



    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private PositionRepository positionRepository;

    @Autowired
    private S_roleRepository s_roleRepository;

    @Autowired
    private RoomnameRepository roomnameRepository;


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

    @GetMapping(path = "/Department")
    public Collection<Department> departments() {
        return departmentRepository.findAll().stream().filter(this::departmentActive).collect(Collectors.toList());
    }

    @GetMapping(path = "/Roomname")
    public Collection<Roomname> roomnames() {
        return roomnameRepository.findAll().stream().filter(this::RoomnameActive).collect(Collectors.toList());
    }

    @GetMapping(path = "/Position")
    public Collection<Position> positions() {
        return positionRepository.findAll().stream().filter(this::PositionActive).collect(Collectors.toList());
    }

    @GetMapping(path = "/Role")
    public Collection<S_role> s_roles() {
        return s_roleRepository.findAll().stream().filter(this::RoleActive).collect(Collectors.toList());
    }


    private boolean RoomnameActive(Roomname roomname) {
        return roomname.getIsActive().equals("1");
    }

    private boolean departmentActive(Department department) {
        return department.getIsActive().equals("1");
    }

    private boolean PositionActive(Position position) {
        return position.getIsActive().equals("1");
    }

    private boolean RoleActive(S_role s_role) {
        return s_role.getIsActive().equals("1");
    }

    @PostMapping(path = "/Adduser/{addby}/{firstname}/{lastname}/{department}/{position}/{username}/{password}/{status}")
    public Users users(@PathVariable String addby,@PathVariable String firstname, @PathVariable String lastname, @PathVariable String department, @PathVariable String position,
                       @PathVariable String username,@PathVariable String password,@PathVariable String status) {
        Users users = new Users();
        users.setFirstname(firstname);
        users.setLastname(lastname);
        users.setDepartment(department);
        users.setPosition(position);
        users.setUsername(username);
        users.setPassword(password);
        users.setRole(status);
        users.setIsActive("1");
        users.setCreate_by(addby);
        Date date= new Date();
        users.setCreate_date(date);
        usersRepository.save(users);
        return users;
    }


    @PostMapping(path = "/Edituser/{editby}/{firstname}/{lastname}/{department}/{position}/{username}/{password}/{status}")
    public Users edituser(@PathVariable String editby,@PathVariable String firstname, @PathVariable String lastname, @PathVariable String department, @PathVariable String position,
                       @PathVariable String username,@PathVariable String password,@PathVariable String status) {
        Users users = usersRepository.findByUsernameAndIsActive(username,"1");
        users.setFirstname(firstname);
        users.setRole(status);
        users.setPassword(password);
        users.setPosition(position);
        users.setLastname(lastname);
        users.setDepartment(department);
        Date date = new Date();
        users.setUpdate_by(editby);
        users.setUpdate_date(date);
        usersRepository.save(users);
        return users;
    }

    @PostMapping(path = "/Deleteuser/{deleteby}/{username}")
    public Users deleteuser(@PathVariable String deleteby,@PathVariable String username) {
        Users users = usersRepository.findByUsernameAndIsActive(username,"1");
        users.setIsActive("0");
        Date date = new Date();
        users.setUpdate_date(date);
        users.setUpdate_by(deleteby);
        usersRepository.save(users);
        return users;
    }



}
