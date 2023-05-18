package com.giphermanager.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.giphermanager.model.Gipher;

public interface GipherRepository extends JpaRepository<Gipher, String> {
	
	
	public List<Gipher> getAllGipherByUserId(String userId);
	
	
	public List<Gipher> getAllGipherByBookMarkedBy(String bookMarkedBy);

	
	public List<Gipher> getAllGipherByFavouritedBy(String favouritedBy);

}