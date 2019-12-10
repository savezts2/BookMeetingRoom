package com.example.demo.repository;

import com.example.demo.entity.S_role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface S_roleRepository extends JpaRepository<S_role,Long> {
}
