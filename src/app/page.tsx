"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Messages from "@/components/Messages";
import Recorder, { mimeType } from "@/components/Recorder";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight, SettingsIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import transcript from "../../actions/transcribe";
import VoiceSynthesizer from "@/components/VoiceSynthesizer";

const initialState = {
  sender: "",
  response: "",
  id: "",
};

export type Message = {
  sender: string;
  response: string;
  id: string;
};

export default function Home() {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);
  const [state, formAction] = useFormState(transcript, initialState);
  const [messages, setMessages] = useState<Message[]>([]);
  const [displaySettings, setDisplaySettings] = useState(false)

  //create a useEffect for updating the messages (server action)
  useEffect(() => {
    if (state.response && state.sender) {
      setMessages((messages) => [
        {
          sender: state.sender || "",
          response: state.response || "",
          id: state.id || "",
        },
        ...messages,
      ]);
    }
  }, [state]);

  const uploadAudio = (blob: Blob) => {
    const file = new File([blob], "audio.webm", { type: mimeType });

    //set the file as the value of the hidden file input field
    if (fileRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileRef.current.files = dataTransfer.files;

      //simulate a click & submit the form
      if (submitButtonRef.current) {
        submitButtonRef.current.click();
      }
    }
  };

  return (
    <main className="bg-black h-screen overscroll-y-auto">
      <header className="flex justify-between fixed w-full top-0 text-white ">
        <Image
          alt="Logo"
          src="https://i.imgur.com/MCHWJZS.png"
          height={50}
          width={50}
          className="object-contain"
        />

        <SettingsIcon
          size={40}
          onClick={() => setDisplaySettings(!displaySettings)}
          className="p-2 m-2 rounded-full cursor-pointer bg-blue-700 text-black transition-all ease-in-out duration-150 hover:bg-blue-700 hover:text-white"
        />
      </header>

      <form action={formAction} className="flex flex-col bg-black">
        <div className="flex-1 bg-gradient-to-b from-blue-500 to-black">
          <Messages messages={messages} />
        </div>
        {/* Hidden Fields */}
        <input type="file" name="audio" hidden ref={fileRef} />
        <button type="submit" hidden ref={submitButtonRef}>
          Submit Audio
        </button>
        <div className="fixed bottom-0 w-full overflow-hidden bg-black rounded-t-3xl">
          <Recorder uploadAudio={uploadAudio} />
          <div>
            {/* Voice Synthesizer -- output for Assistant Voice */}
            <VoiceSynthesizer
            state={state}
            displaySettings={displaySettings}
            
            />
            
            
            </div>
        </div>
      </form>
    </main>
  );
}
