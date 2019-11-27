package com.example.demo.Controller;



import com.example.demo.entity.Users;
import com.example.demo.repository.UsersRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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


    @GetMapping("/Userid/{username}")
    public  Users users(@PathVariable String username){
        return this.usersRepository.findByUsername(username);
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

    @PostMapping(path = "/Canceluser/{username}")
    public Users users1(@PathVariable String username) {
        Users users = usersRepository.findByUsername(username);
        users.setIsActive("0");
        usersRepository.save(users);
        return users;
    }

    @PostMapping(path = "/Canceluser/add/{username}")
    public Users users2(@PathVariable String username) {
        Users users = usersRepository.findByUsername(username);
        users.setIsActive("1");
        usersRepository.save(users);
        return users;
    }

}
