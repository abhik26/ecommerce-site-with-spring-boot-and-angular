package com.example.ecommercespringbootangular.service;

import com.example.ecommercespringbootangular.dto.Purchase;
import com.example.ecommercespringbootangular.dto.PurchaseResponse;

public interface CheckoutService {

	PurchaseResponse placeOrder(Purchase purchase);
}
