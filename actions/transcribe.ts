'use server'

import {
    AzureKeyCredential,
    ChatRequestMessage,
    OpenAIClient
} from "@azure/openai"

async function transcript(prevState: any, formData: FormData){
    console.log("PREVIOUS STATE:", prevState)

    const id = Math.random().toString(36);

    if(
        process.env.AZURE_API_KEY === undefined ||
        process.env.AZURE_ENDPOINT === undefined ||
        process.env.AZURE_DEPLOYMENT_NAME === undefined ||
        process.env.AZURE_DEPLOYMENT_COMPLETIONS_NAME === undefined
    ){
        console.error("Azure credentials not set")
        return {
            sender: "",
            response: "Azure credentials not set"
        }

    }

    const file = formData.get("audio") as File;

    if (file.size === 0) {
        return {
            sender: "",
            response: "No audio file provided",
        }
    }
    console.log(">>", file)

    const arrayBuffer = await file.arrayBuffer();
    const audio = new Uint8Array(arrayBuffer);

    //----- get audio transcription from Azure Whisper AI --- //

    const client = new OpenAIClient(
        process.env.AZURE_ENDPOINT,
        new AzureKeyCredential(process.env.AZURE_API_KEY)
    );

    const result = await client.getAudioTranscription(
        process.env.AZURE_DEPLOYMENT_NAME,
        audio
    )

    console.log(`Transcription: ${result.text}`)

    //--- get chat completion --//

    const messages: ChatRequestMessage[] = [{
        role: "system",
        content: "You are a helpful assistant named Ellie. In the first response to a user you will introduce yourself saying Hi! I'm Ellie. Followed by your response. After which you will answer questions and reply I cannot answer that if you dont know the answer."
    }, {
        role: "user",
        content: result.text
    }];

    const completions = await client.getChatCompletions(
        process.env.AZURE_DEPLOYMENT_COMPLETIONS_NAME,
        messages,
        {maxTokens: 128}
    )

    const response = completions.choices[0].message?.content;

    console.log(prevState.sender, "+++", result.text)

    return {
        sender: result.text,
        response: response,
        id,
    }



}

export default transcript