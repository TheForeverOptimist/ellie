'use server'


import { OpenAIWhisperAudio } from "langchain/document_loaders/fs/openai_whisper_audio";

const filePath = ''

const loader = new OpenAIWhisperAudio(filePath);

const docs = await loader.load();

console.log(docs);