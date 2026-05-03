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
    private String question;
    private String correct;

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
    //Vytvoří novou tabulku question_wrong_answers a propojí ji přes question_id"
    @CollectionTable(
            name = "question_wrong_answers",
            joinColumns = @JoinColumn(name = "question_id")
    )
    //Sloupec
    @Column(name = "answer_text")
    private List<String> wrongAnswers = new ArrayList<>();

    public List<String> getWrongAnswers() { return wrongAnswers; }
    public void setWrongAnswers(List<String> wrongAnswers) { this.wrongAnswers = wrongAnswers; }
}
