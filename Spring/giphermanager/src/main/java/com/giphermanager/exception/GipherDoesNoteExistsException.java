package com.giphermanager.exception;

public class GipherDoesNoteExistsException extends Exception {

	private static final long serialVersionUID = 1L;

	public GipherDoesNoteExistsException(String message) {
        super(message);
    }
}
