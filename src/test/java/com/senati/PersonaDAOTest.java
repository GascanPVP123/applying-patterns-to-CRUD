package com.senati;

import controller.dao.IPersonaDAO;
import model.Persona;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class PersonaDAOTest {

    @Mock
    private IPersonaDAO dao;

    @Test
    void testConteoPorEstado() {
        Map<String, Integer> mockEstadisticas = new HashMap<>();
        mockEstadisticas.put("Activo", 5);

        when(dao.ObtenerConteoPorEstado()).thenReturn(mockEstadisticas);

        Map<String, Integer> resultado = dao.ObtenerConteoPorEstado();

        assertNotNull(resultado);
        assertEquals(5, resultado.get("Activo"));
    }
}