package com.sogeti.daoImpl;

import java.util.logging.Logger;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;

import com.sogeti.GenericExceptions.TechnicalException;
import com.sogeti.dao.EmployeeSearchDao;
import com.sogeti.db.models.Login;
import com.sogeti.model.User;

@Repository("employeeDao")
public class EmployeeSearchDaoImpl implements EmployeeSearchDao {

	private static final Logger LOGGER = Logger.getLogger(EmployeeSearchDaoImpl.class.getName());
	private static final String loginHql = "FROM Login u WHERE u.userName = :email and u.password = :password";

	@PersistenceContext
	private EntityManager em;
	
	/**
	 * This used only for junit test cases
	 * 
	 * @param entityManager
	 */
	public void setEntityManager(EntityManager entityManager)
	{
	   this.em = entityManager;
	}

	/**
	 * Get employee details from database
	 */
	public Login getEmployee(String email, String password) throws TechnicalException {

		Query query = this.em.createQuery(loginHql);
		query.setParameter("email", email);
		query.setParameter("password", password);
		Login user = (Login) query.getSingleResult();
		LOGGER.info(" EmployeeSearchDaoImpl getEmployee:: " + user);
		return user;
	}

	public Login getEmployeeByUserName(String email) throws TechnicalException {
		String sqlQuery = "FROM User u where u.userName = :email";
		
		Query query = this.em.createQuery(sqlQuery);
		query.setParameter("email", email);
		Login user = (Login) query.getSingleResult();
		LOGGER.info(" EmployeeSearchDaoImpl getEmployee:: " + user);
		return user;
	}

}
