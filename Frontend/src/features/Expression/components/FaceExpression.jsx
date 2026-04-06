import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";
import "./FaceExpression.scss";

export default function FaceExpression({ onClick = () => { } }) {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);

    const [ expression, setExpression ] = useState("Scanning...");
    const [ isActive, setIsActive ] = useState(false);

    useEffect(() => {
        init({ landmarkerRef, videoRef, streamRef });

        return () => {
            if (landmarkerRef.current) landmarkerRef.current.close();
            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    async function handleScan() {
        if (isActive) return;
        setIsActive(true);
        setExpression("Scanning...");

        let detectedMood = null;
        let attempts = 0;
        const maxAttempts = 20; // ~2 seconds of scanning

        let isFinished = false;
        const scanningInterval = setInterval(() => {
            if (isFinished) return;

            const result = detect({ landmarkerRef, videoRef, setExpression });
            if (result && result !== "Neutral") {
                isFinished = true;
                clearInterval(scanningInterval);
                finishScan(result);
                return;
            }
            
            attempts++;
            if (attempts >= maxAttempts) {
                isFinished = true;
                clearInterval(scanningInterval);
                finishScan(detectedMood || "Neutral");
            }
        }, 100);

        function finishScan(finalMood) {
            setExpression(finalMood);
            onClick(finalMood);
            setTimeout(() => {
                setIsActive(false);
            }, 2000);
        }
    }

    return (
        <div className="face-expression-scanner">
            <div className={`face-expression-scanner__video-container ${isActive ? 'face-expression-scanner__video-container--active' : ''}`}>
                <video
                    ref={videoRef}
                    className="face-expression-scanner__video"
                    playsInline
                />
                <div className="face-expression-scanner__overlay">
                    <div className="face-expression-scanner__scan-line" />
                    <div className="face-expression-scanner__corner face-expression-scanner__corner--top-left" />
                    <div className="face-expression-scanner__corner face-expression-scanner__corner--top-right" />
                    <div className="face-expression-scanner__corner face-expression-scanner__corner--bottom-left" />
                    <div className="face-expression-scanner__corner face-expression-scanner__corner--bottom-right" />
                </div>
            </div>
            
            <div className="face-expression-scanner__info">
                <div className="face-expression-scanner__status">
                    <span className={`face-expression-scanner__dot ${isActive ? 'face-expression-scanner__dot--active' : ''}`} />
                    <p className="face-expression-scanner__mood-label">
                        Detected Mood: <span>{expression}</span>
                    </p>
                </div>
                <button 
                    className="face-expression-scanner__btn btn btn--primary" 
                    onClick={handleScan}
                    disabled={isActive}
                >
                    <span className="material-symbols-outlined">psychology</span>
                    {isActive ? 'Analyzing...' : 'Scan Mood'}
                </button>
            </div>
        </div>
    );
}