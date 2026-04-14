package cz.osu.team25.swiproject.controller;

import cz.osu.team25.swiproject.model.Question;
import cz.osu.team25.swiproject.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @GetMapping("/play")
    public List<Question> getQuizQuestions() {
        return questionService.getRandomQuestions(15);
    }
}