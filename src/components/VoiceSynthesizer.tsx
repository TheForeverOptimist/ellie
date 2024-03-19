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
    <div>
      {displaySettings && (
        <>
          <div>
            <p>Voice</p>
          </div>
        </>
      )}
    </div>
  );
}

export default VoiceSynthesizer;
