package com.example.ecommercespringbootangular.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.ecommercespringbootangular.entity.State;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(path="states", collectionResourceRel="states")
public interface StateRepository extends JpaRepository<State, Long> {

	List<State> findByCountryCode(@Param("code") String code);
}
