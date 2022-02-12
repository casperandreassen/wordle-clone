package com.wordle_clone.wordle;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApiController {
    
    private final LocalDateTime todaysDate = LocalDateTime.now();

    @GetMapping("/todaysWord")
    public Greeting greeting() {
        
        return new Greeting(DateTimeFormatter.ofPattern("dd-MM-yyyy", Locale.ENGLISH).format(todaysDate));
    }
}
