package cz.osu.team25.swiproject.controller;

import cz.osu.team25.swiproject.service.QuestionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = "*")   // 🔥 POVOLÍ VŠECHNY FRONTENDY
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping("/quiz")
    public List<Map<String, Object>> getQuiz(@RequestParam String quiz) {
        System.out.println("QUIZ ENDPOINT CALLED: " + quiz); // 🔥 DEBUG
        return questionService.getRandomQuizWithRandomOptions(quiz, 10);
    }
}
