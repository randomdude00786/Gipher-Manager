package com.giphermanager.service;

import java.util.List;
import java.util.Optional;

import com.giphermanager.exception.GipherNotCreatedException;
import com.giphermanager.exception.GipherNotFoundExeption;
import com.giphermanager.model.Gipher;

public interface GipherService {

		Gipher createGipher(Gipher Gipher) throws GipherNotCreatedException;
		
		Gipher updateGipher(Gipher Gipher,String gipherId) throws GipherNotFoundExeption;

	    void deleteGipher(String gipherId) throws GipherNotFoundExeption;

	    void deleteAllGiphers() throws GipherNotFoundExeption;
	    
	    Optional<Gipher> getGipherById(String gipherId) throws GipherNotFoundExeption;

	    List<Gipher> getAllGipherByUserId(String userId) throws GipherNotFoundExeption;
	    
	    List<Gipher> getAllGipherByBookmark(String userId) throws GipherNotFoundExeption;
	    
	    List<Gipher> getAllGipherByFavorite(String userId) throws GipherNotFoundExeption;
	    
	    List<Gipher> getAllGiphers() throws GipherNotFoundExeption;
	    
	    List<Gipher> getGipherFromExternalAPI(String userId,String query) throws GipherNotCreatedException;

	}

