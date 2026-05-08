"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"
import { Input } from "./ui/input"
import { Plus } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

export function CreatePost({ user }: { user: any }) {
    const [isOpen, setIsOpen] = useState(false)

    const [mode, setMode] = useState<"post" | "event">("post")
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")
    const [eventDate, setEventDate] = useState("")
    const [loading, setLoading] = useState(false)
    
    const router = useRouter()
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || "",
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || ""
    )

    const handleSubmit = async () => {
        if (mode === "post" && !content.trim()) return
        if (mode === "event" && (!title.trim() || !eventDate)) return

        setLoading(true)

        try {
        const { error } = await supabase.from("posts").insert({
            type: mode,
            content: content,
            title: mode === "event" ? title : null,
            event_date: mode === "event" ? eventDate : null,
            user_id: user.id,
            user_email: user.email
        }).select()

        if (error) {
            console.error("Supabase Error:", error);
            alert(`Kunde inte spara: ${error.message}`)
        } else {
            setContent("")
            setTitle("")
            setEventDate("")
            router.refresh()       
            }
        } catch (err) {
            console.error("System Error:", err);
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
        <Button 
            onClick={() => setIsOpen(!isOpen)}
            variant="outline"
            size="sm"
            className="p-4"
        >
            <Plus size={16} />
            <span className="hidden sm:inline">Create Post</span>
        </Button>

        <AnimatePresence>
        {isOpen && (
            <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-x-4 top-[10%] m-auto max-w-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl z-[101] overflow-hidden"
            >
            <div className="border-b p-4 rounded-lg bg-zinc-900/10">
        <div className="border-b p-4">

        <div className="flex gap-2 mb-4 p-4 rounded-lg">
            <button
            className="rounded-lg p-2 bg-zinc-500 hover:bg-zinc-600"
            onClick={() => setMode("post")}>
                Post
            </button>

            <button
            className="rounded-lg p-2 bg-zinc-500 hover:bg-zinc-600"
            onClick={() => setMode("event")}>
                Event
            </button>
        </div>
    </div>

    <div className="space-y-4">
        {mode === "event" && (
            <>
            <Input
                placeholder="Namn på event..."
                value={title}
                onChange={(e) => setTitle(e.target.value        
                )}
            />
            <Input
                type="datetime-local"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="text-zinc-900"
            />
            </>
        )}

            <Textarea
                placeholder="What is on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[100px]"
            />
            </div>
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                                    <Button variant="ghost" onClick={() => setIsOpen(false)}>
                                        Avbryt
                                    </Button>
                                    <Button 
                                        onClick={handleSubmit} 
                                        disabled={loading}
                                        className="px-8 bg-green-600 hover:bg-green-700 text-white"
                                    >
                                        {loading ? "Publicerar..." : mode === "post" ? "Create Post" : "Create Event"}
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}