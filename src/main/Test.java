package main;

import factory.DAOFactory; 
import controller.dao.IPersonaDAO;
import model.Persona;
import java.util.List;
import java.util.Map; 

public class Test {

    public static void main(String[] args) {
        System.out.println("=== INICIAR PRUEBA DE ENTREGABLE ===");

        try {
            IPersonaDAO dao = DAOFactory.getPersonaDAO();

            Persona nuevaPersona = new Persona();
            nuevaPersona.setDni("88776655");
            nuevaPersona.setNombre("Micaela");
            nuevaPersona.setApellidos("Lopez");
            nuevaPersona.setTelefono("912345678");
            nuevaPersona.setCategoria("Sistemas"); 
            nuevaPersona.setEstado("Activo");      

            System.out.println("-> Intentando insertar a: " + nuevaPersona.getNombre());
            dao.crearPersona(nuevaPersona); 

            System.out.println("\n=== DATOS PARA EL DASHBOARD ===");
            
            int total = dao.obtenerTotalRegistros();
            System.out.println("Total de registros en BD: " + total);

            Map<String, Integer> estadisticas = dao.ObtenerConteoPorEstado();
            System.out.println("Estadísticas por estado:");
            estadisticas.forEach((estado, cantidad) -> {
                System.out.println(" - " + estado + ": " + cantidad);
            });

            Persona ultimo = dao.obtenerUltimoModificado();
            if (ultimo != null) {
                System.out.println("Último cambio detectado: " + ultimo.getNombre() + 
                                   " (" + ultimo.getUpdatedAt() + ")");
            }

            // 3. Listado Completo
            System.out.println("\n-> Listado General de Personas:");
            List<Persona> lista = dao.buscarPersonas();
            if (lista != null && !lista.isEmpty()) {
                for (Persona p : lista) {
                    System.out.println("ID: " + p.getId() + " | DNI: " + p.getDni() 
                                     + " | Nombre: " + p.getNombre() 
                                     + " | Cat: " + p.getCategoria() 
                                     + " | Estado: " + p.getEstado()); 
                }
            }

        } catch (Exception e) {
            System.err.println("Error en la prueba: " + e.getMessage());
            e.printStackTrace();
        }
    }
}