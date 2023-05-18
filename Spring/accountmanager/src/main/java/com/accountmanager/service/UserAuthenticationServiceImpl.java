package com.accountmanager.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.accountmanager.exception.UserAlreadyExistsException;
import com.accountmanager.exception.UserNotFoundException;
import com.accountmanager.model.User;
import com.accountmanager.repository.UserAutheticationRepository;

/*
* Service classes are used here to implement additional business logic/validation 
* This class has to be annotated with @Service annotation.
* @Service - It is a specialization of the component annotation. It doesn't currently 
* provide any additional behavior over the @Component annotation, but it's a good idea 
* to use @Service over @Component in service-layer classes because it specifies intent 
* better. Additionally, tool support and additional behavior might rely on it in the 
* future.
* */


@Service
public class UserAuthenticationServiceImpl implements UserAuthenticationService {

    /*
	 * Autowiring should be implemented for the UserAuthenticationRepository. (Use
	 * Constructor-based autowiring) Please note that we should not create any
	 * object using the new keyword.
	 */

	@Autowired
	UserAutheticationRepository userAuthenticationRepository;


     /*
	 * This method should be used to validate a user using userId and password.
	 *  Call the corresponding method of Respository interface.
	 * 
	 */
    @Override
    public User findByUserIdAndPassword(String userId, String password) throws UserNotFoundException {

    	User user = userAuthenticationRepository.findByUserIdAndUserPassword(userId, password);
    	System.out.println(user);
    	if(null != user) {
    		return user;
    	} else
        throw new UserNotFoundException("user not found");
    }


	/*
	 * This method should be used to save a new user.Call the corresponding method
	 * of Respository interface.
	 */

    @Override
    public boolean saveUser(User user) throws UserAlreadyExistsException {
    	Optional<User> user1 = userAuthenticationRepository.findById(user.getUserId());
    	System.out.println(user1);
    	if(user1.isPresent()) {
    		throw new UserAlreadyExistsException("User already exist"); 
    	} else {
    		userAuthenticationRepository.save(user);
    		return true;
    	}
        
    }
}
