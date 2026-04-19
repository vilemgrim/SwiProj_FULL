package cz.osu.team25.swiproject.service;

import cz.osu.team25.swiproject.model.Question;
import cz.osu.team25.swiproject.repository.QuestionRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    // 🔥 Hlavní logika pro generování kvízu
    public List<Map<String, Object>> getRandomQuizWithRandomOptions(String quiz, int count) {

        // všechny otázky z daného kvízu
        List<Question> all = questionRepository.findByQuiz(quiz);

        // náhodných X otázek
        List<Question> selected = questionRepository.getRandomQuestions(quiz, count);

        // seznam všech správných odpovědí
        List<String> allCorrectAnswers = all.stream()
                .map(Question::getCorrect)
                .toList();

        List<Map<String, Object>> result = new ArrayList<>();

        for (Question q : selected) {

            String correct = q.getCorrect();

            // seznam možností
            List<String> options = new ArrayList<>();
            options.add(correct);

            // náhodné jiné odpovědi
            List<String> wrong = new ArrayList<>(allCorrectAnswers);
            wrong.remove(correct);
            Collections.shuffle(wrong);

            // přidáme tolik odpovědí, kolik máme
            for (int i = 0; i < Math.min(3, wrong.size()); i++) {
                options.add(wrong.get(i));
            }

            // pokud máme méně než 4 možnosti, doplníme placeholdery
            while (options.size() < 4) {
                options.add("N/A");
            }

            // zamíchat pořadí
            Collections.shuffle(options);

            // výsledek pro jednu otázku
            Map<String, Object> item = new HashMap<>();
            item.put("question", q.getQuestion());
            item.put("options", options);
            item.put("correct", correct);

            result.add(item);
        }

        return result;
    }
}
