"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", updateMousePosition);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
        };
    }, []);

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 rounded-full bg-[var(--accent)] pointer-events-none z-[9999] mix-blend-difference"
                animate={{
                    x: mousePosition.x - 8,
                    y: mousePosition.y - 8,
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28,
                    mass: 0.5
                }}
            />
            <motion.div
                className="fixed top-0 left-0 w-12 h-12 rounded-full border border-[var(--accent)] pointer-events-none z-[9998] opacity-50"
                animate={{
                    x: mousePosition.x - 24,
                    y: mousePosition.y - 24,
                }}
                transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    mass: 1
                }}
            />
        </>
    );
}
