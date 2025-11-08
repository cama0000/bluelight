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
    isCorrect?: boolean
    freeResponseAnswer?: string
    explanation?: string
}

export interface AnswerRequest{
    userId: string,
    questionId: number,
    isCorrect: boolean
}

export type QuestionRequest = Omit<Question, "id">;

export enum Category{
    ALGORITHMS = "Algorithms",
    DATA_STRUCTURES = "Data Structures",
    DATABASES = "Databases",
    OPERATING_SYSTEMS = "Operating Systems",
    NETWORKING = "Networking",
    WEB_DEVELOPMENT = "Web Development",
    LANGUAGES = "Languages"
}

export enum Difficulty{
    EASY = "Easy",
    MEDIUM = "Medium",
    HARD = "Hard",
    FAANG = "FAANG"
}

export enum QuestionType{
    MULTIPLE_CHOICE = "Multiple Choice",
    FREE_RESPONSE = "Free Response",
    CODING = "Coding"
}