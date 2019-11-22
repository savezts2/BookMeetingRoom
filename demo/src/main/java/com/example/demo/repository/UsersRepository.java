package com.example.demo.repository;


import com.example.demo.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Collection;

@RepositoryRestResource
@CrossOrigin(origins = "*")
public interface UsersRepository extends JpaRepository<Users,Long> {

    Users findByuseridAndPassword(String userid, String password);

    Users findByuserid(String userid);

}
