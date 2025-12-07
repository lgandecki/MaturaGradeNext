export type Lang = "pl" | "en";

export const STRINGS = {
  mainTitle: {
    pl: "Z Polaka",
    en: "Matura Grader",
  },
  // Metadata & Global
  metaTitle: {
    pl: "Matura z Polaka",
    en: "Polish Matura Assistant",
  },
  metaDescription: {
    pl: "Automatyczna ocena pracy maturalnej z polskiego przez sztuczną inteligencję",
    en: "AI-powered automated grading for Polish high school graduation essays",
  },

  // Header
  brandSubtitle: {
    pl: "AI Assistant",
    en: "AI Assistant",
  },
  navHistory: {
    pl: "Historia",
    en: "History",
  },
  navAbout: {
    pl: "O projekcie",
    en: "About",
  },
  navAccount: {
    pl: "Moje konto",
    en: "My Account",
  },
  authSignIn: {
    pl: "Zaloguj się",
    en: "Sign In",
  },
  authSignOut: {
    pl: "Wyloguj się",
    en: "Sign Out",
  },
  authAuthorizing: {
    pl: "Autoryzacja...",
    en: "Authorizing...",
  },
  menuTitle: {
    pl: "Menu",
    en: "Menu",
  },

  // About Page
  aboutTitle: {
    pl: "O projekcie",
    en: "About Project",
  },
  aboutDescription: {
    pl: '"Z Polaka" to narzędzie wspomagane sztuczną inteligencją, stworzone, aby pomóc maturzystom w przygotowaniach do egzaminu dojrzałości. Naszym celem jest zapewnienie szybkiej, rzetelnej i konstruktywnej oceny.',
    en: '"Matura Grader" is an AI-powered tool created to help students prepare for their Polish matriculation exam. Our goal is to provide fast, reliable, and constructive feedback.',
  },
  aboutCopyright: {
    pl: "Wszystkie prawa zastrzeżone.",
    en: "All rights reserved.",
  },

  // History Page
  historyTitle: {
    pl: "Historia wyników",
    en: "Results History",
  },
  historySubtitle: {
    pl: "Przegląd Twoich dotychczasowych prac i postępów",
    en: "Overview of your previous essays and progress",
  },
  historyLabelAverage: {
    pl: "Średnia",
    en: "Average",
  },
  historyLabelCount: {
    pl: "Prac",
    en: "Essays",
  },
  historyEmptyTitle: {
    pl: "Brak wyników",
    en: "No results",
  },
  historyEmptyDesc: {
    pl: "Nie masz jeszcze żadnych ocenionych prac. Wróć na stronę główną i prześlij swoją pierwszą rozprawkę.",
    en: "You don't have any graded essays yet. Return to the home page and submit your first essay.",
  },
  historyEmptyButton: {
    pl: "Oceń pierwszą pracę",
    en: "Grade first essay",
  },
  historyEssayType: {
    pl: "Rozprawka",
    en: "Essay",
  },
  historyPts: {
    pl: "pkt",
    en: "pts",
  },

  // Home Content - General
  toastLoadedTitle: {
    pl: "Dokument wczytany",
    en: "Document loaded",
  },
  toastLoadedDesc: {
    pl: "Wczytano", // + filename
    en: "Loaded",
  },
  toastEmptyTitle: {
    pl: "Pusty dokument",
    en: "Empty document",
  },
  toastEmptyDesc: {
    pl: "Wpisz tekst lub wgraj plik, aby ocenić pracę.",
    en: "Enter text or upload a file to grade the essay.",
  },
  toastErrorTitle: {
    pl: "Błąd",
    en: "Error",
  },
  toastErrorDesc: {
    pl: "Wystąpił błąd podczas oceny pracy.",
    en: "An error occurred while grading the essay.",
  },
  toastInvalidInputTitle: {
    pl: "To nie wygląda na rozprawkę",
    en: "This doesn't look like an essay",
  },
  toastInvalidInputDesc: {
    pl: "Prześlij tekst rozprawki, analizy literackiej lub pracy maturalnej. Spróbuj ponownie z właściwą treścią!",
    en: "Please submit an essay, literary analysis, or exam paper. Try again with proper content!",
  },
  toastCopyTitle: {
    pl: "Skopiowano do schowka",
    en: "Copied to clipboard",
  },
  toastCopyDesc: {
    pl: "Link do wyniku został skopiowany.",
    en: "Result link copied.",
  },
  shareMessage: {
    pl: "Uzyskałem {score}/{max} punktów z mojej pracy maturalnej! Sprawdź swoją na MaturaGrader.",
    en: "I got {score}/{max} points on my Matura essay! Check yours at MaturaGrader.",
  },

  // Home Content - Dialogs
  dialogAnalyzingTitle: {
    pl: "Analizowanie Twojej pracy",
    en: "Analyzing your essay",
  },
  dialogAnalyzingDesc: {
    pl: "Nasz system AI dokładnie weryfikuje Twoją pracę pod kątem wszystkich kryteriów maturalnych.",
    en: "Our AI system is thoroughly verifying your essay against all Matura criteria.",
  },
  dialogProgress: {
    pl: "Postęp analizy",
    en: "Analysis progress",
  },
  dialogEstimatedTime: {
    pl: "Szacowany czas zakończenia:",
    en: "Estimated completion time:",
  },
  dialogPatience: {
    pl: "Dziękujemy za cierpliwość. Dokładna analiza wymaga czasu.",
    en: "Thank you for your patience. Accurate analysis takes time.",
  },
  dialogSignUpTitle: {
    pl: "Załóż konto, aby zapisać wyniki",
    en: "Create account to save results",
  },
  dialogSignUpDesc: {
    pl: "Po rejestracji będziesz mieć dostęp do historii swoich prac z dowolnego urządzenia.",
    en: "After registration, you will have access to your essay history from any device.",
  },
  dialogSignUpButton: {
    pl: "Załóż konto",
    en: "Sign Up",
  },

  // Home Content - Writing Mode
  writingBack: {
    pl: "Wróć",
    en: "Go back",
  },
  writingFocus: {
    pl: "Tryb skupienia",
    en: "Focus mode",
  },
  writingGrade: {
    pl: "Oceń pracę",
    en: "Grade essay",
  },
  writingPlaceholder: {
    pl: "Rozpocznij pisanie swojej rozprawki...",
    en: "Start writing your essay here...",
  },
  writingSaved: {
    pl: "Zapisano:",
    en: "Saved:",
  },
  writingWords: {
    pl: "słów",
    en: "words",
  },

  // Home Content - Input Section
  inputTitle: {
    pl: "Twoja praca",
    en: "Your Essay",
  },
  inputReset: {
    pl: "Wyczyść",
    en: "Reset",
  },
  dropzoneDrop: {
    pl: "Upuść plik tutaj",
    en: "Drop file here",
  },
  dropzoneFormats: {
    pl: "Obsługujemy pliki tekstowe (.txt, .md).",
    en: "We support text files (.txt, .md).",
  },
  dropzoneManual: {
    pl: "Możesz też wpisać tekst ręcznie.",
    en: "Or you can type manually.",
  },
  buttonManual: {
    pl: "Napisz ręcznie",
    en: "Write manually",
  },
  textareaPlaceholder: {
    pl: "Zacznij pisać swoją rozprawkę tutaj...",
    en: "Start writing your essay here...",
  },
  buttonAnalyzing: {
    pl: "Analizowanie",
    en: "Analyzing",
  },

  // Home Content - Results
  resultTitle: {
    pl: "Wynik",
    en: "Result",
  },
  resultEmptyTitle: {
    pl: "Oczekiwanie na pracę",
    en: "Waiting for essay",
  },
  resultEmptyDesc: {
    pl: "Tutaj pojawi się szczegółowa analiza Twojej pracy, zawierająca ocenę punktową, listę błędów oraz sugestie poprawek.",
    en: "A detailed analysis of your essay will appear here, including score, list of errors, and improvement suggestions.",
  },
  resultScoreLabel: {
    pl: "Wynik Maturalny",
    en: "Matura Score",
  },
  resultFeedbackTitle: {
    pl: "Komentarz egzaminatora",
    en: "Examiner's Feedback",
  },
  resultErrorsTitle: {
    pl: "Do poprawy",
    en: "To Improve",
  },
  resultSuggestionsTitle: {
    pl: "Sugestie rozwoju",
    en: "Suggestions",
  },
  buttonShare: {
    pl: "Udostępnij wynik",
    en: "Share result",
  },
  buttonCopied: {
    pl: "Skopiowano!",
    en: "Copied!",
  },
  toastFeatureUnavailable: {
    pl: "Funkcja niedostępna",
    en: "Feature unavailable",
  },
  toastDownloadSoon: {
    pl: "Pobieranie PDF będzie dostępne wkrótce.",
    en: "PDF download will be available soon.",
  },

  // Grading Criteria
  critFormal: {
    pl: "Spełnienie formalnych warunków polecenia",
    en: "Fulfillment of formal requirements",
  },
  critFormalCardError: {
    pl: "Błąd kardynalny",
    en: "Cardinal error",
  },
  critFormalMissingRead: {
    pl: "Brak lektury",
    en: "Missing reading",
  },
  critFormalIrrelevant: {
    pl: "Nie dotyczy problemu",
    en: "Off-topic",
  },
  critFormalNoArg: {
    pl: "Brak argumentacji",
    en: "No argumentation",
  },

  critLit: {
    pl: "Kompetencje literackie i kulturowe",
    en: "Literary and cultural competencies",
  },
  critLitErr: {
    pl: "Błędy rzeczowe",
    en: "Factual errors",
  },
  critLitDesc: {
    pl: "Ocena umiejętności wykorzystania utworów literackich i tekstów kultury, funkcjonalności użycia argumentów oraz poprawności rzeczowej.",
    en: "Assessment of the use of literary works and cultural texts, functional use of arguments, and factual correctness.",
  },

  critStruct: {
    pl: "Struktura wypowiedzi",
    en: "Structure of the statement",
  },
  critStructDesc: {
    pl: "Ocena spójności, logiki wywodu oraz poprawności kompozycyjnej tekstu (wstęp, rozwinięcie, zakończenie).",
    en: "Assessment of coherence, logic of argument, and compositional correctness (introduction, body, conclusion).",
  },

  critCohere: {
    pl: "Spójność wypowiedzi",
    en: "Coherence of statement",
  },
  critCohereErr: {
    pl: "Błędy spójności",
    en: "Coherence errors",
  },
  critCohereDesc: {
    pl: "Ocena spójności wewnątrz zdaniowej i międzyzdaniowej oraz spójności międzyakapitowej.",
    en: "Assessment of intra-sentence, inter-sentence, and inter-paragraph coherence.",
  },

  critStyle: {
    pl: "Styl wypowiedzi",
    en: "Style of statement",
  },
  critStyleDesc: {
    pl: "Ocena stosowności stylu do gatunku wypowiedzi (rozprawka problemowa).",
    en: "Assessment of style appropriateness for the genre (problem essay).",
  },

  critLang: {
    pl: "Zakres i poprawność środków językowych",
    en: "Range and correctness of language",
  },
  critLangErr: {
    pl: "Błędy językowe",
    en: "Language errors",
  },
  critLangDesc: {
    pl: "Ocena poprawności leksykalnej, fleksyjnej, słowotwórczej i składniowej oraz zróżnicowania słownictwa i struktur składniowych.",
    en: "Assessment of lexical, inflectional, word-formation, and syntactic correctness, as well as vocabulary and structure variety.",
  },

  critSpell: {
    pl: "Poprawność ortograficzna",
    en: "Spelling correctness",
  },
  critSpellErr: {
    pl: "Błędy ortograficzne",
    en: "Spelling errors",
  },
  critSpellDesc: {
    pl: "Ocena poprawności zapisu wyrazów zgodnie z zasadami ortografii.",
    en: "Assessment of word spelling correctness according to orthographic rules.",
  },

  critPunct: {
    pl: "Poprawność interpunkcyjna",
    en: "Punctuation correctness",
  },
  critPunctErr: {
    pl: "Błędy interpunkcyjne",
    en: "Punctuation errors",
  },
  critPunctDesc: {
    pl: "Ocena poprawności stosowania znaków przestankowych.",
    en: "Assessment of the correct use of punctuation marks.",
  },
} as const;
