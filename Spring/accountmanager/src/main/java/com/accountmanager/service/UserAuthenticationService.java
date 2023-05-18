package com.accountmanager.service;

import com.accountmanager.exception.UserAlreadyExistsException;
import com.accountmanager.exception.UserNotFoundException;
import com.accountmanager.model.User;

public interface UserAuthenticationService {

    	/*
	 * Should not modify this interface. You have to implement these methods in
	 * corresponding Impl classes
	 */

    public User findByUserIdAndPassword(String userId, String password) throws UserNotFoundException;

    boolean saveUser(User user) throws UserAlreadyExistsException;
}
