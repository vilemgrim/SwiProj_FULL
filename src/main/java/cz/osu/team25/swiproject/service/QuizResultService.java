package cz.osu.team25.swiproject.service;

import cz.osu.team25.swiproject.model.QuizResult;
import cz.osu.team25.swiproject.repository.QuizResultRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class QuizResultService {

    private final QuizResultRepository repository;

    public QuizResultService(QuizResultRepository repository) {
        this.repository = repository;
    }

    public void saveResult(String username, String quiz, int score, int total) {
        QuizResult result = new QuizResult();
        result.setUsername(username);
        result.setQuiz(quiz);
        result.setScore(score);
        result.setTotal(total);

        result.setPlayedAt(new Date());

        repository.save(result);
    }

    public List<QuizResult> getUserResults(String username) {
        return repository.findByUsername(username);
    }

    public void deleteAllByUser(String username) {
        repository.deleteByUsername(username);
    }

    public void deleteByUserAndQuiz(String username, String quiz) {
        repository.deleteByUsernameAndQuiz(username, quiz);
    }
}
