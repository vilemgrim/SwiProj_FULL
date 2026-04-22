package cz.osu.team25.swiproject.repository;

import cz.osu.team25.swiproject.model.QuizResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface QuizResultRepository extends JpaRepository<QuizResult, Long> {

    List<QuizResult> findByUsername(String username);

    // Smazání všech výsledků uživatele
    @Transactional
    @Modifying
    void deleteByUsername(String username);

    // Smazání výsledků uživatele pro konkrétní kvíz
    @Transactional
    @Modifying
    void deleteByUsernameAndQuiz(String username, String quiz);
}
