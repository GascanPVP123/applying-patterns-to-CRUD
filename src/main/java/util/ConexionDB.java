package util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConexionDB {
    
    private static Connection conexionDB;

    private ConexionDB() {
    }
    
    public static Connection getConexionDB() {
        try {
            if (conexionDB == null || conexionDB.isClosed()) {
                // Asegúrate de que el nombre de la BD sea exactamente "personadb"
                String url = "jdbc:mysql://localhost:3306/personadb?serverTimezone=UTC";
                String usr = "root";
                String pwd = "";
                
                // Cargar el driver explícitamente
                Class.forName("com.mysql.cj.jdbc.Driver");
                
                conexionDB = DriverManager.getConnection(url, usr, pwd);
                System.out.println("¡Conexión exitosa!");
            }
        } catch (ClassNotFoundException e) {
            System.out.println("Error: No se encontró el Driver de MySQL (¿Agregaste el JAR?)");
            e.printStackTrace();
        } catch (SQLException e) {
            System.out.println("Error de SQL: " + e.getMessage());
            e.printStackTrace();
        }
        return conexionDB;
    }
}