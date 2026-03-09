1)Patron Singleton 
Ubicación: `src/util/ConexionDB.java`

Utilizé un constructor privado y un método estático getConexionDB() 
para verificar si la conexión es nula o ha sido cerrado antes de
retornar a una nueva instancia

2)Patron DAO
Ubicación: `src/controller/dao/IPersonaDAO.java`

Lo usé para separar la lógica del negocio con las consultas SQL
Si en un futuro se cambia la BD, solo se crearía una nueva Impl

3)Patron Factory
Ubicación: `src/factory/DAOFactory.java`

Para encapsular la creación de objetos DAO
