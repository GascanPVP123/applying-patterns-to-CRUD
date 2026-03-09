package controller.impl;


import java.util.List;
import java.util.ArrayList;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;	
import controller.dao.IPersonaDAO;
import model.Persona;
import util.ConexionDB;
import java.util.Map;
import java.util.HashMap;


public class PersonaDAOImpl implements IPersonaDAO {

	@Override
	public void crearPersona(Persona persona) {
	    
		String sql = "INSERT INTO persona (nombre, apellidos, telefono, dni, categoria, estado) VALUES (?, ?, ?, ?, ?, ?)";
	    Connection cn = null;
	    
	    try {
	        cn = ConexionDB.getConexionDB();
	        cn.setAutoCommit(false); 
	        
	        try (PreparedStatement ps = cn.prepareStatement(sql)) {
	            ps.setString(1, persona.getNombre());
	            ps.setString(2, persona.getApellidos());
	            ps.setString(3, persona.getTelefono()); 
	            ps.setString(4, persona.getDni());
	            ps.setString(5, persona.getCategoria());
	            ps.setString(6, persona.getEstado());
	            
	            int filas = ps.executeUpdate(); 
	            
	            if (filas > 0) {
	                cn.commit(); 
	                System.out.println("Insert exitoso");
	            }
	        }
	    } catch (Exception e) {
	        try {
	            if (cn != null) cn.rollback(); 
	            System.out.println("Error: " + e.getMessage());
	        } catch (SQLException ex) {
	            ex.printStackTrace();
	        }
	    }
	}

	@Override
	public void actualizarPersona(Persona persona) {
		String sql = "UPDATE persona SET dni=?, nombre=?, apellidos=?, telefono=?, categoria=?, estado=?, WHERE id=?";
	    try (Connection cn = ConexionDB.getConexionDB();
	         PreparedStatement ps = cn.prepareStatement(sql)) {
	        
	        ps.setString(1, persona.getDni());
	        ps.setString(2, persona.getNombre());
	        ps.setString(3, persona.getApellidos());
	        ps.setString(4, persona.getTelefono());
	        ps.setString(5, persona.getCategoria());
	        ps.setString(6, persona.getEstado());
	        ps.setInt(7, persona.getId());
	        
	        
	        int filas = ps.executeUpdate();
	        if (filas > 0) {
	            System.out.println("Persona actualizada");
	        }
	    } catch (SQLException e) {
	        System.out.println("Error al actualizar: " + e.getMessage());
	    }
		
	}

	@Override
	public List<Persona> buscarPersonas() {
	    List<Persona> personas = new ArrayList<>();
	    String selectSQL = "SELECT * FROM persona";
	    	   
	    try (Connection cn = ConexionDB.getConexionDB();
	         PreparedStatement ps = cn.prepareStatement(selectSQL);
	         ResultSet rs = ps.executeQuery()) {
	        
	        while (rs.next()) {
	            Persona p = new Persona();
	            p.setId(rs.getInt("id"));
	            p.setNombre(rs.getString("nombre"));
	            p.setApellidos(rs.getString("apellidos"));
	            p.setTelefono(rs.getString("telefono"));
	            p.setDni(rs.getString("dni"));
	            p.setCategoria(rs.getString("categoria"));
	            p.setEstado(rs.getString("estado"));
	            p.setUpdatedAt(rs.getTimestamp("created_at"));
	            p.setUpdatedAt(rs.getTimestamp("updated_at"));
	            personas.add(p);
	        }
	    } catch (SQLException ex) {
	        System.out.println("Error al buscar: " + ex.getMessage());
	    }
	    return personas;
	}

	@Override
	public Persona buscarPersonaDNI(String dni) {
		Persona p = null;
	    String sql = "SELECT * FROM persona WHERE dni = ?";
	    try (Connection cn = ConexionDB.getConexionDB();
	         PreparedStatement ps = cn.prepareStatement(sql)) {
	        
	        ps.setString(1, dni);
	        try (ResultSet rs = ps.executeQuery()) {
	            if (rs.next()) {
	                p = new Persona();
	                p.setId(rs.getInt("id"));
	                p.setDni(rs.getString("dni"));
	                p.setNombre(rs.getString("nombre"));
	                p.setApellidos(rs.getString("apellidos"));
	                p.setTelefono(rs.getString("telefono"));
	            }
	        }
	    } catch (SQLException e) {
	        System.out.println("Error Al buscar: " + e.getMessage());
	    }
	    return p;
	}

	@Override
	public void eliminarPersona(Persona persona) {
		String sql = "DELETE FROM persona WHERE id = ?";
	    try (Connection cn = ConexionDB.getConexionDB();
	         PreparedStatement ps = cn.prepareStatement(sql)) {
	        
	        ps.setInt(1, persona.getId());
	        
	        int filas = ps.executeUpdate();
	        if (filas > 0) {
	            System.out.println("Registro eliminado");
	        }
	    } catch (SQLException e) {
	        System.out.println("Error al eliminar: " + e.getMessage());
	    }
		
	}
	
	@Override
	public int obtenerTotalRegistros() {
	    String sql = "SELECT COUNT(*) FROM persona";
	    try (Connection cn = ConexionDB.getConexionDB();
	         PreparedStatement ps = cn.prepareStatement(sql);
	         ResultSet rs = ps.executeQuery()) {
	        if (rs.next()) return rs.getInt(1);
	    } catch (SQLException e) { e.printStackTrace(); }
	    return 0;
	}
	
    @Override
    public Map<String, Integer> ObtenerConteoPorEstado() {
        Map<String, Integer> datos = new HashMap<>();
        String sql = "SELECT estado, COUNT(*) as total FROM persona GROUP BY estado";
        try (Connection cn = ConexionDB.getConexionDB();
             PreparedStatement ps = cn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                datos.put(rs.getString("estado"), rs.getInt("total"));
            }
        } catch (SQLException e) { e.printStackTrace(); }
        return datos;
    }


    @Override
    public Persona obtenerUltimoModificado() {
        Persona p = null;
        String sql = "SELECT * FROM persona ORDER BY updated_at DESC LIMIT 1";
        
        try (Connection cn = ConexionDB.getConexionDB();
             PreparedStatement ps = cn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            
            if (rs.next()) {
                p = new Persona();
                p.setId(rs.getInt("id"));
                p.setDni(rs.getString("dni"));
                p.setNombre(rs.getString("nombre"));
                p.setApellidos(rs.getString("apellidos"));
                p.setTelefono(rs.getString("telefono"));
                p.setCategoria(rs.getString("categoria"));
                p.setEstado(rs.getString("estado"));
                p.setUpdatedAt(rs.getTimestamp("updated_at"));
            }
        } catch (SQLException e) {
            System.out.println("Error al obtener el último modificado: " + e.getMessage());
        }
        return p;
    }
    
    
}
