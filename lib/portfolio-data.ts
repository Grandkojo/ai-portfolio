export const PORTFOLIO_DATA = {
    personal: {
        name: "Ernest Kojo Owusu Essien",
        title: "Software Engineer (Backend)",
        email: "essienernest.kojoowusu@gmail.com",
        links: {
            linkedin: "https://www.linkedin.com/in/ernest-essien-kojo",
            github: "https://github.com/Grandkojo",
            portfolio: "#",
        },
        location: "Greater Accra",
    },
    skills: {
        languages: ["Python", "PHP", "JavaScript", "SQL", "Java", "C(Beginner)"],
        software: ["AWS", "GCP", "Linux", "Docker", "Django", "React", "Laravel", "JupyterNotebook", "Tailwind", "Bootstrap", "Git", "Bash"],
    },
    skillsDetail: [
        { name: "Laravel", category: "Backend", level: 9, experience: "2 years", order: 0 },
        { name: "Java", category: "Backend", level: 5, experience: "< 6 months", order: 1 },
        { name: "React", category: "Frontend", level: 6, experience: "1.5 year", order: 1 },
        { name: "AI", category: "Tools", level: 7, experience: "1.5 years", order: 2 },
        { name: "Django", category: "Backend", level: 6, experience: "2 year", order: 3 },
        { name: "HTML & CSS", category: "Frontend", level: 10, experience: "3 years", order: 4 },
        { name: "Javascript", category: "Frontend", level: 8, experience: "2 years", order: 5 },
        { name: "Python", category: "Backend", level: 8, experience: "3 years", order: 6 },
        { name: "Git", category: "Tools", level: 8, experience: "3 years", order: 7 },
        { name: "SQL", category: "Database", level: 8, experience: "2 years", order: 8 },
        { name: "MongoDB", category: "Database", level: 7, experience: "1 year", order: 9 },

    ],
    experience: [
        {
            type: "Education",
            role: "BSC. Computer Engineering",
            company: "Kwame Nkrumah University of Science and Technology",
            period: "Jan 2022 - Nov 2025",
            location: "Kumasi, Ghana",
            description: ["Pursued a Bachelor of Science in Computer Engineering"],
            order: 0,
        },
        {
            type: "Experience",
            role: "Software Engineer",
            company: "Amalitech",
            period: "Nov 2025 - Present",
            location: "East Legon, Accra",
            description: [
                "I'm currently building robust Java-based software systems, focusing on scalability and performance. My day-to-day involves architecting new features and refining existing products to meet evolving business needs.",
                "I thrive on collaboration, working closely with fellow engineers, DevOps, and product owners. I take ownership of complex technical challenges, reducing technical debt and ensuring our systems are future-proof.",
            ],
            order: 1,
        },
        {
            type: "Certification",
            role: "ALX Software Engineering",
            company: "ALX Foundations",
            period: "Jan 2023 - Jul 2024",
            location: "Remote",
            description: [
                "Completed ALX Software Engineering program, an intensive full-stack development bootcamp that transformed my approach to software engineering. Gained deep understanding of software architecture, system design principles, and modern development methodologies.",
                "Learned to build end-to-end applications, implement robust testing strategies, and collaborate effectively using industry-standard tools and practices. This program has been instrumental in developing my problem-solving skills and technical expertise."
            ],
            order: 2,
        },
        {
            type: "Experience",
            role: "Software Engineer Intern (Remote)",
            company: "ABCD Systems Limited",
            period: "Jan 2025 - December 2025",
            location: "East Legon, Accra",
            description: [
                "During my time here, I took charge of backend performance, developing scalable web applications using Laravel and Vue. I was responsible for over 12 critical APIs that powered our core services.",
                "I loved the agile environment, where I actively contributed to code reviews and drove feature delivery. It was here that I really honed my skills in structured GitHub workflows and collaborative development.",
            ],
            order: 3,
        },
        {
            type: "Certification",
            role: "AWS RE/START",
            company: "Amalitech",
            period: "Mar 2025 - Jul 2025",
            location: "Remote",
            description: [
                "Completed AWS Cloud Practitioner certification, equipping me with essential cloud infrastructure knowledge. This program strengthened my understanding of AWS core services, security, and cost optimization, enabling me to build and deploy production-ready applications on cloud platforms.",
                "As companies increasingly adopt cloud-first strategies, this certification positions me to contribute effectively to cloud migration and modernization initiatives."
            ],
            order: 4,
        },
        {
            type: "Experience",
            role: "Software Engineering Intern",
            company: "Orocons Systems",
            period: "Oct 2024 - Jan 2025",
            location: "Mile 7, Accra",
            description: [
                "This is where my journey really began. I built personal and collaborative web apps with PHP and JavaScript, focusing on writing clean, modular code that scales.",
                "I also managed web servers, ensuring high uptime and reliability. It was a deep dive into the devops side of things, teaching me the importance of version control and continuous integration in real-world projects.",
            ],
            order: 5,
        },
    ],
    projects: [
        {
            title: "EpiScope",
            subtitle: "AI-Powered Disease Monitoring & Prediction",
            tech: ["Django", "React", "PostgreSQL", "WebSocket"],
            description: "AI platform analyzing 13k+ hospital records & national datasets for real-time disease monitoring, prediction, and RAG context specific responses. Trained XGBoost & RAG models, integrating Gemini for symptom scoring, achieving up to 85% accuracy on malaria and diabetes predictions.",
            links: { demo: "https://youtu.be/KRDk5LWtfSo", github: "https://github.com/Grandkojo/EpiScope.git" },
            imageUrl: "/images/projects/episcope.png"
        },
        {
            title: "Polling App",
            subtitle: "Shareable, Real-Time Polls with QR Codes",
            tech: ["Next JS", "Supabase", "NextAuth"],
            description: "Designed and implemented a real-time polling system with QR code generation for instant sharing. Features live result updates, secure authentication via NextAuth, and a responsive UI built with Next.js and Tailwind.",
            links: { demo: "https://polling.grandkojo.my/", github: "https://github.com/Grandkojo/polling_app.git" },
            imageUrl: "/images/projects/polling_app.jpg"
        },
        {
            title: "MedForecast",
            subtitle: "AI Health Prediction Platform",
            tech: ["Flask", "PostgreSQL", "Jupyter", "Javascript", "AI"],
            description: "Led development of a web app that predicts potential health conditions based on user symptoms. Trained an ML model using Gradient Boosting on 2K+ Kaggle datasets.",
            links: { demo: "https://youtu.be/z5DwAjWOvYk", github: "https://github.com/Grandkojo/medforecast.git" },
            imageUrl: "/images/projects/medfc_logo.png"
        },
    ],
};
