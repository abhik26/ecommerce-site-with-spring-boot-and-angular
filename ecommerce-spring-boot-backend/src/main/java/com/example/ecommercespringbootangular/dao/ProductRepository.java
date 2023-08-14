package com.example.ecommercespringbootangular.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.ecommercespringbootangular.entity.Product;

@RepositoryRestResource
public interface ProductRepository extends JpaRepository<Product, Long> {
	
	Page<Product> findByProductCategoryId(@Param("id") Long id, Pageable pageable);
	Page<Product> findByNameContainingIgnoreCase(@Param("name") String name, Pageable pageable);
}
