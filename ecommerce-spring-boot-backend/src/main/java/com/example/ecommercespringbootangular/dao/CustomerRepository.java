package com.example.ecommercespringbootangular.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.example.ecommercespringbootangular.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
	
	List<Customer> findByEmailIgnoreCase(@Param("email") String email);

}
