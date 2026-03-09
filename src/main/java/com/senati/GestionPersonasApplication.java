package com.senati;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication // Esta es la "llave" que activa todo
public class GestionPersonasApplication {

    public static void main(String[] args) {
        SpringApplication.run(GestionPersonasApplication.class, args);
        System.out.println("Backend listo");
    }
}