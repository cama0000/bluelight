package com.c5r.bluelight_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class BluelightApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(BluelightApiApplication.class, args);
	}

}
