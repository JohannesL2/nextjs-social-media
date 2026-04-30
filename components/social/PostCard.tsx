import { formatDistanceToNow } from "date-fns"

export function PostCard({ post }: { post: any }) {
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

    <p>{post.content}</p>

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