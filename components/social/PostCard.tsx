import { formatDistanceToNow } from "date-fns"

interface Post {
    id: string;
    type: "general" | "event";
    user_email: string;
    created_at: string | Date;
    content: string;
    title?: string;
    event_date?: string | Date;
}

interface User {
    id: string;
    email: string;
    name: string;
}

interface PostCardProps {
    post: Post;
    user: User;
}

export function PostCard({ post, user }: PostCardProps) {
    return (
        <div className="p-5 border rounded-xl bg-card shadow-sm hover:shadow-md transition-shadow border-border/50">
            <div className="flex items-center gap-3 mb-3">
            <div className="size-9 rounded-full bg-primary/20 text-primary-foreground flex items-center justify-center font-bold text-sm border border-primary/30">
                {post.user_email?.charAt(0).toUpperCase()}
            </div>

        <div className="flex flex-col">
            <span className="text-sm font-semibold leading-none lowercase">
                @{post.user_email?.split("@")[0]}
            </span>
            <span className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
            </span>
        </div>
    </div>

    {post.type === "event" && post.event_date && (
        <div className="mb-3 p-3 border rounded-lg bg-secondary/50">
            {post.title && <h3 className="text-lg font-semibold mb-1">{post.title}</h3>}
            <p className="text-sm text-muted-foreground">
                Event Date: {new Date(post.event_date).toLocaleString('sv-SE' , {
                    dateStyle: 'medium', 
                    timeStyle: 'short' 
                })}
            </p>
        </div>
    )}

    <p className="text-sm text-foreground/90 whitespace-pre-wrap">{post.content}</p>

    <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border/40">
        <button className="text-xs text-muted-foreground hover:text-primary transition-colors">
          Like
        </button>
        <button className="text-xs text-muted-foreground hover:text-primary transition-colors">
          Reply
        </button>
      </div>
</div>
    )
}