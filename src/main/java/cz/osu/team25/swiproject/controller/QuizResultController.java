package cz.osu.team25.swiproject.controller;

import cz.osu.team25.swiproject.model.QuizResult;
import cz.osu.team25.swiproject.service.QuizResultService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/results")
public class QuizResultController {

    private final QuizResultService service;

    public QuizResultController(QuizResultService service) {
        this.service = service;
    }

    @PostMapping("/save")
    public void saveResult(@RequestBody Map<String, Object> body) {
        String username = (String) body.get("username");
        String quiz = (String) body.get("quiz");
        int score = (int) body.get("score");
        int total = (int) body.get("total");

        service.saveResult(username, quiz, score, total);
    }
    //Získání výsledků od uživatele
    @GetMapping("/user/{username}")
    public List<QuizResult> getUserResults(@PathVariable String username) {
        return service.getUserResults(username);
    }

    // Smazání všech výsledků uživatele
    @DeleteMapping("/user/{username}")
    public ResponseEntity<Void> deleteAllByUser(@PathVariable String username) {
        service.deleteAllByUser(username);
        return ResponseEntity.noContent().build();
    }

    // Smazání výsledků uživatele pro konkrétní kvíz
    @DeleteMapping("/user/{username}/quiz/{quiz}")
    public ResponseEntity<Void> deleteByUserAndQuiz(
            @PathVariable String username,
            @PathVariable String quiz
    ) {
        service.deleteByUserAndQuiz(username, quiz);
        return ResponseEntity.noContent().build();
    }
}
