"use client"
import * as React from "react"
import { Progress } from "~/components/ui/progress"

interface Loading_Props {
  interval_amount: number
}

const Loading: React.FC<Loading_Props> = ({interval_amount}) => {
  const [progress, setProgress] = React.useState(13);
    React.useEffect(() => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 0;
          }
          return prev + interval_amount;
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
export default Loading;
