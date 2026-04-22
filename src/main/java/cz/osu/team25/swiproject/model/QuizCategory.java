package cz.osu.team25.swiproject.model;

import jakarta.persistence.*;

@Entity
@Table(name = "quiz_categories")
public class QuizCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Kódové označení, např. "EU_CAPITALS" (to, co už máte v tabulce questions)
    @Column(nullable = false, unique = true)
    private String code;

    // Hezký název pro uživatele, např. "Hlavní města Evropy"
    @Column(nullable = false)
    private String title;

    // Popisek pod nadpis, např. "Otestuj si znalosti evropských..."
    @Column(nullable = false)
    private String description;

    // Prázdný konstruktor (Spring Boot ho nutně potřebuje)
    public QuizCategory() {
    }

    public QuizCategory(String code, String title, String description) {
        this.code = code;
        this.title = title;
        this.description = description;
    }

    // --- GETTERY A SETTERY ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}