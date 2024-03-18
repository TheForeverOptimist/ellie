'use client'

import Image from "next/image";
import activeIcon from "/img/active.gif";
import nonActiveIcon from "/img/notactive.png";
import { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

export const mimeType = "audio/webm";

function Recorder({uploadAudio} :{uploadAudio: (blob:Blob) => void}) {
    const mediaRecorder = useRef<MediaRecorder | null>(null)
    const {pending} = useFormStatus();
    const [permission, setPermission] = useState(false)
    const [stream, setStream] = useState<MediaStream | null>(null)
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [audioChunks, setAudioChunks] = useState<Blob[]>([])





    useEffect(() => {
        getMicrophonePermission()

    }, [])



    //we are going to check for the media recorder
    const getMicrophonePermission = async() => {
        if ("MediaRecorder" in window) {
          try {
            const streamData = await navigator.mediaDevices.getUserMedia({
              audio: true,
              video: false,
            });
            setPermission(true);
            setStream(streamData);
          } catch (err: any) {
            alert(err.message);
          }
        } else {
          alert("The MediaRecorder API is not supported in your browser");
        }
    }

    const startRecording = async () => {
        if(stream === null || pending) return;

        setRecordingStatus("recording");

        // create a new media recorder instance using the stream
        const media = new MediaRecorder(stream, {mimeType});
        mediaRecorder.current = media;
        mediaRecorder.current.start();

        let localAudioChunks: Blob[] = [];
        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === "undefined") return;
            if (event.data.size === 0) return;
            
            localAudioChunks.push(event.data);
        };
        setAudioChunks(localAudioChunks);
    }

    const stopRecording = async () => {
        if(mediaRecorder.current === null || pending) return;

        setRecordingStatus("inactive");
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
            const audioBlob = new Blob(audioChunks, {type: mimeType})
            uploadAudio(audioBlob);
            setAudioChunks([])
        }    }

  return (
    <div className="flex items-center justify-center text-white">
      {!permission && (
        <button onClick={getMicrophonePermission}>Get Microphone</button>
      )}
      {pending && (
        <Image
          src={activeIcon}
          width={350}
          height={350}
          priority
          alt="Recording"
          className="assistant grayscale"
        />
      )}
      {permission && recordingStatus === "inactive" && !pending && (
        <Image
          src={nonActiveIcon}
          width={350}
          height={350}
          onClick={startRecording}
          priority={true}
          alt="Not Recording"
          className="assistant cursor-pointer hover:scale-110 duration-150 transition-all ease-in-out"
        />
      )}

      {recordingStatus === "recording" && (
        <Image
          src={activeIcon}
          width={350}
          height={350}
          onClick={stopRecording}
          priority={true}
          alt="Not Recording"
          className="assistant cursor-pointer hover:scale-110 duration-150 transition-all ease-in-out"
        />
      )}
    </div>
  );
}

export default Recorder;
