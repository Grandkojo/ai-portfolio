# **FeverDiff AI**
**AI-Powered Differential Diagnosis Assistant**

FeverDiff AI is a clinical decision-support tool for differential diagnosis of malaria, dengue, chikungunya, and typhoid — designed specifically for Ghana's resource-limited healthcare settings. It uses fine-tuned MedGemma 1.5 with a hybrid AI approach combining LLM reasoning and deterministic clinical rules.

---

## **🎯 Project Overview**
In Ghana, overlapping fever symptoms lead to dangerous misdiagnosis. FeverDiff AI bridges the gap between rural clinics and specialist support using a multi-layered diagnostic approach.

### **The Problem**
- Malaria, dengue, chikungunya, and typhoid share similar early symptoms.
- Rural clinics lack specialist support for differential diagnosis.
- Misdiagnosis leads to inappropriate treatment and worse outcomes.

---

## **✨ Key Features**

### **1. MedGemma 1.5 4B + Gemini 2.5-Flash**
- Core clinical reasoning powered by specialized medical LLMs.
- MedGemma handles initial diagnosis; Gemini refines reasoning.

### **2. Ghana-Specific Clinical Scoring**
- Tailored logic for regional epidemiological patterns.
- Seasonal disease weighting (e.g., malaria during rainy season).

### **3. High-Fidelity Dashboard**
- Comprehensive data entry for 26+ clinical variables.
- Visual probability output with confidence indicators.

### **4. Researcher Workspace**
- Direct JSON import for rapid test scenario validation.
- Pre-defined clinical test cases for benchmarking.

### **5. GPU-Powered Backend**
- Scalable serverless inference via Modal Labs (GPU T4).
- Volume caching for fast model loading.

---

## **🧠 Clinical Intelligence Engine**

FeverDiff AI employs a multi-layered diagnostic approach:

### **Unified Targeted Prompting (UTP)**
- Structured clinical profiles (not conversational queries).
- Enforced JSON output for programmatic probability extraction.
- Pathophysiological anchoring — forces explanations based on specific clinical parameters.
- Regional context injection with Ghana-specific epidemiological weights.

### **Clinical Rule Integration (CRI)**
Post-inference deterministic scoring validates LLM output:
- **Typhoid Detection:** Uses specific GI symptoms and fever patterns (100% accuracy).
- **Dengue-Malaria Differentiation:** Platelet vs. Rash correlation analysis.
- **Co-infection Thresholding:** Custom algorithm identifies when two diseases are statistically indistinguishable (gap ≤10pts, both ≥35%), triggering a co-infection alert.

---

## **🛠️ Tech Stack**

| **Component**        | **Technology** |
|----------------------|----------------|
| Frontend             | Vanilla HTML5, CSS3 (Glassmorphism), JavaScript (ES6+) |
| Backend API          | FastAPI on Modal Labs (GPU T4) |
| AI Models            | MedGemma 1.5 4B (Quantized 8-bit) |
| Reasoning Engine     | Gemini 2.5-Flash |
| Training Data        | 10,000 synthetic clinical records (WHO/CDC validated) |

---

## **📂 Project Structure**

```
├── modal_backend.py       ← GPU serving logic with volume caching
├── model.py               ← Diagnostic engine and prompt engineering
├── feverdiff_opt.ipynb    ← Model optimization & clinical rule validation
├── static/                ← High-fidelity UI assets
└── test_scenarios.json    ← Pre-defined clinical cases for validation
```

---

## **⚠️ Disclaimer**
FeverDiff AI is a clinical decision-support tool and is NOT a replacement for professional medical diagnosis. Always consult qualified healthcare professionals for medical decisions.

## **👤 Author**
Built by Ernest Kojo Owusu Essien — Software Engineer, Accra 🇬🇭
