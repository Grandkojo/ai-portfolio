"use client";

export function AtmosphereLayer() {
    return (
        <div
            className="fixed inset-0 pointer-events-none z-[5]"
            aria-hidden="true"
        >
            {/* 
                1. bg-background/30: Adds a "fog" of the background color, tinting the sigils 
                   to make them look deeper/further away compared to the crisp foreground.
                2. backdrop-blur-[1px]: Adds a very subtle defocus to distant objects.
            */}
            <div className="absolute inset-0 bg-background/40 backdrop-blur-[0.5px]" />

            {/* Optional: Vignette to focus attention on center */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
        </div>
    );
}
