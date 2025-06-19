// "use client"

// import React, { useState, useEffect, useRef, useCallback } from "react"
// import Head from "next/head"
// import Image from "next/image" // Next.js Image component for optimization

// // --- Global Message/Toast Component (to replace window.alert) ---
// interface MessageProps {
//     message: string | null
//     onClose: () => void
// }

// const MessageDisplay: React.FC<MessageProps> = ({ message, onClose }) => {
//     if (!message) return null

//     return (
//         <div className="fixed bottom-32 left-1/2 -translate-x-1/2 bg-rose-gold text-aubergine px-6 py-3 rounded-full shadow-lg z-50 animate-fade-in-out">
//             <p className="text-sm font-medium">{message}</p>
//             <button onClick={onClose} className="absolute top-1 right-2 text-aubergine text-xs font-bold opacity-75 hover:opacity-100">
//                 &times;
//             </button>
//         </div>
//     )
// }

// // --- Icons ---

// // components/HeartIcon.tsx
// const HeartIcon: React.FC<{ className?: string; fill?: string }> = ({ className = "w-6 h-6", fill = "none" }) => (
//     <svg xmlns="http://www.w3.org/2000/svg" className={className} fill={fill} viewBox="0 0 24 24" stroke="currentColor">
//         <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//         />
//     </svg>
// )

// // components/ShareIcon.tsx
// const ShareIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
//     <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M8.684 13.342C8.882 13.992 9 14.653 9 15.324c0 1.453-.347 2.868-.988 4.125-1.077 2.138-3.427 3.543-5.064 3.543-1.637 0-3.987-1.405-5.064-3.543C-.347 18.192 0 16.777 0 15.324c0-.671.118-1.332.316-1.982m-.077-4.14C.142 9.07 0 8.047 0 7.024c0-1.453.347-2.868.988-4.125C2.065.761 4.415-.644 6.052-.644c1.637 0 3.987 1.405 5.064 3.543.641 1.257.988 2.672.988 4.125 0 1.023-.142 2.046-.43 3.003m-.077-4.14c-.198-.65-.316-1.31-.316-1.982 0-1.453.347-2.868.988-4.125 1.077-2.138 3.427-3.543 5.064-3.543 1.637 0 3.987 1.405 5.064 3.543.641 1.257.988 2.672.988 4.125 0 .671-.118 1.332-.316 1.982"
//         />
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.02 5.02h.01M21 20l-9-9m0 0l-9 9m9-9l-9 9" />
//     </svg>
// )

// // Lucide-style Home Icon SVG
// const HomeIcon: React.FC<{ className?: string; strokeWidth?: string }> = ({ className = "w-6 h-6", strokeWidth = "2" }) => (
//     <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth={strokeWidth}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         className={className}
//     >
//         <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
//         <polyline points="9 22 9 12 15 12 15 22" />
//     </svg>
// )

// // Lucide-style User Icon SVG
// const UserIcon: React.FC<{ className?: string; strokeWidth?: string }> = ({ className = "w-6 h-6", strokeWidth = "2" }) => (
//     <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth={strokeWidth}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         className={className}
//     >
//         <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
//         <circle cx="12" cy="7" r="4" />
//     </svg>
// )

// // types/Image.ts
// export interface ImageData {
//     id: string
//     src: string
//     alt: string
//     liked: boolean
// }

// // Dummy image data function
// const getDummyImages = (count: number): ImageData[] => {
//     const images: ImageData[] = []
//     for (let i = 0; i < count; i++) {
//         const seed = Math.floor(Math.random() * 1000) + 1
//         images.push({
//             id: `img-${Date.now()}-${i}`,
//             src: `https://picsum.photos/seed/${seed}/400/600`, // Portrait orientation
//             alt: `LUSTii image ${i + 1}`,
//             liked: false,
//         })
//     }
//     return images
// }

// // components/ImageCard.tsx
// interface ImageCardProps {
//     image: ImageData
//     onLike: (id: string) => void
//     onShare: (id: string) => void
// }

// const ImageCard: React.FC<ImageCardProps> = ({ image, onLike, onShare }) => {
//     const [lastTapTime, setLastTapTime] = useState(0)
//     const [showLikeAnimation, setShowLikeAnimation] = useState(false)

//     // Handle single and double taps
//     const handleTap = useCallback(() => {
//         const currentTime = new Date().getTime()
//         const tapDelay = 300 // Max delay between taps for double-tap

//         if (currentTime - lastTapTime < tapDelay) {
//             // Double tap detected
//             if (!image.liked) {
//                 // Only trigger like animation if not already liked
//                 onLike(image.id) // Trigger the like action
//                 setShowLikeAnimation(true)
//                 // Keep animation visible for 800ms
//                 setTimeout(() => setShowLikeAnimation(false), 800)
//             }
//         }
//         setLastTapTime(currentTime)
//     }, [lastTapTime, image.id, image.liked, onLike])

//     return (
//         <div key={image.id} className="bg-wine-red rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out">
//             <div
//                 className="relative w-full h-96 overflow-hidden rounded-t-2xl"
//                 onTouchEnd={handleTap} // For touch devices
//                 onClick={handleTap} // For mouse clicks (single tap fallback for double tap)
//             >
//                 {/* Using Next.js Image component for optimization */}
//                 <Image
//                     src={image.src}
//                     alt={image.alt}
//                     layout="fill" // Makes the image fill its parent
//                     objectFit="cover" // Covers the area without distortion
//                     className="rounded-t-2xl"
//                     onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
//                         // Fallback for broken images
//                         e.currentTarget.onerror = null // Prevent infinite loop
//                         e.currentTarget.src = "https://placehold.co/400x600/3C071D/BF8F7C?text=Image+Error"
//                     }}
//                 />
//                 {/* Double tap heart animation */}
//                 {showLikeAnimation && (
//                     <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
//                         <HeartIcon className="w-24 h-24 text-rose-gold animate-heart-pop-engaging" fill="currentColor" />
//                     </div>
//                 )}

//                 {/* Interaction Overlay - always visible now for clarity, or can be toggled on tap */}
//                 <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent flex justify-around items-center rounded-b-2xl">
//                     <button
//                         onClick={(e) => {
//                             e.stopPropagation()
//                             onLike(image.id)
//                         }} // Stop propagation to prevent triggering double tap on button click
//                         className={`p-3 rounded-full transition-all duration-200 ease-in-out
//                             ${image.liked ? "bg-rose-gold text-aubergine" : "bg-transparent text-rose-gold border border-rose-gold"}
//                             hover:scale-110 focus:outline-none focus:ring-2 focus:ring-rose-gold focus:ring-offset-2 focus:ring-offset-wine-red`}
//                         aria-label={image.liked ? "Unlike image" : "Like image"}
//                     >
//                         <HeartIcon className="w-6 h-6" fill={image.liked ? "currentColor" : "none"} />
//                     </button>
//                     <button
//                         onClick={(e) => {
//                             e.stopPropagation()
//                             onShare(image.id)
//                         }} // Stop propagation
//                         className="p-3 rounded-full bg-transparent text-rose-gold border border-rose-gold hover:scale-110 transition-transform duration-200 ease-in-out
//                             focus:outline-none focus:ring-2 focus:ring-rose-gold focus:ring-offset-2 focus:ring-offset-wine-red"
//                         aria-label="Share image"
//                     >
//                         <ShareIcon className="w-6 h-6" />
//                     </button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// // components/LoginForm.tsx
// interface LoginFormProps {
//     onMessage: (msg: string) => void
// }

// const LoginForm: React.FC<LoginFormProps> = ({ onMessage }) => {
//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault()
//         // Handle login logic here
//         console.log("Login form submitted")
//         onMessage("Login functionality is not implemented yet.")
//     }

//     return (
//         <section className="flex flex-col items-center justify-center min-h-[calc(100vh-180px)] p-4">
//             <div className="p-8 rounded-3xl shadow-2xl bg-gradient-to-l from-rose-200 to-fuchsia-100 w-full max-w-sm transform scale-95 md:scale-100 transition-transform duration-300 ease-in-out">
//                 <h2 className="text-3xl text-gray-400 mb-8 text-center">Login to LUSTii</h2>
//                 <form className="space-y-6" onSubmit={handleSubmit}>
//                     <div>
//                         <label htmlFor="email" className="block text-gray-400 text-sm font-medium mb-2">
//                             Email
//                         </label>
//                         <input
//                             type="email"
//                             id="email"
//                             className="w-full p-4 rounded-xl bg-aubergine text-gray-400 border border-rose-gold focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-200 ease-in-out placeholder:text-gray-400"
//                             placeholder="your@email.com"
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="password" className="block text-gray-400 text-sm font-medium mb-2">
//                             Password
//                         </label>
//                         <input
//                             type="password"
//                             id="password"
//                             className="w-full p-4 rounded-xl bg-aubergine text-gray-400 border border-rose-gold focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-200 ease-in-out placeholder:text-gray-400"
//                             placeholder="********"
//                             required
//                         />
//                     </div>
//                     <button
//                         type="submit"
//                         className="w-full py-4 rounded-full bg-rose-gold text-gray-800 font-bold text-lg shadow-lg
//                             hover:bg-gold hover:scale-105 transition-all duration-300 ease-in-out bg-gradient-to-l from-amber-200 to-fuchsia-400
//                             focus:outline-none focus:ring-2 focus:ring-rose-gold focus:ring-offset-2 focus:ring-offset-wine-red"
//                     >
//                         Login
//                     </button>
//                     <p className="text-center text-sm mt-4 text-gray-400">
//                         {`Don't`} have an account?{" "}
//                         <a href="#" className="text-rose-gold hover:underline">
//                             Sign Up
//                         </a>
//                     </p>
//                 </form>
//             </div>
//         </section>
//     )
// }

// // --- pages/index.tsx (Main App Component) ---

// const Home: React.FC = () => {
//     const [activeTab, setActiveTab] = useState<"home" | "login">("home")
//     const [images, setImages] = useState<ImageData[]>(getDummyImages(5))
//     const [loading, setLoading] = useState(false)
//     const observerTarget = useRef<HTMLDivElement>(null)
//     const [message, setMessage] = useState<string | null>(null)

//     const showTemporaryMessage = (msg: string) => {
//         setMessage(msg)
//         setTimeout(() => setMessage(null), 3000) // Message disappears after 3 seconds
//     }

//     const loadMoreImages = useCallback(() => {
//         if (loading) return
//         setLoading(true)
//         setTimeout(() => {
//             setImages((prevImages) => [...prevImages, ...getDummyImages(5)])
//             setLoading(false)
//         }, 1000)
//     }, [loading])

//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             (entries) => {
//                 if (entries[0].isIntersecting && activeTab === "home") {
//                     loadMoreImages()
//                 }
//             },
//             {
//                 root: null,
//                 rootMargin: "0px",
//                 threshold: 0.1,
//             }
//         )

//         if (observerTarget.current) {
//             observer.observe(observerTarget.current)
//         }

//         return () => {
//             if (observerTarget.current) {
//                 observer.unobserve(observerTarget.current)
//             }
//         }
//     }, [activeTab, loadMoreImages])

//     const handleLike = (id: string) => {
//         setImages((prevImages) => prevImages.map((img) => (img.id === id ? { ...img, liked: !img.liked } : img)))
//         console.log(`Image ${id} liked/unliked!`)
//     }

//     const handleShare = (id: string) => {
//         const imageUrl = images.find((img) => img.id === id)?.src
//         if (navigator.share && imageUrl) {
//             navigator
//                 .share({
//                     title: "Check out this image from LUSTii!",
//                     url: imageUrl,
//                 })
//                 .then(() => {
//                     console.log("Successfully shared")
//                     showTemporaryMessage("Image shared successfully!")
//                 })
//                 .catch((error) => {
//                     console.error("Error sharing:", error)
//                     const dummyElement = document.createElement("textarea")
//                     document.body.appendChild(dummyElement)
//                     dummyElement.value = imageUrl || ""
//                     dummyElement.select()
//                     document.execCommand("copy")
//                     document.body.removeChild(dummyElement)
//                     showTemporaryMessage("Image URL copied to clipboard!")
//                 })
//         } else {
//             const dummyElement = document.createElement("textarea")
//             document.body.appendChild(dummyElement)
//             dummyElement.value = imageUrl || ""
//             dummyElement.select()
//             document.execCommand("copy")
//             document.body.removeChild(dummyElement)
//             showTemporaryMessage("Image URL copied to clipboard!")
//             console.warn("Web Share API not supported, URL copied to clipboard.")
//         }
//     }

//     return (
//         // <div className="min-h-screen flex flex-col bg-aubergine text-off-white font-inter">
//         <div className="min-h-screen flex flex-col bg-[#fab9d9] text-off-white font-inter">
//             <Head>
//                 <title>LUSTii</title>
//                 <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//                 <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
//                 <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
//             </Head>

//             {/* Header (Sticky Logo with Glassmorphism) */}
//             <header className="sticky top-0 z-20 w-full bg-aubergine bg-opacity-80 backdrop-filter backdrop-blur-md p-4 flex flex-col items-center shadow-lg rounded-b-xl border-b border-rose-gold/30">
//                 <h1 className="text-4xl font-playfair text-rose-gold mb-2 text-shadow-glow">LUSTii</h1>
//                 {/* No navigation here anymore, moved to footer */}
//             </header>

//             {/* Main Content Area */}
//             <main className="flex-1 overflow-y-auto no-scrollbar pb-24">
//                 {" "}
//                 {/* Increased padding-bottom for fixed footer */}
//                 {activeTab === "home" && (
//                     <section className="p-4 sm:p-6 md:p-8 flex flex-col items-center">
//                         <div className="grid grid-cols-1 gap-8 w-full max-w-md">
//                             {images.map((image) => (
//                                 <ImageCard key={image.id} image={image} onLike={handleLike} onShare={handleShare} />
//                             ))}
//                         </div>
//                         <div ref={observerTarget} className="flex justify-center p-8 w-full">
//                             {loading && <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-4 border-rose-gold border-t-transparent"></div>}
//                             {!loading && images.length > 0 && <p className="text-off-white text-sm opacity-75">Scroll down for more...</p>}
//                         </div>
//                     </section>
//                 )}
//                 {activeTab === "login" && <LoginForm onMessage={showTemporaryMessage} />}
//             </main>

//             {/* Footer (Fixed Bottom Navigation with Glassmorphism) */}
//             <footer className="fixed bottom-0 z-20 w-full bg-aubergine bg-opacity-80 backdrop-filter backdrop-blur-md p-3 flex justify-center shadow-inner rounded-t-xl border-t border-rose-gold/30">
//                 <nav className="w-full flex justify-center max-w-md">
//                     <button
//                         onClick={() => setActiveTab("home")}
//                         className={`flex-1 flex flex-col items-center py-2 px-4 mx-1 text-center rounded-full transition-all duration-300 ease-in-out
//                             ${activeTab === "home" ? "bg-rose-gold text-aubergine shadow-lg" : "text-off-white hover:bg-wine-red"}`}
//                     >
//                         <HomeIcon className="w-6 h-6 mb-1 text-black" />
//                         <span className="text-xs font-medium text-black">Home</span>
//                     </button>
//                     <button
//                         onClick={() => setActiveTab("login")}
//                         className={`flex-1 flex flex-col items-center py-2 px-4 mx-1 text-center rounded-full transition-all duration-300 ease-in-out
//                             ${activeTab === "login" ? "bg-rose-gold text-aubergine shadow-lg" : "text-off-white hover:bg-wine-red"}`}
//                     >
//                         <UserIcon className="w-6 h-6 mb-1 text-black" />
//                         <span className="text-xs font-medium text-black">Login</span>
//                     </button>
//                 </nav>
//             </footer>

//             {/* Global message display */}
//             <MessageDisplay message={message} onClose={() => setMessage(null)} />
//         </div>
//     )
// }

// export default Home

"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { Eye, EyeOff, Heart, Share2, House, User, Sparkles, Star, Flame, Diamond } from "lucide-react"
import { motion } from "framer-motion"

// --- Global Message/Toast Component ---
interface MessageProps {
    message: string | null
    onClose: () => void
}

const MessageDisplay: React.FC<MessageProps> = ({ message, onClose }) => {
    if (!message) return null

    return (
        <div className="fixed bottom-32 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-2xl z-50 animate-bounce-in backdrop-blur-lg border border-white/20">
            <p className="text-sm font-semibold">{message}</p>
            <button
                onClick={onClose}
                className="absolute -top-1 -right-1 bg-white text-pink-500 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold hover:scale-110 transition-transform"
            >
                ×
            </button>
        </div>
    )
}

// --- Floating Hearts Animation ---
const FloatingHeart: React.FC<{ delay?: number }> = ({ delay = 0 }) => (
    <div
        className="absolute animate-float-up opacity-70"
        style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${delay}ms`,
            animationDuration: `${3000 + Math.random() * 2000}ms`,
        }}
    >
        <Heart className="w-4 h-4 text-pink-400 fill-current" />
    </div>
)

// --- Background Animated Elements ---
const AnimatedBackground: React.FC = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-pink-400/20 rounded-full blur-xl animate-pulse-slow"></div>
        <div className="absolute top-40 right-8 w-24 h-24 bg-purple-400/20 rounded-full blur-lg animate-float"></div>
        <div className="absolute bottom-32 left-6 w-20 h-20 bg-rose-400/15 rounded-full blur-md animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-12 w-28 h-28 bg-indigo-400/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-fuchsia-400/10 rounded-full blur-lg animate-bounce-slow"></div>
        <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-pink-500/15 rounded-full blur-md animate-pulse-slow"></div>
    </div>
)

// types/Image.ts
export interface ImageData {
    id: string
    src: string
    alt: string
    liked: boolean
    likes: number
}

// Dummy image data function
const getDummyImages = (count: number): ImageData[] => {
    const images: ImageData[] = []
    for (let i = 0; i < count; i++) {
        const seed = Math.floor(Math.random() * 1000) + 1
        images.push({
            id: `img-${Date.now()}-${i}`,
            src: `https://picsum.photos/seed/${seed}/400/600`,
            alt: `LUSTii image ${i + 1}`,
            liked: false,
            likes: Math.floor(Math.random() * 999) + 1,
        })
    }
    return images
}

// components/ImageCard.tsx
interface ImageCardProps {
    image: ImageData
    onLike: (id: string) => void
    onShare: (id: string) => void
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onLike, onShare }) => {
    const [lastTapTime, setLastTapTime] = useState(0)
    const [showLikeAnimation, setShowLikeAnimation] = useState(false)
    const [showFloatingHearts, setShowFloatingHearts] = useState(false)
    const [isPressed, setIsPressed] = useState(false)

    // Handle single and double taps
    const handleTap = useCallback(() => {
        const currentTime = new Date().getTime()
        const tapDelay = 300

        if (currentTime - lastTapTime < tapDelay) {
            // Double tap detected
            if (!image.liked) {
                onLike(image.id)
                setShowLikeAnimation(true)
                setShowFloatingHearts(true)
                setTimeout(() => setShowLikeAnimation(false), 1200)
                setTimeout(() => setShowFloatingHearts(false), 2000)
            }
        }
        setLastTapTime(currentTime)
    }, [lastTapTime, image.id, image.liked, onLike])

    return (
        <div
            className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:shadow-pink-500/25 ${
                isPressed ? "scale-95" : ""
            }`}
        >
            <div
                className="relative w-full h-[500px] overflow-hidden rounded-t-3xl group cursor-pointer"
                onTouchStart={() => setIsPressed(true)}
                onTouchEnd={() => {
                    setIsPressed(false)
                    handleTap()
                }}
                onClick={handleTap}
                onMouseDown={() => setIsPressed(true)}
                onMouseUp={() => setIsPressed(false)}
                onMouseLeave={() => setIsPressed(false)}
            >
                <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                        e.currentTarget.src = "https://placehold.co/400x600/1f2937/f97316?text=✨+LUSTii+✨"
                    }}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Double tap heart animation */}
                {showLikeAnimation && (
                    <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                        <div className="relative">
                            <Heart className="w-24 h-24 text-pink-500 animate-heart-explosion fill-current drop-shadow-2xl" />
                            <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400 animate-spin-slow" />
                            <Star className="absolute -bottom-2 -left-2 w-6 h-6 text-pink-300 animate-pulse" />
                        </div>
                    </div>
                )}

                {/* Floating hearts */}
                {showFloatingHearts && (
                    <div className="absolute inset-0 pointer-events-none">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <FloatingHeart key={i} delay={i * 200} />
                        ))}
                    </div>
                )}

                {/* Like count overlay */}
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md rounded-full px-3 py-1 flex items-center space-x-1">
                    <Heart className={`w-4 h-4 ${image.liked ? "text-pink-500 fill-current" : "text-white"}`} />
                    <span className="text-white text-sm font-bold">{image.likes}</span>
                </div>

                {/* Interaction Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex justify-between items-center">
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                onLike(image.id)
                            }}
                            className={`group/btn relative p-4 rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                                image.liked
                                    ? "bg-gradient-to-r from-pink-500 to-red-500 shadow-lg shadow-pink-500/50"
                                    : "bg-white/10 backdrop-blur-md border-2 border-pink-400/50 hover:border-pink-400"
                            }`}
                        >
                            <Heart className={`w-7 h-7 transition-all duration-300 ${image.liked ? "text-white fill-current" : "text-pink-400 group-hover/btn:text-pink-300"}`} />
                            {image.liked && <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-red-500 rounded-full animate-ping opacity-20"></div>}
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                onShare(image.id)
                            }}
                            className="group/btn p-4 rounded-full bg-white/10 backdrop-blur-md border-2 border-purple-400/50 hover:border-purple-400 transition-all duration-300 transform hover:scale-110 active:scale-95 hover:bg-purple-500/20"
                        >
                            <Share2 className="w-7 h-7 text-purple-400 group-hover/btn:text-purple-300 transition-colors duration-300" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

// components/LoginForm.tsx
interface LoginFormProps {
    onMessage: (msg: string) => void
}

const LoginForm: React.FC<LoginFormProps> = ({ onMessage }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            onMessage("Welcome to paradise! 💋")
        }, 2000)
    }

    return (
        <section className="flex flex-col items-center justify-center min-h-[calc(100vh-205px)] p-6 relative">
            <div className="relative w-full max-w-sm">
                {/* Floating elements around login form */}
                <Heart className="absolute -top-8 -left-4 w-6 h-6 text-pink-400 animate-bounce opacity-60 fill-current" />
                <Diamond className="absolute -top-4 -right-8 w-5 h-5 text-purple-400 animate-pulse opacity-70" />
                <Flame className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-6 h-6 text-orange-400 animate-pulse opacity-60" />

                <div className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 transform hover:scale-[1.02] transition-all duration-500">
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center mb-4">
                            <Sparkles className="w-8 h-8 text-pink-500 mr-2 animate-spin-slow" />
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">Welcome</h2>
                            <Sparkles className="w-8 h-8 text-pink-500 ml-2 animate-spin-slow" />
                        </div>
                        <p className="text-gray-600 text-sm font-medium">Enter your secret paradise</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="relative">
                            <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                className="w-full px-4 py-4 bg-gray-50/80 backdrop-blur-sm border-2 border-transparent rounded-2xl focus:border-pink-400 focus:bg-white/90 transition-all duration-300 text-gray-800 placeholder-gray-400 font-medium"
                                required
                            />
                        </div>

                        <div className="relative">
                            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-4 pr-12 bg-gray-50/80 backdrop-blur-sm border-2 border-transparent rounded-2xl focus:border-pink-400 focus:bg-white/90 transition-all duration-300 text-gray-800 placeholder-gray-400 font-medium"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-pink-500 transition-colors duration-300"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="text-right">
                            <button type="button" className="text-sm text-pink-600 hover:text-pink-700 font-semibold transition-colors duration-300">
                                Forgot Password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 relative overflow-hidden group"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                    Entering Paradise...
                                </div>
                            ) : (
                                <>
                                    <span className="relative z-10 flex items-center justify-center">
                                        {/* <Kiss className="w-5 h-5 mr-2" /> */}
                                        <span className="font-bold text-3xl">💋</span>
                                        Enter Paradise
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </>
                            )}
                        </button>

                        <div className="text-center">
                            <p className="text-gray-600 text-sm">
                                New to paradise? <button className="text-pink-600 hover:text-pink-700 font-bold transition-colors duration-300">Join Now</button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

// --- Main App Component ---
const Home: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"home" | "login">("home")
    const [images, setImages] = useState<ImageData[]>(getDummyImages(5))
    const [loading, setLoading] = useState(false)
    const observerTarget = useRef<HTMLDivElement>(null)
    const [message, setMessage] = useState<string | null>(null)

    const showTemporaryMessage = (msg: string) => {
        setMessage(msg)
        setTimeout(() => setMessage(null), 4000)
    }

    const loadMoreImages = useCallback(() => {
        if (loading) return
        setLoading(true)
        setTimeout(() => {
            setImages((prevImages) => [...prevImages, ...getDummyImages(5)])
            setLoading(false)
        }, 1000)
    }, [loading])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && activeTab === "home") {
                    loadMoreImages()
                }
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: 0.1,
            }
        )

        if (observerTarget.current) {
            observer.observe(observerTarget.current)
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current)
            }
        }
    }, [activeTab, loadMoreImages])

    const handleLike = (id: string) => {
        setImages((prevImages) => prevImages.map((img) => (img.id === id ? { ...img, liked: !img.liked, likes: img.liked ? img.likes - 1 : img.likes + 1 } : img)))
        const isLiked = images.find((img) => img.id === id)?.liked
        showTemporaryMessage(isLiked ? "Removed from favorites 💔" : "Added to favorites! 💖")
    }

    const handleShare = (id: string) => {
        const imageUrl = images.find((img) => img.id === id)?.src
        if (navigator.share && imageUrl) {
            navigator
                .share({
                    title: "Check out this stunning image from LUSTii! 🔥",
                    url: imageUrl,
                })
                .then(() => {
                    showTemporaryMessage("Shared successfully! 🚀")
                })
                .catch(() => {
                    navigator.clipboard.writeText(imageUrl || "")
                    showTemporaryMessage("Link copied to clipboard! 📋")
                })
        } else {
            navigator.clipboard.writeText(imageUrl || "")
            showTemporaryMessage("Link copied to clipboard! 📋")
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 text-gray-800 font-sans relative">
            <AnimatedBackground />

            <header className="w-full backdrop-blur-xl bg-white/80 border-b border-pink-200/50 shadow-lg">
                <div className="px-6 py-2 flex flex-col items-center">
                    <div className="flex items-center space-x-2 mb-2">
                        <h1 className="text-5xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-sm">
                            LUST<span className="text-pink-400">ii</span>
                        </h1>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto pb-24 relative z-10">
                {activeTab === "home" && (
                    <section className="p-6">
                        <div className="grid grid-cols-1 gap-8 w-full max-w-md mx-auto">
                            {images.map((image, index) => (
                                <motion.div
                                    key={image.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.6, delay: index * 0.1, ease: [0.43, 0.13, 0.23, 0.96] }}
                                >
                                    <ImageCard image={image} onLike={handleLike} onShare={handleShare} />
                                </motion.div>
                                // <div key={image.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                                //     <ImageCard image={image} onLike={handleLike} onShare={handleShare} />
                                // </div>
                            ))}
                        </div>
                        <div ref={observerTarget} className="flex justify-center p-8 w-full">
                            {loading && (
                                <div className="flex flex-col items-center space-y-4">
                                    <div className="relative">
                                        <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
                                        <Heart className="absolute inset-0 m-auto w-6 h-6 text-pink-500 animate-pulse" />
                                    </div>
                                    <p className="text-gray-600 text-sm font-medium">Loading more magic...</p>
                                </div>
                            )}
                        </div>
                    </section>
                )}
                {activeTab === "login" && <LoginForm onMessage={showTemporaryMessage} />}
            </main>

            {/* Bottom Navigation */}
            <footer className="fixed bottom-0 z-20 w-full backdrop-blur-xl bg-white/90 border-t border-pink-200/50 shadow-2xl">
                <nav className="p-4 flex justify-center max-w-md mx-auto">
                    <div className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab("home")}
                            className={`flex flex-col items-center p-3 rounded-2xl transition-all duration-300 transform ${
                                activeTab === "home"
                                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg scale-110"
                                    : "text-gray-600 hover:text-pink-500 hover:scale-105"
                            }`}
                        >
                            <House className="w-6 h-6 mb-1" />
                        </button>
                        <button
                            onClick={() => setActiveTab("login")}
                            className={`flex flex-col items-center p-3 rounded-2xl transition-all duration-300 transform ${
                                activeTab === "login"
                                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg scale-110"
                                    : "text-gray-600 hover:text-pink-500 hover:scale-105"
                            }`}
                        >
                            <User className="w-6 h-6 mb-1" />
                        </button>
                    </div>
                </nav>
            </footer>

            <MessageDisplay message={message} onClose={() => setMessage(null)} />

            <style jsx>{`
                @keyframes heart-explosion {
                    0% {
                        transform: scale(0) rotate(0deg);
                        opacity: 0;
                    }
                    15% {
                        transform: scale(1.3) rotate(-5deg);
                        opacity: 1;
                    }
                    30% {
                        transform: scale(1.1) rotate(5deg);
                        opacity: 1;
                    }
                    50% {
                        transform: scale(1.2) rotate(-3deg);
                        opacity: 1;
                    }
                    70% {
                        transform: scale(1.15) rotate(2deg);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(1) rotate(0deg);
                        opacity: 0;
                    }
                }

                @keyframes float-up {
                    0% {
                        transform: translateY(0px) scale(0);
                        opacity: 1;
                    }
                    50% {
                        transform: translateY(-100px) scale(1);
                        opacity: 0.8;
                    }
                    100% {
                        transform: translateY(-200px) scale(0.5);
                        opacity: 0;
                    }
                }

                @keyframes bounce-in {
                    0% {
                        transform: translate(-50%, 100px) scale(0);
                        opacity: 0;
                    }
                    50% {
                        transform: translate(-50%, -10px) scale(1.1);
                        opacity: 1;
                    }
                    70% {
                        transform: translate(-50%, 5px) scale(0.9);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(-50%, 0px) scale(1);
                        opacity: 1;
                    }
                }

                @keyframes fade-in-up {
                    0% {
                        transform: translateY(30px);
                        opacity: 0;
                    }
                    100% {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }

                @keyframes pulse-slow {
                    0%,
                    100% {
                        opacity: 0.3;
                    }
                    50% {
                        opacity: 0.8;
                    }
                }

                @keyframes float {
                    0%,
                    100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                }

                @keyframes bounce-slow {
                    0%,
                    100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }

                @keyframes spin-slow {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }

                .animate-heart-explosion {
                    animation: heart-explosion 1.2s ease-out;
                }
                .animate-float-up {
                    animation: float-up linear forwards;
                }
                .animate-bounce-in {
                    animation: bounce-in 0.6s ease-out;
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out;
                }
                .animate-pulse-slow {
                    animation: pulse-slow 4s ease-in-out infinite;
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                .animate-bounce-slow {
                    animation: bounce-slow 4s ease-in-out infinite;
                }
                .animate-spin-slow {
                    animation: spin-slow 3s linear infinite;
                }
            `}</style>
        </div>
    )
}

export default Home
