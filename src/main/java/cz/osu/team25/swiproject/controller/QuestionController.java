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
@CrossOrigin(origins = "*")
public class QuestionController {

    private final QuestionService questionService;
    private final QuestionRepository questionRepository;

    public QuestionController(QuestionService questionService, QuestionRepository questionRepository) {
        this.questionService = questionService;
        this.questionRepository = questionRepository;
    }

    @GetMapping("/quiz")
    public List<Map<String, Object>> getQuiz(
            @RequestParam String quiz,
            @RequestParam(defaultValue = "10") int count
    ) {
        System.out.println("QUIZ ENDPOINT CALLED: " + quiz + ", POČET OTÁZEK: " + count);
        return questionService.getRandomQuizWithRandomOptions(quiz, count);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addQuestion(@RequestBody Question question) {
        try {
            questionRepository.save(question);
            return ResponseEntity.ok().body("{\"message\": \"Otázka úspěšně přidána\"}");
        } catch (Exception e) {
            System.err.println("Chyba při ukládání otázky: " + e.getMessage());
            return ResponseEntity.badRequest().body("{\"error\": \"Chyba při ukládání na server.\"}");
        }
    }
    // 1. Získání VŠECH otázek (pro zobrazení v tabulce adminovi)
    @GetMapping
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    // 2. Úprava existující otázky
    @PutMapping("/{id}")
    public ResponseEntity<?> updateQuestion(@PathVariable Long id, @RequestBody Question updatedQuestion) {
        if (!questionRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        updatedQuestion.setId(id); // Pojistka, aby se přepsala ta správná otázka

        try {
            questionRepository.save(updatedQuestion);
            return ResponseEntity.ok().body("{\"message\": \"Otázka úspěšně upravena\"}");
        } catch (Exception e) {
            System.err.println("Chyba při úpravě otázky: " + e.getMessage());
            return ResponseEntity.badRequest().body("{\"error\": \"Chyba při úpravě na serveru.\"}");
        }
    }

    // 3. Smazání otázky
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteQuestion(@PathVariable Long id) {
        try {
            questionRepository.deleteById(id);
            return ResponseEntity.ok().body("{\"message\": \"Otázka úspěšně smazána\"}");
        } catch (Exception e) {
            System.err.println("Chyba při mazání otázky: " + e.getMessage());
            return ResponseEntity.badRequest().body("{\"error\": \"Nelze smazat otázku.\"}");
        }
    }
}