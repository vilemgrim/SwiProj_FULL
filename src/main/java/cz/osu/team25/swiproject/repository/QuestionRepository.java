package cz.osu.team25.swiproject.repository;

import cz.osu.team25.swiproject.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    List<Question> findByQuiz(String quiz);

    @Query(value = "SELECT * FROM questions WHERE quiz = :quiz ORDER BY RANDOM() LIMIT :count", nativeQuery = true)
    List<Question> getRandomQuestions(@Param("quiz") String quiz, @Param("count") int count);
}
