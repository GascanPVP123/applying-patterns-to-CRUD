package factory;

import controller.dao.IPersonaDAO;
import controller.impl.PersonaDAOImpl;

public class DAOFactory {
	public static IPersonaDAO getPersonaDAO() {
        return new PersonaDAOImpl();
	}
}
