"use client"
import * as React from "react"
import { Progress } from "~/components/ui/progress"

export default function Loading() {
  const [progress, setProgress] = React.useState(13);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 0;
        }
        return prev + 3;
      });
    }, 50);
    return () => clearInterval(interval);

  })
  return (
    <div className="items-center justify-center w-1/3 m-auto">
        <Progress value={progress} />
    </div>
  );
}
