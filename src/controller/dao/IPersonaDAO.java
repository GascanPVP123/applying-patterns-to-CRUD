package controller.dao;

import java.util.List;

import model.Persona;

public interface IPersonaDAO {
	
	public void crearPersona(Persona persona);
	public void actualizarPersona(Persona persona);
	public void eliminarPersona(Persona persona);
	public List<Persona> buscarPersonas();
	public Persona buscarPersonaDNI(String dni);
	public java.util.Map<String, Integer> ObtenerConteoPorEstado();
	public Persona obtenerUltimoModificado();
	int obtenerTotalRegistros();

}
