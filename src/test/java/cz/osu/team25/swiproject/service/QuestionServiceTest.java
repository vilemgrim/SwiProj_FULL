package cz.osu.team25.swiproject.service;

import cz.osu.team25.swiproject.model.Question;
import cz.osu.team25.swiproject.repository.QuestionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class QuestionServiceTest {

    //  mock databáze
    @Mock
    private QuestionRepository questionRepository;

    // Vložíme falešnou databázi do našeho skutečného Service
    @InjectMocks
    private QuestionService questionService;

    // Spustí se před každým testem, aby se to čistě připravilo
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    // TEST 1: Zda metoda vrací správný formát (4 možnosti a správnou odpověď)
    @Test
    void testGetRandomQuizGeneratesFourOptions() {
        // Vytvoříme testovací otázku
        Question mockQuestion = new Question();
        mockQuestion.setQuiz("JAVA_TEST");
        mockQuestion.setQuestion("Jaký je datový typ pro celá čísla?");
        mockQuestion.setCorrect("int");
        mockQuestion.setWrongAnswers(Arrays.asList("String", "boolean", "float"));

        // Řekneme falešné databázi, jak reagovat
        when(questionRepository.findByQuiz("JAVA_TEST")).thenReturn(Arrays.asList(mockQuestion));
        when(questionRepository.getRandomQuestions("JAVA_TEST", 1)).thenReturn(Arrays.asList(mockQuestion));

        // Zavoláme naši metodu v Service
        List<Map<String, Object>> result = questionService.getRandomQuizWithRandomOptions("JAVA_TEST", 1);

        // Ověříme výsledky
        assertEquals(1, result.size(), "Měla by se vrátit přesně 1 otázka");
        Map<String, Object> questionMap = result.get(0);

        List<String> options = (List<String>) questionMap.get("options");
        assertEquals(4, options.size(), "Otázka musí mít přesně 4 možnosti");
        assertTrue(options.contains("int"), "Možnosti musí obsahovat správnou odpověď");
    }

    // TEST 2: Zda funguje naše "Výhybka" pro hybridní systém

    @Test
    void testHybridSystemUsesManualWrongAnswers() {
        Question mockQuestion = new Question();
        mockQuestion.setQuiz("OSU_QUIZ");
        mockQuestion.setQuestion("Kde je Přírodovědecká fakulta OU?");
        mockQuestion.setCorrect("Na Hladnově");
        mockQuestion.setWrongAnswers(Arrays.asList("V Porubě", "V Praze", "Na Měsíci"));

        when(questionRepository.findByQuiz("OSU_QUIZ")).thenReturn(Arrays.asList(mockQuestion));
        when(questionRepository.getRandomQuestions("OSU_QUIZ", 1)).thenReturn(Arrays.asList(mockQuestion));

        List<Map<String, Object>> result = questionService.getRandomQuizWithRandomOptions("OSU_QUIZ", 1);

        List<String> options = (List<String>) result.get(0).get("options");
        assertTrue(options.contains("V Porubě"), "Musí obsahovat manuálně zadané špatné odpovědi z výhybky");
        assertTrue(options.contains("Na Měsíci"));
    }


    // TEST 3: jestli kvíz celého světa (WORLD_CAPITALS) volá všechny kontinenty

    @Test
    void testWorldCapitalsFetchesFromAllContinents() {
        // AKCE: Zavoláme kvíz s kódem pro celý svět
        questionService.getRandomQuizWithRandomOptions("WORLD_CAPITALS", 5);

        verify(questionRepository, times(1)).findByQuiz("EU_CAPITALS");
        verify(questionRepository, times(1)).findByQuiz("ASIA_CAPITALS");
        verify(questionRepository, times(1)).findByQuiz("AFRICA_CAPITALS");
        verify(questionRepository, times(1)).findByQuiz("NORTH_AMERICA_CAPITALS");
        verify(questionRepository, times(1)).findByQuiz("SOUTH_AMERICA_CAPITALS");
        verify(questionRepository, times(1)).findByQuiz("OCEANIA_CAPITALS");
    }
}