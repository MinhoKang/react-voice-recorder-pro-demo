# React Voice Recorder Pro Demo (Vite + React + TS)

This project is a Vite-based demo to quickly try the `react-voice-recorder-pro` component. Run it locally to test mic recording, pause/resume, playback, and file download.

## Getting Started

1. Install dependencies
   ```bash
   npm install
   ```

2. Start the dev server
   ```bash
   npm run dev
   ```
   Open the shown local URL in your browser (e.g., `http://localhost:5173`).

## Scripts

- `npm run dev`: Start dev server (with HMR)
- `npm run build`: Build TypeScript and create production bundle
- `npm run preview`: Preview the production build locally
- `npm run lint`: Run ESLint

## Quick Usage Example

Minimal usage in `App.tsx`:

```tsx
import { useState } from 'react'
import { VoiceRecorder } from 'react-voice-recorder-pro'

export default function App() {
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)

  return (
    <div style={{ padding: 24 }}>
      <h1>React Voice Recorder Pro Demo</h1>
      <VoiceRecorder onRecorded={setAudioBlob} />

      {audioBlob && (
        <audio controls src={URL.createObjectURL(audioBlob)} style={{ marginTop: 16 }} />
      )}
    </div>
  )
}
```

For advanced options, see the package page: [`react-voice-recorder-pro` on npm](https://www.npmjs.com/package/react-voice-recorder-pro)

## Build

Create a production build:

```bash
npm run build
```

The output is written to `dist/`. Use `npm run preview` to serve it locally.

## Requirements

- Node.js 18+ recommended
- Microphone permission (allow the browser permission prompt)

## License

This demo is provided for learning and testing purposes.
