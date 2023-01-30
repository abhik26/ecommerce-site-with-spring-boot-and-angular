package com.example.ecommercespringbootangular.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.ecommercespringbootangular.entity.Product;

@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product, Long> {
	
	Page<Product> findByProductCategoryId(@Param("id") Long id, Pageable pageable);
	Page<Product> findByNameContainingIgnoreCase(@Param("name") String name, Pageable pageable);
}
