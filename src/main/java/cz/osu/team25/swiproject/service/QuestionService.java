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

    // Hlavní logika pro generování kvízu
    public List<Map<String, Object>> getRandomQuizWithRandomOptions(String quiz, int count) {

        // SPECIÁLNÍ KATEGORIE: celý svět
        if (quiz.equals("WORLD_CAPITALS")) {

            // spojíme všechny otázky ze všech kvízů
            List<Question> all = new ArrayList<>();
            all.addAll(questionRepository.findByQuiz("EU_CAPITALS"));
            all.addAll(questionRepository.findByQuiz("ASIA_CAPITALS"));
            all.addAll(questionRepository.findByQuiz("AFRICA_CAPITALS"));
            all.addAll(questionRepository.findByQuiz("NORTH_AMERICA_CAPITALS"));
            all.addAll(questionRepository.findByQuiz("SOUTH_AMERICA_CAPITALS"));
            all.addAll(questionRepository.findByQuiz("OCEANIA_CAPITALS"));

            // zamícháme
            Collections.shuffle(all);

            // vybereme X náhodných otázek
            List<Question> selected = all.subList(0, Math.min(count, all.size()));

            // unikátní správné odpovědi z celého světa
            Set<String> uniqueAnswers = new HashSet<>();
            for (Question q : all) {
                uniqueAnswers.add(q.getCorrect());
            }
            List<String> allCorrectAnswers = new ArrayList<>(uniqueAnswers);

            List<Map<String, Object>> result = new ArrayList<>();

            for (Question q : selected) {

                String correct = q.getCorrect();

                List<String> options = new ArrayList<>();
                options.add(correct);

                List<String> wrong = new ArrayList<>(allCorrectAnswers);
                wrong.remove(correct);
                Collections.shuffle(wrong);

                for (int i = 0; i < Math.min(3, wrong.size()); i++) {
                    options.add(wrong.get(i));
                }

                while (options.size() < 4) {
                    options.add("N/A");
                }

                Collections.shuffle(options);

                Map<String, Object> item = new HashMap<>();
                item.put("question", q.getQuestion());
                item.put("options", options);
                item.put("correct", correct);

                result.add(item);
            }

            return result;
        }

        // STANDARDNÍ KATEGORIE (Evropa, Asie, Afrika, Amerika, Oceánie)

        // všechny otázky z daného kvízu
        List<Question> all = questionRepository.findByQuiz(quiz);

        // náhodných X otázek (unikátních)
        List<Question> selected = questionRepository.getRandomQuestions(quiz, count);

        // unikátní správné odpovědi pouze z daného kvízu
        Set<String> uniqueAnswers = new HashSet<>();
        for (Question q : all) {
            uniqueAnswers.add(q.getCorrect());
        }
        List<String> allCorrectAnswers = new ArrayList<>(uniqueAnswers);

        List<Map<String, Object>> result = new ArrayList<>();

        for (Question q : selected) {

            String correct = q.getCorrect();

            // seznam možností
            List<String> options = new ArrayList<>();
            options.add(correct);

            // náhodné jiné odpovědi (unikátní, pouze z daného kvízu)
            List<String> wrong = new ArrayList<>(allCorrectAnswers);
            wrong.remove(correct); // odstraníme správnou odpověď
            Collections.shuffle(wrong);

            // přidáme 3 různé špatné odpovědi
            for (int i = 0; i < Math.min(3, wrong.size()); i++) {
                options.add(wrong.get(i));
            }

            // pokud by bylo málo odpovědí v DB, doplníme placeholdery
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
