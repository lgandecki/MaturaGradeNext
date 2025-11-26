import { ServerGradingResult } from "./grade-matura";

export const mockResult: ServerGradingResult = {
  totalScore: 25,
  criteria: {
    formalRequirements: {
      points: 1,
      reasons: { cardinalError: false, missingReading: false, irrelevant: false, notArgumentative: false },
    },
    literaryCompetencies: { points: 11, factualErrors: 0 },
    structure: { points: 2 },
    coherence: { points: 2, coherenceErrors: 4 },
    style: { points: 1 },
    language: { points: 5, languageErrors: 6 },
    spelling: { points: 1, spellingErrors: 2 },
    punctuation: { points: 2, punctuationErrors: 5 },
  },
  feedback:
    "Praca spełnia wymogi formalne i jest rzeczową wypowiedzią argumentacyjną. Zdający wykazał się znajomością lektur obowiązkowych ('Dżuma', 'Dziady' cz. III) na poziomie zadowalającym, przywołując konkretne zdarzenia fabularne (śmierć Filipa, historia Cichowskiego). Funkcjonalnie wykorzystano kontekst historyczny (Powstanie Listopadowe). Struktura pracy jest poprawna, choć podział argumentacji dotyczącej 'Dżumy' na dwa osobne akapity nieco zaburza spójność wywodu. Głównym obszarem do poprawy jest język – występują liczne błędy składniowe (niewłaściwa rekcja czasownika, błędy w budowie zdań złożonych) oraz usterki ortograficzne (wielka litera w zaimkach w środku zdania).",
  errors: [
    "niebojącym poświęcać samego siebie (błąd składniowy - brak 'się')",
    "postawa Cichowskiego, którą opowiada Adolf (błąd składniowy - 'o której')",
    "wymęczeni są poprzez ciężkie objawy (błąd stylistyczno-składniowy)",
    "cierpią Ci (błąd ortograficzny - wielka litera)",
    "staja się (błąd ortograficzny/literówka)",
    "chłopiec był tylko dzieckiem, którego ogromnym męczarniom ludzie mogli się jedynie przyglądać (błąd składniowy - 'na którego ogromne męczarnie')",
  ],
  suggestions: [
    "Należy zwrócić uwagę na poprawność składniową zdań, szczególnie rekcję czasowników (np. 'bać się czegoś', 'opowiadać o czymś').",
    "Zaimki takie jak 'ci', 'tobie' piszemy wielką literą tylko w bezpośrednich zwrotach do adresata (np. w listach), a nie w rozprawkach o bohaterach literackich.",
    "Warto łączyć argumenty dotyczące jednej lektury w spójną całość lub wyraźnie rozdzielać je ze względu na różne aspekty problemu, aby uniknąć wrażenia poszatkowania wypowiedzi.",
  ],
};
