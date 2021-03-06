package com.sogeti.daoImpl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceException;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.sogeti.GenericExceptions.TechnicalException;
import com.sogeti.dao.AmContractDao;
import com.sogeti.db.models.AmContract;
import com.sogeti.db.models.Contract;

@Repository("amContractDao")
@Transactional
public class AmContractDaoImpl implements AmContractDao {
	
	@PersistenceContext
	private EntityManager entityManager;
	/**
	 * 
	 * @param entityManager
	 */
	public void setEntityManager(EntityManager entityManager) {
		this.entityManager = entityManager;
	}
	
	public Contract getContractById(int contractId){
		try
	      {
	         return entityManager.find(Contract.class, contractId);
	      }
	      catch (PersistenceException e)
	      {
	         throw new TechnicalException("Technical Exception in AmContractDaoImpl.getContractById()", e);
	      }
	}

	 @SuppressWarnings("unchecked")
	public List<AmContract> getAmContractsByContractId(Contract contractId) {
		try
	      {
	         Query query = this.entityManager.createQuery("select amc from AmContract amc where amc.contract = :contract");
	         query.setParameter("contract", contractId);
	         return query.getResultList();
	      }
	      catch (PersistenceException e)
	      {
	         throw new TechnicalException("Technical Exception in AmContractDaoImpl.getAmContractsByContractId()", e);
	      }
	}

	public AmContract getAmContractById(int amId) {
		try
	      {
	         return this.entityManager.find(AmContract.class, amId);
	      }
	      catch (PersistenceException e)
	      {
	         throw new TechnicalException("Technical Exception in AmContractDaoImpl.getAmContractById()", e);
	      }
	}

	public AmContract saveAmContract(AmContract AmContract) throws TechnicalException{
		AmContract savedAmContract = null;
        try {
        	savedAmContract = entityManager.merge(AmContract);
            flushAndClear();
        } catch (PersistenceException e) {
            throw new TechnicalException("ERROR WHILE SAVING AM CONTRACT RESOURCE",e);
        }

        return savedAmContract;

	}

	public boolean saveAmContractBatch(List<AmContract> AmContracts) {
		// TODO Auto-generated method stub
		return false;

	}
	
	public boolean deleteAmContract(AmContract amContract) throws TechnicalException{
		try
	      {
	         this.entityManager.remove(amContract);
	         return true;
	      }
	      catch (PersistenceException e)
	      {
	         throw new TechnicalException("Technical Exception in KnowLedgeBaseServiceDaoImpl.removeknowledgeBaseForUser()", e);
	      }
	}
	
	public int getMaxAmContractId() throws TechnicalException{
		int maxAmContractId = 0;		
		try {
			Integer intId = (Integer) this.entityManager.createQuery("select max(amc.amContractId) from AmContract amc").getSingleResult();
			maxAmContractId = intId.intValue();
		}catch(PersistenceException e){
			throw new TechnicalException("Technical Exception in KnowLedgeBaseServiceDaoImpl.removeknowledgeBaseForUser()", e);
		}
		return maxAmContractId;
	}
	
	private void flushAndClear() {
        entityManager.flush();
        entityManager.clear();
    }

}
