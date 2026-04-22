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
}