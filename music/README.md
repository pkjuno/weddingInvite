# BGM 음악 파일 폴더

이 폴더에 웨딩 초대장 배경음악 파일을 추가하세요.

## 사용 방법

### 1. 음악 파일 준비
- 지원 형식: MP3, OGG, WAV, M4A 등
- 추천: MP3 형식 (가장 높은 브라우저 호환성)
- 파일명 예시: `wedding-bgm.mp3`

### 2. 음악 파일 추가
이 폴더(`music/`)에 음악 파일을 복사하세요.

### 3. 코드 수정
`scripts/main.js` 파일에서 BGM 관련 주석을 해제하고 파일 경로를 수정하세요:

```javascript
// 204-216번 라인의 주석 제거
bgmSound = new Howl({
    src: ['music/wedding-bgm.mp3'],  // 여기에 실제 파일명 입력
    loop: true,
    volume: 0.5,  // 볼륨 조절 (0.0 ~ 1.0)
    onload: function() {
        console.log('BGM 로드 완료');
    },
    onloaderror: function(id, error) {
        console.error('BGM 로드 실패:', error);
    }
});
```

### 4. 자동 재생 설정 (선택사항)
페이지 로드 시 자동 재생을 원하시면 `scripts/main.js`의 245-259번 라인 주석을 해제하세요.

**주의:** 최신 브라우저는 사용자 인터랙션 없이 자동 재생을 차단할 수 있습니다.

## 추천 무료 음악 사이트
- YouTube Audio Library
- Free Music Archive
- Incompetech
- Bensound

## 저작권 주의사항
⚠️ 저작권이 있는 음악은 허가 없이 사용할 수 없습니다.
무료 또는 로열티 프리 음악을 사용하거나, 라이선스를 구매하세요.
