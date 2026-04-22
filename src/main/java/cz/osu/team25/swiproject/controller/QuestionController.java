package cz.osu.team25.swiproject.controller;

import cz.osu.team25.swiproject.model.Question;
import cz.osu.team25.swiproject.repository.QuestionRepository;
import cz.osu.team25.swiproject.service.QuestionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = "*") // Super, tohle tady už kolega měl!
public class QuestionController {

    private final QuestionService questionService;
    // 1. Přidáme nástroj pro ukládání do databáze
    private final QuestionRepository questionRepository;

    // 2. Upravíme konstruktor, aby si Java načetla i ten Repository
    public QuestionController(QuestionService questionService, QuestionRepository questionRepository) {
        this.questionService = questionService;
        this.questionRepository = questionRepository;
    }

    @GetMapping("/quiz")
    public List<Map<String, Object>> getQuiz(@RequestParam String quiz) {
        System.out.println("QUIZ ENDPOINT CALLED: " + quiz); // 🔥 DEBUG
        return questionService.getRandomQuizWithRandomOptions(quiz, 10);
    }

    // 3. 🔥 NOVÁ METODA PRO PŘIDÁVÁNÍ OTÁZEK Z REACTU
    @PostMapping("/add")
    public ResponseEntity<?> addQuestion(@RequestBody Question question) {
        try {
            // Vezmeme otázku, která přišla z Reactu, a uložíme ji do databáze
            questionRepository.save(question);
            return ResponseEntity.ok().body("{\"message\": \"Otázka úspěšně přidána\"}");
        } catch (Exception e) {
            // Vypíše přesný důvod chyby do konzole, kdyby se to databázi nelíbilo
            System.err.println("Chyba při ukládání otázky: " + e.getMessage());
            return ResponseEntity.badRequest().body("{\"error\": \"Chyba při ukládání na server.\"}");
        }
    }
}