package cz.osu.team25.swiproject.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
public class QuizResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String quiz;
    private int score;
    private int total;

    @Temporal(TemporalType.TIMESTAMP)
    private Date playedAt;

    public QuizResult() {}

    //Filipe uprav
    public QuizResult(String username, String quiz, int score, int total) {
        this.username = username;
        this.quiz = quiz;
        this.score = score;
        this.total = total;
        this.playedAt = new Date();
    }

    public Long getId() { return id; }
    public String getUsername() { return username; }
    public String getQuiz() { return quiz; }
    public int getScore() { return score; }
    public int getTotal() { return total; }
    public Date getPlayedAt() { return playedAt; }

    public void setId(Long id) { this.id = id; }
    public void setUsername(String username) { this.username = username; }
    public void setQuiz(String quiz) { this.quiz = quiz; }
    public void setScore(int score) { this.score = score; }
    public void setTotal(int total) { this.total = total; }
    public void setPlayedAt(Date playedAt) { this.playedAt = playedAt; }
}
