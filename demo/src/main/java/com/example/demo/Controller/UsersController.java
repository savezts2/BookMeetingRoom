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

    @PostMapping("/BookMeetingRoom/Users/{username}/Password/{password}")
    public Users users(@PathVariable String username , @PathVariable String password){
        return this.usersRepository.findByUsernameAndPassword(username,password);
    }

    @PostMapping("/BookMeetingRoom/Userid/{username}")
    public  Users users(@PathVariable String username){
        return this.usersRepository.findByUsername(username);
    }

    @PostMapping(path = "/BookMeetingRoom/Adduser/{firstname}/{lastname}/{department}/{position}/{username}/{password}/{status}")
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

    @PostMapping(path = "/BookMeetingRoom/Canceluser/{username}")
    public Users users1(@PathVariable String username) {
        Users users = usersRepository.findByUsername(username);
        users.setIsActive("0");
        usersRepository.save(users);
        return users;
    }

    @PostMapping(path = "/BookMeetingRoom/Canceluser/add/{username}")
    public Users users2(@PathVariable String username) {
        Users users = usersRepository.findByUsername(username);
        users.setIsActive("1");
        usersRepository.save(users);
        return users;
    }

}
