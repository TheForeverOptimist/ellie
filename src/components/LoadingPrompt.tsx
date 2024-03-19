"use client";

import { useFormStatus } from "react-dom";
import { BeatLoader } from "react-spinners";

function LoadingPrompt() {
  const { pending } = useFormStatus();

  return (
    pending && (
      <p className="message ml-auto">
        <BeatLoader />
      </p>
    )
  );
}

export default LoadingPrompt;
