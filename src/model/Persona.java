package model;

public class Persona {

		
		private String nombre;
		public String getNombre() {
			return nombre;
		}
		public void setNombre(String nombre) {
			this.nombre = nombre;
		}
		public String getApellidos() {
			return apellidos;
		}
		public void setApellidos(String apellidos) {
			this.apellidos = apellidos;
		}
		public String getTelefono() {
			return telefono;
		}
		public void setTelefono(String telefono) {
			this.telefono = telefono;
		}
		public String getDni() {
			return dni;
		}
		public void setDni(String dni) {
			this.dni = dni;
		}
		public String getCategoria() {
			return categoria;
		}
		public void setCategoria(String categoria) {
			this.categoria = categoria;
		}
		public String getEstado() {
			return estado;
		}
		public void setEstado(String estado) {
			this.estado = estado;
		}
		public java.sql.Timestamp getCreatedAt() {
			return createdAt;
		}
		public void setCreatedAt(java.sql.Timestamp createdAt) {
			this.createdAt = createdAt;
		}
		public java.sql.Timestamp getUpdatedAt() {
			return updatedAt;
		}
		public void setUpdatedAt(java.sql.Timestamp updatedAt) {
			this.updatedAt = updatedAt;
		}
		
		private int id;
		public int getId() {
			return id;
		}
		public void setId(int id) {
			this.id = id;
		}

		private String apellidos;
		private String telefono;
		private String dni;
		private String categoria;
		private String estado;
		private java.sql.Timestamp createdAt;
		private java.sql.Timestamp updatedAt;

		
		
}
