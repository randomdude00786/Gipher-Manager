package com.giphermanager.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.giphermanager.exception.GipherNotCreatedException;
import com.giphermanager.exception.GipherNotFoundExeption;
import com.giphermanager.external.model.GipherExternal;
import com.giphermanager.helper.GipherHelper;
import com.giphermanager.model.Gipher;
import com.giphermanager.service.GipherService;

@RestController
@CrossOrigin(origins = "*")
public class GipherController {

	@Autowired
	GipherService gipherService;
	
	@Autowired
	GipherHelper gipherHelper;
	
	public GipherController(GipherService gipherService) {
		this.gipherService = gipherService;
	}
	
	@GetMapping("/api/v1/gipher/{gipherId}")
	public ResponseEntity<?> getAllGipherById(@PathVariable("gipherId") String gipherId) {
		Optional<Gipher> gipher;
		try {
			gipher = gipherService.getGipherById(gipherId);
			return new ResponseEntity<>(gipher, HttpStatus.OK);
		} catch (GipherNotFoundExeption e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/api/v1/gipher")
	public ResponseEntity<?> getAllGiphers() {
		List<Gipher> giphers;
		try {
			giphers = gipherService.getAllGiphers();
			return new ResponseEntity<>(giphers, HttpStatus.OK);
		} catch (GipherNotFoundExeption e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("/api/v1/gipher")
	public ResponseEntity<?> createGipher(@RequestBody Gipher gipher) {
		Gipher gipherCreated = null;
		try {
			gipherCreated = gipherService.createGipher(gipher);
			return new ResponseEntity<>(gipherCreated,HttpStatus.CREATED);
		} catch (GipherNotCreatedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}
					
	}
	
	@PutMapping("/api/v1/gipher/{id}")
	public ResponseEntity<?> updateGipher(@RequestBody Gipher gipher,@PathVariable("id") String id) {
		Gipher updateGipher = null;
		try {
			updateGipher = gipherService.updateGipher(gipher,id);
			return new ResponseEntity<>(updateGipher, HttpStatus.OK);
		} catch (GipherNotFoundExeption e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@DeleteMapping("/api/v1/gipher/{gipherId}")
	public ResponseEntity<?> deleteGipher(@PathVariable("gipherId") String gipherId) {
		try {
			gipherService.deleteGipher(gipherId);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (GipherNotFoundExeption e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/api/v1/gipher/externalapi/{userId}/{query}")
	public ResponseEntity<?> getGiphersFromExternalAPI(@PathVariable("userId") String userId,@PathVariable("query") String query) throws GipherNotCreatedException, GipherNotFoundExeption {
		
		List<Gipher> g = gipherHelper.getGipherFromExternalAPI(userId, query);
 		return new ResponseEntity<>(g, HttpStatus.OK);
	}
	
	@GetMapping("/api/v1/gipher/user/{userid}")
	public ResponseEntity<?> getAllGipherByUserId(@PathVariable("userid") String userId) {
		List<Gipher> giphers;
		try {
			giphers = gipherService.getAllGipherByUserId(userId);
			return new ResponseEntity<>(giphers, HttpStatus.OK);
		} catch (GipherNotFoundExeption e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/api/v1/gipher/bookmark/{bookmarkedBy}")
	public ResponseEntity<?> getAllGipherByBookmarkedBy(@PathVariable("bookmarkedBy") String bookmarkedBy) {
		List<Gipher> giphers;
		try {
			giphers = gipherService.getAllGipherByBookmark(bookmarkedBy);
			return new ResponseEntity<>(giphers, HttpStatus.OK);
		} catch (GipherNotFoundExeption e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/api/v1/gipher/favourite/{favouritedBy}")
	public ResponseEntity<?> getAllGipherByFavouritedBy(@PathVariable("favouritedBy") String favouritedBy) {
		List<Gipher> giphers;
		try {
			giphers = gipherService.getAllGipherByFavorite(favouritedBy);
			return new ResponseEntity<>(giphers, HttpStatus.OK);
		} catch (GipherNotFoundExeption e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
