package com.example.demo.repository;


import com.example.demo.entity.Roomname;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomnameRepository extends JpaRepository<Roomname,Long> {
}
