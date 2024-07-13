import React from 'react';
import useSpeechRecognition from './useSpeechRecognition';
import { convertToWon, analyzeBid } from './bidAnalyzer';

const SpeechRecognitionComponent = () => {
  const {
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    lastResult,
    confidence,
    currentPrice,
    handleStart,
    handleStop,
    resetPrice
  } = useSpeechRecognition(5000);

  if (!browserSupportsSpeechRecognition) {
    return <span>크롬을 사용해 주세요</span>;
  }

  // 금액을 올바른 형식으로 표시하는 함수
  const formatAmount = (amount) => {
    const wonAmount = typeof amount === 'number' ? amount : convertToWon(amount);
    return wonAmount.toLocaleString() + '원';
  };

  const bidAnalysis = analyzeBid(lastResult);

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <button onClick={resetPrice}>Reset Price</button>

      <h3>현재 가격:</h3>
      <p>{currentPrice.toLocaleString()}원</p>

      <h3>음성 인식 결과:</h3>
      <p>가장 확률이 높은 결과: {lastResult}</p>
      <p>확률: {(confidence * 100).toFixed(2)}%</p>

      <h3>입찰 금액 추출 결과:</h3>
      {bidAnalysis && (
        <div>
          <p>원본 텍스트: {bidAnalysis.original}</p>
          <p>감지된 금액: {bidAnalysis.amounts.join(', ') || '없음'}</p>
          <p>변환된 금액(원): {bidAnalysis.numbers.map(num => parseInt(num).toLocaleString() + '원').join(', ') || '없음'}</p>
        </div>
      )}
    </div>
  );
};

export default SpeechRecognitionComponent;