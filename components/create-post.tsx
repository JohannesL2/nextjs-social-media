"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"

export function CreatePost({ user }: { user: any }) {
    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || "",
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || ""
    )

    const handleSubmit = async () => {
        if (!content.trim()) return
        setLoading(true)

        const { error } = await supabase.from("posts").insert({
            content,
            user_id: user.id,
            user_email: user.email
        })

        if (!error) {
            setContent("")
            router.refresh()       
        }
        setLoading(false)
    }
    return (
        <div className="border-b p-4">
            <Textarea
                placeholder="What is on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="mb-4"
            />
            <Button onClick={handleSubmit} disabled={loading}>
                {loading ? "Posting..." : "Post"}
            </Button>
        </div>
    )
}