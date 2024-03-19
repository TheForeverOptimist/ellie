'use client'



type State = {
  sender: string;
  response: string | null | undefined;
};

function VoiceSynthesizer({
  state,
  displaySettings,
}: {
  state: State;
  displaySettings: boolean;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-white">
      {displaySettings && (
        <>
          <div>
            <p className="text-xs text-gray-500 p-2">Voice</p>
                <select className="flex-1 bg-blue-500 text-white border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {window.speechSynthesis.getVoices().map((voice) => (
                        <option key={voice.name} value={voice.name}>
                            {voice.name}
                        </option>
                    ))}
                </select>
          </div>
        </>
      )}
    </div>
  );
}

export default VoiceSynthesizer;
