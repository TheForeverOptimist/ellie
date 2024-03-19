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
          src="https://cdn.discordapp.com/attachments/1067565429771481131/1219543327477862440/ellie-2.png?ex=660baf3b&is=65f93a3b&hm=382fef4cf655b3ef4e2fc450a50796e7d8d2823e0669252ff0ec24699f21d686&"
          height={75}
          width={75}
          className="object-contain rounded-full p-2 m-2"
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
            <VoiceSynthesizer state={state} displaySettings={displaySettings} />
          </div>
        </div>
      </form>
    </main>
  );
}
