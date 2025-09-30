import { useMemo, useState } from 'react'
import './App.css'
import { 
  useVoiceRecorder,
  downloadBlob,
  formatFileSize,
  getBestAudioFormat
} from 'react-voice-recorder-pro'

function App() {
  const [selectedFormat, setSelectedFormat] = useState(getBestAudioFormat())
  const [fileName, setFileName] = useState('recording')

  const {
    isRecording,
    isPaused,
    isMicrophoneEnabled,
    isPlaying,
    permission,
    audioLevel,
    formattedTime,
    recordedBlob,
    audioUrl,
    error,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    enableMicrophone,
    disableMicrophone,
    playPause,
    reset,
    audioRef,
    resumeAudioContext,
  } = useVoiceRecorder({ mimeType: selectedFormat, autoEnableMicrophone: false })

  const canDownload = !!recordedBlob
  const sizeLabel = useMemo(() => recordedBlob ? formatFileSize(recordedBlob.size) : '-', [recordedBlob])

  return (
    <div style={{ maxWidth: 880, margin: '40px auto', padding: 24, fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif' }}>
      <h1 style={{ marginTop: 0 }}>React Voice Recorder Pro Demo</h1>

      {/* Permissions / Environment */}
      <section style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <span><b>Permission:</b> {permission}</span>
          <span><b>Microphone:</b> {isMicrophoneEnabled ? 'Enabled' : 'Disabled'}</span>
          <button onClick={enableMicrophone} disabled={isMicrophoneEnabled}>Enable Mic</button>
          <button onClick={disableMicrophone} disabled={!isMicrophoneEnabled}>Disable Mic</button>
          <button onClick={resumeAudioContext}>Resume AudioContext (iOS)</button>
        </div>
      </section>

      {/* Settings */}
      <section style={{ marginBottom: 20 }}>
        <label>
          Format:
          <select value={selectedFormat} onChange={(e) => setSelectedFormat(e.target.value)} style={{ marginLeft: 8 }}>
            <option value="audio/webm">WebM</option>
            <option value="audio/mp4">MP4</option>
            <option value="audio/wav">WAV</option>
            <option value="audio/ogg">OGG</option>
          </select>
        </label>
        <label style={{ marginLeft: 16 }}>
          File name:
          <input value={fileName} onChange={(e) => setFileName(e.target.value)} placeholder="recording" style={{ marginLeft: 8 }} />
        </label>
      </section>

      {/* Controls */}
      <section style={{ marginBottom: 20, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {!isRecording && (
          <button onClick={startRecording} disabled={!isMicrophoneEnabled}>Start</button>
        )}
        {isRecording && !isPaused && (
          <button onClick={pauseRecording}>Pause</button>
        )}
        {isRecording && isPaused && (
          <button onClick={resumeRecording}>Resume</button>
        )}
        {isRecording && (
          <button onClick={async () => { await stopRecording() }}>Stop</button>
        )}
        <button onClick={playPause} disabled={!audioUrl}>{isPlaying ? 'Pause Playback' : 'Play'}</button>
        <button onClick={reset}>Reset</button>
        <button onClick={() => recordedBlob && downloadBlob(recordedBlob, `${fileName}.${selectedFormat.split('/')[1]}`)} disabled={!canDownload}>Download</button>
      </section>

      {/* Live Meter & Time */}
      <section style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ width: 240, height: 14, background: '#eee', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ width: `${Math.min(100, Math.max(0, audioLevel * 100))}%`, height: '100%', background: 'linear-gradient(90deg, #4CAF50, #FF9800)' }} />
          </div>
          <span><b>Level:</b> {(audioLevel * 100).toFixed(1)}%</span>
          <span><b>Time:</b> {formattedTime}</span>
        </div>
      </section>

      {/* Playback */}
      <section>
        <audio ref={audioRef} src={audioUrl ?? undefined} controls style={{ width: '100%' }} />
        <div style={{ marginTop: 8, color: '#666', fontSize: 14 }}>
          <div><b>Recorded:</b> {recordedBlob ? sizeLabel : '—'}</div>
          {error && <div style={{ color: 'crimson' }}>Error: {error}</div>}
        </div>
      </section>
    </div>
  )
}

export default App
