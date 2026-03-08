package com.senati.repository;

import com.senati.model.Persona;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PersonaRepository extends JpaRepository<Persona, Integer> {

    List<Persona> findByEstado(String estado);
    List<Persona> findByCategoria(String categoria);
    List<Persona> findByEstadoAndCategoria(String estado, String categoria);
}
