package com.sogeti.controller;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.PersistenceException;

import org.apache.log4j.Logger;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.sogeti.GenericExceptions.TechnicalException;
import com.sogeti.constants.ABFConstants;
import com.sogeti.db.models.ResourceType;
import com.sogeti.model.ABFResponse;
import com.sogeti.model.ResourceTypeDT;
import com.sogeti.service.ResourceTypeManager;
/**
 * FixedContractController class  provides implementations for the contract. 
 * <P>
 * <B> Visibility decisions: </B>
 * <P>
 * Unless otherwise noted, attributes are private, and a public getter and
 * setter is provided for each.
 * <P>
 * <B> Design/implementation notes: </B>
 * <P>
 * Document any decisions, assumptions, issues, or other notes regarding the
 * implementation of this class.
 * <P>
 * <P>
 * <B> Revision History: </B>
 * 
 * <PRE>
 * 
 * =============================================================================
 * Prior Date            By                  Version  Project/CSR  Description 
 * ---------- --------------------------   ---------- ------------ ------------ 
 * 25/04/2016       Mohan             N/A          ABF        Created.
 * 
 * =============================================================================
 * 
 * </PRE>
 */
@RestController
@RequestMapping("/resourcetype")
public class ResourceTypeController {
	private Logger logger = Logger.getLogger(ResourceTypeController.class);

	@Autowired
	ResourceTypeManager resourceTypeManager;

	@RequestMapping(value = "/all", method = RequestMethod.GET)
	public ABFResponse getAll() {

		ABFResponse response = new ABFResponse();
		List<com.sogeti.db.models.ResourceType> resourceTypes = new ArrayList<com.sogeti.db.models.ResourceType>();
		List<ResourceTypeDT> resourceTypeDtList = new ArrayList<ResourceTypeDT>();
		resourceTypes = resourceTypeManager.findAll();
		for(ResourceType resourceType : resourceTypes){
			ResourceTypeDT tempDT = new ResourceTypeDT();
			tempDT.setResourcetypeId(resourceType.getResourcetypeId());
			tempDT.setResourceType(resourceType.getResourceType());
			tempDT.setActive(resourceType.getActive());
			resourceTypeDtList.add(tempDT);
		}
		response.setSuccessResponse(resourceTypeDtList);
		response.setStatus(ABFConstants.STATUS_SUCCESS);

		return response;
	}

	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public ABFResponse create(@RequestBody ResourceType resourcetype) {

		ABFResponse response = new ABFResponse();
		com.sogeti.db.models.ResourceType resourceTypeEntity = new com.sogeti.db.models.ResourceType();
		BeanUtils.copyProperties(resourcetype, resourceTypeEntity);
		logger.info("ContractData:" + resourceTypeEntity);

		try {
			resourceTypeManager.create(resourceTypeEntity);
			response.setStatus(ABFConstants.STATUS_SUCCESS);

		} catch (PersistenceException e) {
			response.setStatus(ABFConstants.STATUS_FAILURE);
			response.setFailureResponse(e.getMessage());
		}
		return response;
	}

	@RequestMapping(value = "/update", method = RequestMethod.PUT)
	public ABFResponse update(@RequestBody ResourceType resourcetype)

	{
		ABFResponse response = new ABFResponse();

		try {
			com.sogeti.db.models.ResourceType resourceTypeEntity = new com.sogeti.db.models.ResourceType();
			BeanUtils.copyProperties(resourcetype, resourceTypeEntity);
			resourceTypeEntity.setResourcetypeId(resourcetype.getResourcetypeId());
			resourceTypeManager.update(resourceTypeEntity);
			response.setStatus(ABFConstants.STATUS_SUCCESS);
		} catch (TechnicalException e) {
			logger.error("Exception in method ... ABFController.updateContract" + e);

			response.setFailureResponse(e.getMessage());
			response.setStatus(ABFConstants.STATUS_FAILURE);
		}

		return response;
	}

	@RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
	public ABFResponse delete(@PathVariable("id") int resourcetypeId)

	{
		ABFResponse response = new ABFResponse();

		try {
			com.sogeti.db.models.ResourceType resourceTypeEntity = new com.sogeti.db.models.ResourceType();
			resourceTypeEntity.setResourcetypeId(resourcetypeId);
			resourceTypeManager.delete(resourcetypeId);
			response.setStatus(ABFConstants.STATUS_SUCCESS);
		} 
		catch(DataIntegrityViolationException diEx){
			response.setFailureResponse(diEx.getMessage());
			response.setStatus(ABFConstants.STATUS_DI_EXCEPTION);
		}
		catch (TechnicalException e) {
			response.setFailureResponse(e.getMessage());
			response.setStatus(ABFConstants.STATUS_FAILURE);
		}

		return response;
	}

	@RequestMapping(value = "/find/{id}", method = RequestMethod.GET)
	public ABFResponse find(@PathVariable("id") int resourceTypeId)
	{
		ABFResponse response = new ABFResponse();

		try {

			com.sogeti.db.models.ResourceType role = resourceTypeManager.find(resourceTypeId);
			response.setSuccessResponse(role);
			response.setStatus(ABFConstants.STATUS_SUCCESS);
		} catch (TechnicalException e) {
			response.setFailureResponse(e.getMessage());
			response.setStatus(ABFConstants.STATUS_FAILURE);
		}

		return response;
	}
}
