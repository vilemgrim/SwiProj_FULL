package cz.osu.team25.swiproject.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

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
    @ElementCollection
    // Tímto řekneme: "Vytvoř novou tabulku 'question_wrong_answers' a propoj ji přes 'question_id'"
    @CollectionTable(
            name = "question_wrong_answers",
            joinColumns = @JoinColumn(name = "question_id")
    )
    // Tímto řekneme, jak se bude jmenovat ten samotný sloupeček s textem špatné odpovědi
    @Column(name = "answer_text")
    private List<String> wrongAnswers = new ArrayList<>();

    public List<String> getWrongAnswers() { return wrongAnswers; }
    public void setWrongAnswers(List<String> wrongAnswers) { this.wrongAnswers = wrongAnswers; }
}
