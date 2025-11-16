export interface Question{
    id: number,
    title: string,
    prompt: string,
    category: Category
    difficulty: Difficulty
    type: QuestionType
    answerChoices?: Array<string>,
    answerIndex?: number,
    points: number,
    isCorrect?: boolean,
    isLiked?: boolean,
    isDisliked?: boolean,
    isFavorited?: boolean,
    freeResponseAnswer?: string,
    explanation?: string,
    codeSnippet?: string,
    language?: Language
    likes: number,
    dislikes: number
}

export interface AnswerRequest{
    userId: string,
    questionId: number,
    isCorrect: boolean
}

export interface VoteRequest{
    userId: string,
    questionId: number,
    isLiked: boolean
}

export interface FavoriteRequest{
    userId: string,
    questionId: number,
}

// export interface QuestionResponse{
//     userId: string,
//     questionId: number,
//     isCorrect?: boolean,
//     isLiked?: boolean,
//     isDisliked?: boolean,
//     likes?: number,
//     dislikes?: number
// }

export type QuestionRequest = Omit<Question, "id">;

export enum Category {
    ALGORITHMS = "ALGORITHMS",
    DATA_STRUCTURES = "DATA_STRUCTURES",
    DATABASES = "DATABASES",
    OPERATING_SYSTEMS = "OPERATING_SYSTEMS",
    NETWORKING = "NETWORKING",
    WEB_DEVELOPMENT = "WEB_DEVELOPMENT",
    LANGUAGES = "LANGUAGES"
}
  

export enum Difficulty {
    EASY = "EASY",
    MEDIUM = "MEDIUM",
    HARD = "HARD",
    FAANG = "FAANG"
}

export enum QuestionType {
    MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
    FREE_RESPONSE = "FREE_RESPONSE",
    CODING = "CODING",
}

export const DifficultyLabels: Record<Difficulty, string> = {
    [Difficulty.EASY]: "Easy",
    [Difficulty.MEDIUM]: "Medium",
    [Difficulty.HARD]: "Hard",
    [Difficulty.FAANG]: "FAANG"
};

export const CategoryLabels: Record<Category, string> = {
    [Category.ALGORITHMS]: "Algorithms",
    [Category.DATA_STRUCTURES]: "Data Structures",
    [Category.DATABASES]: "Databases",
    [Category.OPERATING_SYSTEMS]: "Operating Systems",
    [Category.NETWORKING]: "Networking",
    [Category.WEB_DEVELOPMENT]: "Web Development",
    [Category.LANGUAGES]: "Languages"
};

  

export const QuestionTypeLabels: Record<QuestionType, string> = {
    [QuestionType.MULTIPLE_CHOICE]: "Multiple Choice",
    [QuestionType.FREE_RESPONSE]: "Free Response",
    [QuestionType.CODING]: "Coding",
};
  

export enum Language{
    JAVA = "Java",
    JAVASCRIPT = "JavaScript",
    TYPESCRIPT = "TypeScript",
    CPP = "C++",
    C = "C",
    PYTHON = "Python"
}