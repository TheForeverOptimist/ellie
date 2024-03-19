import { Message } from "@/app/page"
import { ChevronDownCircle } from "lucide-react"


interface MessageProps{
  messages: Message[]
}

function Messages({messages}: MessageProps) {
  return (
    <div className={`flex flex-col min-h-screen p-5 pt-20 ${messages.length > 0 ? "pb-96" : "pb-52"}`}>
      {!messages.length && (
        <div className="flex flex-col space-y-10 flex-1 items-center justify-end">
          <p className="text-white animate-pulse">Start a conversation</p>
          <ChevronDownCircle size={64} className="animate-bounce text-gray-500" />
        </div>
      )}
    </div>
  )
}

export default Messages