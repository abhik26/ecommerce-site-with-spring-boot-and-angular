package com.example.ecommercespringbootangular.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.ecommercespringbootangular.entity.ProductCategory;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "productCategories", path = "product-categories")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {

}
