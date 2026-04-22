package cz.osu.team25.swiproject.repository;

import cz.osu.team25.swiproject.model.QuizCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizCategoryRepository extends JpaRepository<QuizCategory, Long> {
}