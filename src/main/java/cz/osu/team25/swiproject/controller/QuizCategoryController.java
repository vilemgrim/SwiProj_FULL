package cz.osu.team25.swiproject.controller;

import cz.osu.team25.swiproject.model.QuizCategory;
import cz.osu.team25.swiproject.repository.QuizCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quizzes")
@CrossOrigin
public class QuizCategoryController {

    // Tímto si "přitáhneme" repozitář, abychom ho mohli používat v metodách níže
    @Autowired
    private QuizCategoryRepository quizCategoryRepository;

    // Metoda pro STAŽENÍ všech kvízů (tu už jsme tam měli)
    @GetMapping
    public List<QuizCategory> getAllCategories() {
        return quizCategoryRepository.findAll();
    }

    // Metoda pro PŘIDÁNÍ nového kvízu (to, co jsi teď tvořil)
    @PostMapping("/add")
    public ResponseEntity<?> addQuizCategory(@RequestBody QuizCategory newCategory) {
        try {
            // Tady to konečně použije to quizCategoryRepository definované nahoře
            quizCategoryRepository.save(newCategory);
            return ResponseEntity.ok().body("{\"message\": \"Kvíz úspěšně vytvořen\"}");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("{\"error\": \"Chyba při ukládání. Zkuste jiný kód kvízu.\"}");
        }
    }
}