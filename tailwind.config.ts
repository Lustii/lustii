module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                aubergine: "#2E002C",
                "wine-red": "#3C071D",
                "rose-gold": "#BF8F7C",
                gold: "#D4AF37",
                "off-white": "#F0EAD6",
            },
            fontFamily: {
                inter: ["Inter", "sans-serif"],
                playfair: ["Playfair Display", "serif"],
            },
            keyframes: {
                "heart-pop-engaging": {
                    "0%": { transform: "scale(0) rotate(0deg)", opacity: "0" },
                    "30%": { transform: "scale(1.8) rotate(-15deg)", opacity: "1" },
                    "60%": { transform: "scale(1) rotate(15deg)", opacity: "0.8" },
                    "100%": { transform: "scale(0.8) rotate(0deg)", opacity: "0" }, // Fade out smoothly
                },
                "fade-in-out": {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "10%": { opacity: "1", transform: "translateY(0)" },
                    "90%": { opacity: "1", transform: "translateY(0)" },
                    "100%": { opacity: "0", transform: "translateY(20px)" },
                },
            },
            animation: {
                "heart-pop-engaging": "heart-pop-engaging 0.8s ease-out forwards",
                "fade-in-out": "fade-in-out 3s forwards", // For the message display
            },
        },
    },
    plugins: [],
}
