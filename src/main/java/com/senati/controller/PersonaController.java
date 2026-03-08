package com.senati.controller;

import com.senati.model.Persona;
import com.senati.repository.PersonaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/personas")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class PersonaController {

    @Autowired
    private PersonaRepository personaRepository;

    @GetMapping
    public List<Persona> listar() {
        return personaRepository.findAll();
    }

    @GetMapping("/buscar")
    public List<Persona> buscar(
            @RequestParam(defaultValue = "Todos") String estado,
            @RequestParam(defaultValue = "Todas") String categoria
    ) {
        if ("Todos".equals(estado) && "Todas".equals(categoria)) {
            return personaRepository.findAll();
        }

        if (!"Todos".equals(estado) && "Todas".equals(categoria)) {
            return personaRepository.findByEstado(estado);
        }

        // Si solo filtramos por categoría
        if ("Todos".equals(estado) && !"Todas".equals(categoria)) {
            return personaRepository.findByCategoria(categoria);
        }

        // Si filtramos por ambos
        return personaRepository.findByEstadoAndCategoria(estado, categoria);
    }


    @PostMapping
    public Persona guardar(@RequestBody Persona persona) {
        return personaRepository.save(persona);
    }

    @PutMapping("/{id}")
    public Persona actualizar(@PathVariable Integer id, @RequestBody Persona personaDetalles) {
        return personaRepository.findById(id)
                .map(persona -> {
                    persona.setDni(personaDetalles.getDni());
                    persona.setNombre(personaDetalles.getNombre());
                    persona.setApellidos(personaDetalles.getApellidos());
                    persona.setTelefono(personaDetalles.getTelefono());
                    persona.setEstado(personaDetalles.getEstado());
                    persona.setCategoria(personaDetalles.getCategoria());
                    return personaRepository.save(persona);
                })
                .orElseThrow(() -> new RuntimeException("Persona no encontrada con id: " + id));
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        personaRepository.deleteById(id);
    }
}