package com.giphermanager.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import com.giphermanager.exception.GipherNotCreatedException;
import com.giphermanager.exception.GipherNotFoundExeption;
import com.giphermanager.helper.GipherHelper;
import com.giphermanager.model.Gipher;
import com.giphermanager.repository.GipherRepository;

@Service
public class GipherServiceImpl implements GipherService {
	
	@Autowired
	GipherRepository gipherRepository;
	
	@Autowired
	GipherHelper gipherHelper;
	
	@Override
	public List<Gipher> getAllGiphers() throws GipherNotFoundExeption {
		return gipherRepository.findAll();
	}
	
	@Override
	public List<Gipher> getAllGipherByUserId(String userId) throws GipherNotFoundExeption {
		return gipherRepository.getAllGipherByUserId(userId);
	}
	
	@Override
	public Gipher createGipher(Gipher gipher) throws GipherNotCreatedException{
		try {
			return gipherRepository.save(gipher);
		}catch(DuplicateKeyException e) {
			throw new GipherNotCreatedException("Gipher not created due to duplicate key");
		}
		
	}
	
	@Override
	public Gipher updateGipher(Gipher gipher,String gipherId) {
		Gipher categoryToUpdate = gipherRepository.findById(gipherId).get();
		Gipher updatedGipher = null;
		if(null != categoryToUpdate) {
			updatedGipher = gipherRepository.save(gipher); 
			 return gipher;
		}
		 return updatedGipher;
		
	}

	@Override
	public void deleteGipher(String gipherId) throws GipherNotFoundExeption{
		gipherRepository.deleteById(gipherId);
	}


	@Override
	public void deleteAllGiphers() throws GipherNotFoundExeption {
		gipherRepository.deleteAll();
	}


	@Override
	public List<Gipher> getAllGipherByBookmark(String bookMarkedBy) throws GipherNotFoundExeption {
		return gipherRepository.getAllGipherByBookMarkedBy(bookMarkedBy);
	}

	@Override
	public List<Gipher> getAllGipherByFavorite(String favoritedBy) throws GipherNotFoundExeption {
		return gipherRepository.getAllGipherByFavouritedBy(favoritedBy);
	}
	
	@Override
	public List<Gipher> getGipherFromExternalAPI(String userId,String query) throws GipherNotCreatedException{	
		List<Gipher> giphers = gipherHelper.getGipherFromExternalAPI(userId,query);
		for(Gipher gipher : giphers) {
			createGipher(gipher);
		}
		return giphers;
	}

	@Override
	public Optional<Gipher> getGipherById(String gipherId) throws GipherNotFoundExeption {
		return gipherRepository.findById(gipherId);
	}
}
