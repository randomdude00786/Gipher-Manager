package com.accountmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.accountmanager.model.User;




/*
* This class is implementing the JpaRepository interface for User.
* */
@Repository
public interface UserAutheticationRepository extends JpaRepository<User, String> {



/*
	* Apart from the standard CRUD methods already available in JPA Repository, based
	* on our requirements, we might need to create few query methods for getting 
	* specific data from the database. 
	* */
	
	/*
	* This method will validate a user from database by username and password. 
    */
    
    User findByUserIdAndUserPassword(String userId, String userPassword);
}
