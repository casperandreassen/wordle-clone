package com.wordle_clone.wordle;

public class Greeting {
    private final String todaysDate; 
	private final String word;

	public Greeting(String todaysDate) {
		this.todaysDate = todaysDate; 
		this.word = todaysWord();
	}

    private String todaysWord() {
        return "ABBOR";
    }


	public String getTodaysDate() {
        return todaysDate;
    }

    public String getWord() {
        return word;
    }
}
