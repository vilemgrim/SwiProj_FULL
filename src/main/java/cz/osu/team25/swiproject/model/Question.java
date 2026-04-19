package cz.osu.team25.swiproject.model;

import jakarta.persistence.*;

@Entity
@Table(name = "questions")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String quiz;      // např. EU_CAPITALS
    private String question;  // text otázky
    private String correct;   // správná odpověď

    public Question() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getQuiz() { return quiz; }
    public void setQuiz(String quiz) { this.quiz = quiz; }

    public String getQuestion() { return question; }
    public void setQuestion(String question) { this.question = question; }

    public String getCorrect() { return correct; }
    public void setCorrect(String correct) { this.correct = correct; }
}
