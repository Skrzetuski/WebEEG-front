# 🗺️ Roadmapa Rozwoju Aplikacji Noesis

---

## 📦 Funkcjonalności podstawowe aplikacji

| Funkcja                              | Opis                                                                 | Status |
|--------------------------------------|----------------------------------------------------------------------|--------|
| Inicjalizacja projektu               | Utworzenie projektu, konfiguracja                                    | ✅     |
| Routing widoków                      | Konfiguracja tras dla paneli: logowanie, EEG, kreator, tagowanie     | ✅     |
| Layout i nawigacja                   | Nagłówek, sidebar, routing dynamiczny, responsywność                 | ⚠️     |

---

## 🔐 Logowanie i zarządzanie użytkownikami

| Funkcja                        | Opis                                                                 | Status |
|--------------------------------|----------------------------------------------------------------------|--------|
| Formularz logowania            | Pola login + hasło, walidacja, komunikaty błędów                     | ✅     |
| Obsługa sesji (JWT)            | Przechowywanie tokena, context użytkownika                           | ✅     |
| Ochrona tras (route guards)    | Przekierowanie niezalogowanych użytkowników                          | ✅     |
| Obsługa ról (lekarz/badacz)    | Filtrowanie UI na podstawie roli                                     | ❌     |

---

## 📊 Moduł EEG z analizą ML

| Funkcja                                 | Opis                                                                | Status |
|-----------------------------------------|---------------------------------------------------------------------|--------|
| Odbiór sygnału EEG                      | Połączenie z urządzeniem, aktualizacja danych w czasie rzeczywistym | ❌     |
| Wizualizacja sygnału EEG                | Dynamiczny wykres fal, skala czasu, zoom, scroll                    | ❌     |
| Diagnostyka ML (WebNN)                  | Wczytanie modelu, analiza online,                                   | ❌     |
| Obsługa błędów modelu                   | Fallback + komunikaty w przypadku braku WebNN                       | ❌     |

---

## 🎛️ Kreator badań

| Funkcja                                | Opis                                                                | Status |
|----------------------------------------|---------------------------------------------------------------------|--------|
| Upload materiałów                      | Obrazy, filmy, dźwięki; preview; walidacja typu i rozmiaru          | ❌     |
| Edycja sekwencji (timeline)            | Przeciąganie elementów, zmiana czasu trwania                        | ❌     |
| Synchronizacja z EEG                   | Dodawanie znaczników czasowych w eksperymencie                      | ❌     |
| Zapis badania                          | Serializacja, wysyłka do backendu                                   | ❌     |

---

## 🧪 Przeprowadzenie badania

| Funkcja                              | Opis                                                                | Status |
|--------------------------------------|---------------------------------------------------------------------|--------|
| Wybór badania do uruchomienia        | Lista dostępnych badań zapisanych wcześniej                         | ❌     |
| Ładowanie sekwencji bodźców          | Parsowanie konfiguracji z JSON, przygotowanie playera               | ❌     |
| Rozpoczęcie badania                  | Przycisk START, rozpoczęcie nagrywania EEG i odtwarzania bodźców    | ❌     |
| Precyzyjna synchronizacja czasowa    | Zsynchronizowane emitowanie bodźców zgodnie z harmonogramem         | ❌     |
| Widok postępu                        | Pasek czasu, aktualna pozycja, stan badania                         | ❌     |
| Zatrzymanie i zapis badania          | Zakończenie sesji, zapis danych EEG i metadanych do backendu        | ❌     |
| Obsługa przerwania badania           | Możliwość anulowania/zatrzymania awaryjnego                         | ❌     |
| Podsumowanie po badaniu              | Wyświetlenie statystyk, możliwość przejścia do tagowania            | ❌     |

---

## 🏷️ System tagowania

| Funkcja                            | Opis                                                                  | Status |
|------------------------------------|-----------------------------------------------------------------------|--------|
| Odtwarzanie nagrania EEG           | Timeline z możliwością przewijania, pauzy, zoomu                      | ❌     |
| Zaznaczanie fragmentu EEG          | Klik i drag do wybrania przedziału czasu                              | ❌     |
| Przypisywanie etykiety             | Dropdown/lista                                                        | ❌     |
| Zapis adnotacji                    | Przesyłanie tagów do backendu                                         | ❌     |
| Przegląd oznaczonych fragmentów    | Lista/tabla z tagami i opcją edycji/usuwania                          | ❌     |

---
