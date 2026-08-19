import { Github, Linkedin, Twitter } from "lucide-react";

const SOCIALS = [
    { icon: Github, href: "https://github.com/grandkojo", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/ernest-essien", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/grandkojo", label: "Twitter" },
];

export function Footer() {
    return (
        <footer className="border-t border-border pb-24 md:pb-0">
            <div className="max-w-5xl mx-auto px-5 md:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground">
                    © {new Date().getFullYear()} Ernest Essien
                </p>

                <div className="flex items-center gap-3">
                    {SOCIALS.map(({ icon: Icon, href, label }) => (
                        <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                            aria-label={label}
                        >
                            <Icon size={16} />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
