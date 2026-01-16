export const PORTFOLIO_DATA = {
    personal: {
        name: "Ernest Kojo Owusu Essien",
        title: "Software Engineer (Backend)",
        email: "essienernest.kojoowusu@gmail.com",
        links: {
            linkedin: "#",
            github: "#",
            portfolio: "#",
        },
        location: "Greater Accra",
    },
    skills: {
        languages: ["Python", "PHP", "JavaScript", "SQL", "Java", "C(Beginner)"],
        software: ["AWS", "GCP", "Linux", "Docker", "Django", "React", "Laravel", "JupyterNotebook", "Tailwind", "Bootstrap", "Git", "Bash"],
    },
    experience: [
        {
            role: "Software Engineer (Backend)",
            company: "Amalitech",
            period: "Nov 2025 - Present",
            location: "East Legon, Accra",
            description: [
                "I'm currently building robust Java-based software systems, focusing on scalability and performance. My day-to-day involves architecting new features and refining existing products to meet evolving business needs.",
                "I thrive on collaboration, working closely with fellow engineers, DevOps, and product owners. I take ownership of complex technical challenges, reducing technical debt and ensuring our systems are future-proof.",
            ],
        },
        {
            role: "Software Engineering Intern",
            company: "ABCD Systems Limited",
            period: "Oct 2024 - December 2025",
            location: "East Legon, Accra",
            description: [
                "During my time here, I took charge of backend performance, developing scalable web applications using Laravel and Vue. I was responsible for over 12 critical APIs that powered our core services.",
                "I loved the agile environment, where I actively contributed to code reviews and drove feature delivery. It was here that I really honed my skills in structured GitHub workflows and collaborative development.",
            ],
        },
        {
            role: "Software Engineering Intern",
            company: "Orocons Systems",
            period: "Sept 2022 - Jan 2023, Sept 2023 - Jan 2024",
            location: "Mile 7, Accra",
            description: [
                "This is where my journey really began. I built personal and collaborative web apps with PHP and JavaScript, focusing on writing clean, modular code that scales.",
                "I also managed web servers, ensuring high uptime and reliability. It was a deep dive into the devops side of things, teaching me the importance of version control and continuous integration in real-world projects.",
            ],
        },
    ],
    projects: [
        {
            title: "EpiScope",
            subtitle: "AI-Powered Disease Monitoring & Forecasting Platform",
            tech: ["Python", "XGBoost", "Gemini", "RAG"],
            description: "AI platform analyzing 13k+ hospital records & national datasets for real-time disease monitoring, prediction, and RAG context specific responses. Trained XGBoost & RAG models, integrating Gemini for symptom scoring, achieving up to 85% accuracy on malaria and diabetes predictions.",
            links: { demo: "https://youtu.be/KRDk5LWtfSo", github: "https://github.com/Grandkojo/EpiScope.git" },
        },
        {
            title: "MedForecast",
            subtitle: "AI Health Prediction Platform",
            tech: ["Flask", "Python", "PostgreSQL", "JavaScript"],
            description: "Led development of a web app that predicts potential health conditions based on user symptoms. Trained an ML model using Gradient Boosting on 2+ Kaggle datasets.",
            links: { demo: "https://medforecast.grandkojo.my/", github: "https://github.com/Grandkojo/medforecast.git" },
        },
        {
            title: "Daily Tracker",
            subtitle: "Activity Logging System",
            tech: ["Laravel", "PostgreSQL", "Blade", "JavaScript"],
            description: "Designed and implemented a daily logging system for internal support teams with role-based access. Enabled real-time status updates, handover documentation, and performance tracking.",
            links: { demo: "https://polling.grandkojo.my/", github: "https://github.com/Grandkojo/polling_app.git" },
        },
    ],
};
