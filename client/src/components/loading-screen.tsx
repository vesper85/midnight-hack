import { Logo } from "./logo";

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50">
      <div className="animate-pulse mb-8">
        <Logo className="w-32 h-44 md:w-40 md:h-56" width={160} height={224} />
      </div>
      
      {/* Loading indicator */}
      <div className="flex flex-col items-center space-y-4">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
        </div>
        <p className="text-sm text-muted-foreground animate-pulse">
          Loading application...
        </p>
      </div>
    </div>
  );
}
