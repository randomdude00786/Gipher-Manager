package com.giphermanager.exception;
public class GipherNotFoundExeption extends Exception {
   
	private static final long serialVersionUID = 1L;

	public GipherNotFoundExeption(String message) {
        super(message);
    }
}