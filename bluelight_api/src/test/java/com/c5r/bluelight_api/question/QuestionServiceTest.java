package com.c5r.bluelight_api.question;

import com.c5r.bluelight_api.Question.Question;
import com.c5r.bluelight_api.Question.QuestionRepository;
import com.c5r.bluelight_api.Question.QuestionService;
import com.c5r.bluelight_api.Question.Difficulty;
import com.c5r.bluelight_api.Question.Category;
import com.c5r.bluelight_api.Question.QuestionType;
import com.c5r.bluelight_api.Question.QuestionResponse;
import com.c5r.bluelight_api.UserFavorite.UserFavorite;
import com.c5r.bluelight_api.UserQuestion.UserQuestion;
import com.c5r.bluelight_api.UserQuestion.UserQuestionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class QuestionServiceTest {

    @Mock
    QuestionRepository questionRepository;

    @Mock
    UserQuestionService userQuestionService;

    QuestionService questionService;

    @BeforeEach
    public void beforeTest(){
        questionService = new QuestionService(questionRepository, userQuestionService);
    }

    @Test
    public void findQuestionById() {
        Question question = new Question();

        question.setId(1L);

        when(questionRepository.findById(1L)).thenReturn(Optional.of(question));

        Optional<Question> resultQuestion = questionService.findById(1L);

        assertTrue(resultQuestion.isPresent());
        assertEquals(question.getId(), resultQuestion.get().getId());
    }

    @Test
    public void findAllQuestions() {
        List<Question> questions = new ArrayList<>();
        Question question = new Question();

        Long questionId = 1L;
        String questionTitle = "question title";
        String questionPrompt = "question prompt";
        Difficulty difficulty = Difficulty.EASY;
        Category category = Category.DATA_STRUCTURES;
        QuestionType type = QuestionType.MULTIPLE_CHOICE;
        int likes = 10;
        int dislikes = 2;
        String explanation = "explanation";
        int points = 10;
        Integer answerIndex = 1;

        List<String> answerChoices = new ArrayList<>();
        answerChoices.add("answer1");
        answerChoices.add("answer2");
        answerChoices.add("answer3");
        answerChoices.add("answer4");

        question.setId(questionId);
        question.setTitle(questionTitle);
        question.setPrompt(questionPrompt);
        question.setDifficulty(difficulty);
        question.setCategory(category);
        question.setType(type);
        question.setLikes(likes);
        question.setDislikes(dislikes);
        question.setExplanation(explanation);
        question.setPoints(points);
        question.setAnswerChoices(answerChoices);
        question.setAnswerIndex(answerIndex);
        questions.add(question);

        when(questionRepository.findAll()).thenReturn(questions);

        List<Question> resultQuestions = questionService.findAll();

        assertEquals(question.getId(), resultQuestions.get(0).getId());
        assertEquals(question.getTitle(), resultQuestions.get(0).getTitle());
    }

    @Test
    public void saveQuestion(){
        Question question = new Question();
        question.setId(1L);

        when(questionRepository.save(question))
                .thenReturn(question);

        Question resultQuestion = questionService.save(question);

        assertEquals(question.getId(), resultQuestion.getId());
    }

    @Test
    public void generateAllQuestionResponses(){
        List<Question> questions = new ArrayList<>();

        Long questionId = 1L;
        String questionTitle = "question title";
        String questionPrompt = "question prompt";
        Difficulty difficulty = Difficulty.EASY;
        Category category = Category.DATA_STRUCTURES;
        QuestionType type = QuestionType.MULTIPLE_CHOICE;
        int likes = 10;
        int dislikes = 2;
        String explanation = "explanation";
        int points = 10;
        Integer answerIndex = 1;

        List<String> answerChoices = new ArrayList<>();
        answerChoices.add("answer1");
        answerChoices.add("answer2");
        answerChoices.add("answer3");
        answerChoices.add("answer4");

        Question question = new Question();
        question.setId(questionId);
        question.setTitle(questionTitle);
        question.setPrompt(questionPrompt);
        question.setDifficulty(difficulty);
        question.setCategory(category);
        question.setType(type);
        question.setLikes(likes);
        question.setDislikes(dislikes);
        question.setExplanation(explanation);
        question.setPoints(points);
        question.setAnswerChoices(answerChoices);
        question.setAnswerIndex(answerIndex);
        questions.add(question);


        UserQuestion userQuestion = new UserQuestion();
        Long userQuestionId = 1L;
        Long userId = 1L;
        boolean wasCorrect = true;

        userQuestion.setId(userQuestionId);
        userQuestion.setQuestionId(questionId);
        userQuestion.setUserId(userId);
        userQuestion.setWasCorrect(wasCorrect);
        userQuestion.setPointsEarned(points);

        when(userQuestionService.findByQuestionId(questionId)).thenReturn(Optional.of(userQuestion));

        List<QuestionResponse> questionResponses = questionService.generateAllQuestionResponses(questions);
        QuestionResponse resultQuestionResponse = questionResponses.get(0);

        assertEquals(questions.size(), questionResponses.size());
        assertEquals(question.getId(), resultQuestionResponse.getId());
        assertEquals(question.getTitle(), resultQuestionResponse.getTitle());
        assertEquals(question.getPrompt(), resultQuestionResponse.getPrompt());
        assertEquals(question.getDifficulty(), resultQuestionResponse.getDifficulty());
        assertEquals(question.getCategory(), resultQuestionResponse.getCategory());
        assertEquals(question.getType(), resultQuestionResponse.getType());
        assertEquals(question.getLikes(), resultQuestionResponse.getLikes());
        assertEquals(question.getDislikes(), resultQuestionResponse.getDislikes());
        assertEquals(question.getExplanation(), resultQuestionResponse.getExplanation());
        assertEquals(question.getPoints(), resultQuestionResponse.getPoints());
        assertEquals(question.getAnswerIndex(), resultQuestionResponse.getAnswerIndex());
        assertEquals(question.getAnswerChoices(), resultQuestionResponse.getAnswerChoices());
        assertEquals(userQuestion.getWasCorrect(), resultQuestionResponse.isCorrect());
    }

    @Test
    public void generateCompletedQuestionResponses(){
        Long questionId = 1L;
        String questionTitle = "question title";
        String questionPrompt = "question prompt";
        Difficulty difficulty = Difficulty.EASY;
        Category category = Category.DATA_STRUCTURES;
        QuestionType type = QuestionType.MULTIPLE_CHOICE;
        int likes = 10;
        int dislikes = 2;
        String explanation = "explanation";
        int points = 10;
        Integer answerIndex = 1;

        List<String> answerChoices = new ArrayList<>();
        answerChoices.add("answer1");
        answerChoices.add("answer2");
        answerChoices.add("answer3");
        answerChoices.add("answer4");

        Question question = new Question();
        question.setId(questionId);
        question.setTitle(questionTitle);
        question.setPrompt(questionPrompt);
        question.setDifficulty(difficulty);
        question.setCategory(category);
        question.setType(type);
        question.setLikes(likes);
        question.setDislikes(dislikes);
        question.setExplanation(explanation);
        question.setPoints(points);
        question.setAnswerChoices(answerChoices);
        question.setAnswerIndex(answerIndex);

        List<UserQuestion> userQuestions = new ArrayList<>();
        UserQuestion userQuestion = new UserQuestion();
        Long userQuestionId = 1L;
        Long userId = 1L;
        boolean wasCorrect = true;

        userQuestion.setId(userQuestionId);
        userQuestion.setQuestionId(questionId);
        userQuestion.setUserId(userId);
        userQuestion.setWasCorrect(wasCorrect);
        userQuestion.setPointsEarned(points);
        userQuestions.add(userQuestion);

        when(questionRepository.findById(questionId)).thenReturn(Optional.of(question));

        List<QuestionResponse> questionResponses = questionService.generateCompletedQuestionResponses(userQuestions);
        QuestionResponse resultQuestionResponse = questionResponses.get(0);

        assertEquals(1, questionResponses.size());
        assertEquals(question.getId(), resultQuestionResponse.getId());
        assertEquals(question.getTitle(), resultQuestionResponse.getTitle());
        assertEquals(question.getPrompt(), resultQuestionResponse.getPrompt());
        assertEquals(question.getDifficulty(), resultQuestionResponse.getDifficulty());
        assertEquals(question.getCategory(), resultQuestionResponse.getCategory());
        assertEquals(question.getType(), resultQuestionResponse.getType());
        assertEquals(question.getLikes(), resultQuestionResponse.getLikes());
        assertEquals(question.getDislikes(), resultQuestionResponse.getDislikes());
        assertEquals(question.getExplanation(), resultQuestionResponse.getExplanation());
        assertEquals(question.getPoints(), resultQuestionResponse.getPoints());
        assertEquals(question.getAnswerIndex(), resultQuestionResponse.getAnswerIndex());
        assertEquals(question.getAnswerChoices(), resultQuestionResponse.getAnswerChoices());
        assertEquals(userQuestion.getWasCorrect(), resultQuestionResponse.isCorrect());
    }

    @Test
    public void generateFavoritedQuestionResponses(){
        Long questionId = 1L;
        String questionTitle = "question title";
        String questionPrompt = "question prompt";
        Difficulty difficulty = Difficulty.EASY;
        Category category = Category.DATA_STRUCTURES;
        QuestionType type = QuestionType.MULTIPLE_CHOICE;
        int likes = 10;
        int dislikes = 2;
        String explanation = "explanation";
        int points = 10;
        Integer answerIndex = 1;

        List<String> answerChoices = new ArrayList<>();
        answerChoices.add("answer1");
        answerChoices.add("answer2");
        answerChoices.add("answer3");
        answerChoices.add("answer4");

        Question question = new Question();
        question.setId(questionId);
        question.setTitle(questionTitle);
        question.setPrompt(questionPrompt);
        question.setDifficulty(difficulty);
        question.setCategory(category);
        question.setType(type);
        question.setLikes(likes);
        question.setDislikes(dislikes);
        question.setExplanation(explanation);
        question.setPoints(points);
        question.setAnswerChoices(answerChoices);
        question.setAnswerIndex(answerIndex);

        List<UserFavorite> userFavorites = new ArrayList<>();
        UserFavorite userFavorite = new UserFavorite();
        Long userFavoriteId = 1L;
        Long userId = 1L;

        userFavorite.setId(userFavoriteId);
        userFavorite.setQuestionId(questionId);
        userFavorite.setUserId(userId);
        userFavorites.add(userFavorite);

        when(questionRepository.findById(questionId)).thenReturn(Optional.of(question));

        List<QuestionResponse> questionResponses = questionService.generateFavoritedQuestionResponses(userFavorites);
        QuestionResponse resultQuestionResponse = questionResponses.get(0);

        assertEquals(1, questionResponses.size());
        assertEquals(question.getId(), resultQuestionResponse.getId());
        assertEquals(question.getTitle(), resultQuestionResponse.getTitle());
        assertEquals(question.getPrompt(), resultQuestionResponse.getPrompt());
        assertEquals(question.getDifficulty(), resultQuestionResponse.getDifficulty());
        assertEquals(question.getCategory(), resultQuestionResponse.getCategory());
        assertEquals(question.getType(), resultQuestionResponse.getType());
        assertEquals(question.getLikes(), resultQuestionResponse.getLikes());
        assertEquals(question.getDislikes(), resultQuestionResponse.getDislikes());
        assertEquals(question.getExplanation(), resultQuestionResponse.getExplanation());
        assertEquals(question.getPoints(), resultQuestionResponse.getPoints());
        assertEquals(question.getAnswerIndex(), resultQuestionResponse.getAnswerIndex());
        assertEquals(question.getAnswerChoices(), resultQuestionResponse.getAnswerChoices());
        assertTrue(resultQuestionResponse.isFavorited());
    }
}
