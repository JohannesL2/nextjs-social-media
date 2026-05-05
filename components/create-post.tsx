"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"
import { Input } from "./ui/input"

export function CreatePost({ user }: { user: any }) {
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
        <div className="border-b p-4">

        <div className="flex gap-2 mb-4 p-1 bg-gray-100 rounded-lg">
            <button
            onClick={() => setMode("post")}>
                Post
            </button>

            <button
            onClick={() => setMode("event")}>
                Event
            </button>
        </div>

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
            />
            </>
        )}

            <Textarea
                placeholder="What is on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[100px]"
            />
            <Button onClick={handleSubmit} disabled={loading}>
                {loading ? "Publishing..." : mode === "post" ? "Posting" : "Create Event"}
            </Button>
        </div>
    )
}