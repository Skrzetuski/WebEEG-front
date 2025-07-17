# 🧠 Noesis — Interfejs Aplikacji Webowej do Analizy EEG

## 📌 Założenia projektu

Projekt frontendowy stworzony w React jako część systemu do analizy aktywności fal mózgowych. Aplikacja umożliwia pracę z danymi EEG w czasie rzeczywistym oraz wspiera proces diagnostyczny i badawczy.

### 🔐 Logowanie
Użytkownicy logują się do systemu za pomocą loginu i hasła. Sesja użytkownika jest utrzymywana lokalnie z użyciem tokenów JWT.

### 📊 Panel Badań (EEG + ML)
Moduł do wyświetlania sygnału EEG w czasie rzeczywistym z równoległą analizą przez model ML (uruchamiany lokalnie w przeglądarce z wykorzystaniem WebNN). Wyniki diagnozy są prezentowane dynamicznie wraz z sygnałem.

### 🎛️ Kreator Badań
Interfejs pozwalający tworzyć nowe jednostki badawcze przez definiowanie kolejności i czasu prezentacji materiałów (obrazów, dźwięków, filmów) synchronizowanych z odczytem EEG.

### 🏷️ Tagowanie Wyników
Lekarze mogą oznaczać fragmenty nagrań EEG, przypisując im etykiety diagnostyczne. Wspiera pracę zespołów medycznych i naukowych.

---

## 🇬🇧 English version

# 🧠 Noesis — Web UI for EEG Data Analysis

## 📌 Project Overview

Frontend project built with React as part of a system for brainwave activity analysis. The app supports real-time EEG data processing and diagnostic workflows.

### 🔐 Authentication
Users log in with their username and password. Authentication is handled via JWT tokens stored locally.

### 📊 EEG Analysis Panel
Module for real-time EEG signal visualization, coupled with on-device machine learning inference using WebNN. Diagnostic predictions are displayed alongside the live signal.

### 🎛️ Study Creator
Tool for defining experimental protocols — configuring the order and timing of multimedia stimuli (images, sounds, videos) in sync with EEG recording.

### 🏷️ Tagging & Review
Medical experts can review and tag EEG segments, marking events such as seizures or artifacts. Facilitates collaborative diagnostic workflows.

---
