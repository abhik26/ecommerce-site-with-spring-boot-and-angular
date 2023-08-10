package com.example.ecommercespringbootangular.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ecommercespringbootangular.dto.Purchase;
import com.example.ecommercespringbootangular.dto.PurchaseResponse;
import com.example.ecommercespringbootangular.service.CheckoutService;

@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/checkout")
@RestController
public class CheckoutController {

	private CheckoutService checkoutService;

	@Autowired
	public CheckoutController(CheckoutService checkoutService) {
		this.checkoutService = checkoutService;
	}
	
	@PostMapping("/purchase")
	public PurchaseResponse placeOrder(@RequestBody Purchase purchase) {
		PurchaseResponse purchaseResponse = this.checkoutService.placeOrder(purchase);
		
		return purchaseResponse;
	}
	
}
