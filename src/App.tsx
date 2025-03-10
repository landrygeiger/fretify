import NoteIdentification from './components/NoteIdentification';
import { KeyboardContextProvider } from './contexts/KeyboardContext';

const App = () => {
  return (
    <KeyboardContextProvider>
      <div className="relative left-1/2 -translate-x-1/2 max-w-5xl p-4">
        <NoteIdentification />
      </div>
    </KeyboardContextProvider>
  );
};

export default App;
