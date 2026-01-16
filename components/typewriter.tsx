"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TypewriterProps {
    words: string[];
    delay?: number;
}

export function Typewriter({ words, delay = 0 }: TypewriterProps) {
    const [text, setText] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                setText(currentWord.substring(0, text.length - 1));
            } else {
                setText(currentWord.substring(0, text.length + 1));
            }

            if (!isDeleting && text === currentWord) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && text === "") {
                setIsDeleting(false);
                setWordIndex((prev) => (prev + 1) % words.length);
            }
        }, isDeleting ? 50 : 150);

        return () => clearTimeout(timeout);
    }, [text, isDeleting, wordIndex, words]);

    return (
        <span className="inline-block min-w-[20ch]">
            {text}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-[2px] h-[1em] bg-primary ml-1 align-middle"
            />
        </span>
    );
}
