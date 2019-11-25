package com.example.demo.Controller;



import com.example.demo.entity.Users;
import com.example.demo.repository.UsersRepository;
import org.apache.catalina.User;
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

    @PostMapping("/BookMeetingRoom/Userid/{userid}")
    public  Users users(@PathVariable String userid){
        return this.usersRepository.findByuserid(userid);
    }

    @PostMapping(path = "/BookMeetingRoom/Adduser/{username}/{lastname}/{department}/{position}/{userid}/{password}/{status}")
    public Users users(@PathVariable String username, @PathVariable String lastname, @PathVariable String department, @PathVariable String position,
                       @PathVariable String userid,@PathVariable String password,@PathVariable String status) {
        Users users = new Users();
        users.setUsername(username);
        users.setLastname(lastname);
        users.setDepartment(department);
        users.setPosition(position);
        users.setUserid(userid);
        users.setPassword(password);
        users.setStatus(status);
        users.setIsActive("1");
        usersRepository.save(users);
        return users;
    }
}
