var images = ['https://images.unsplash.com/photo-1519741497674-611481863552?w=1200', 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200', 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200', 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200', 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200', 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200'];
var currentIdx = 0;
var mainImg = document.getElementById('mainGalleryImg');
var thumbsDiv = document.getElementById('galleryThumbs');

images.forEach(function(src, i) {
    var t = document.createElement('div');
    t.className = i === 0 ? 'gallery-thumb active' : 'gallery-thumb';
    var img = document.createElement('img');
    img.src = src;
    img.alt = '사진' + (i+1);
    t.appendChild(img);
    t.onclick = function() {
        currentIdx = i;
        mainImg.src = src;
        var thumbs = document.querySelectorAll('.gallery-thumb');
        thumbs.forEach(function(th, idx) {
            if (idx === i) {
                th.classList.add('active');
                th.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            } else {
                th.classList.remove('active');
            }
        });
    };
    thumbsDiv.appendChild(t);
});

function updateDday() {
    var weddingDate = new Date('2026-03-15T13:50:00').getTime();
    function update() {
        var now = new Date().getTime();
        var distance = weddingDate - now;
        if (distance < 0) {
            document.getElementById('days').textContent = '0';
            document.getElementById('hours').textContent = '0';
            document.getElementById('minutes').textContent = '0';
            document.getElementById('seconds').textContent = '0';
            return;
        }
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    }
    update();
    setInterval(update, 1000);
}
updateDday();

function updateModalCounter() {
    document.getElementById('modalCounter').textContent = (currentIdx + 1) + ' / ' + images.length;
}

function openModal() {
    document.getElementById('modal').classList.add('active');
    document.getElementById('modalImg').src = images[currentIdx];
    updateModalCounter();
}

function closeModal(event) {
    if (event && event.target !== event.currentTarget) return;
    document.getElementById('modal').classList.remove('active');
}

function prevImage(event) {
    event.stopPropagation();
    currentIdx = (currentIdx - 1 + images.length) % images.length;
    document.getElementById('modalImg').src = images[currentIdx];
    updateModalCounter();
}

function nextImage(event) {
    event.stopPropagation();
    currentIdx = (currentIdx + 1) % images.length;
    document.getElementById('modalImg').src = images[currentIdx];
    updateModalCounter();
}

// 키보드 이벤트 리스너 추가
document.addEventListener('keydown', function(e) {
    if (!document.getElementById('modal').classList.contains('active')) return;
    if (e.key === 'ArrowLeft') prevImage(e);
    else if (e.key === 'ArrowRight') nextImage(e);
    else if (e.key === 'Escape') document.getElementById('modal').classList.remove('active');
});

function toggleAccordion(id) {
    var accordion = document.getElementById(id);
    accordion.classList.toggle('active');
}

function copyAcc(num, btn) {
    navigator.clipboard.writeText(num).then(function() {
        btn.textContent = '완료!';
        btn.classList.add('copied');
        setTimeout(function() {
            btn.textContent = '복사';
            btn.classList.remove('copied');
        }, 2000);
    });
}

function tel(num) {
    window.location.href = 'tel:' + num;
}

function sms(num) {
    window.location.href = 'sms:' + num;
}

function shareKakao() {
    if (typeof Kakao !== 'undefined' && !Kakao.isInitialized()) {
        Kakao.init('0d7a6ab65ab7617a12c8b15889e4a2b1');
    }
    if (typeof Kakao !== 'undefined') {
        Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
                title: '박준호 ♥ 김보미 결혼합니다',
                description: '2026년 3월 15일 일요일 오후 1시 50분',
                imageUrl: images[0],
                link: { mobileWebUrl: window.location.href, webUrl: window.location.href }
            }
        });
    } else {
        alert('카카오톡 공유하기를 사용하려면 카카오 개발자 키가 필요합니다.');
    }
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(function() {
        alert('링크가 복사되었습니다! 🔗');
    });
}

// 지도/약도 버튼
document.getElementById('btnMap').addEventListener('click', function() {
    document.getElementById('map').style.display = 'block';
    document.getElementById('map2').style.display = 'none';
    document.getElementById('btnMap').style.fontWeight = 'bold';
    document.getElementById('btnMap').style.borderBottom = '3px solid #6b8e6b';
    document.getElementById('btnSketch').style.fontWeight = 'normal';
    document.getElementById('btnSketch').style.borderBottom = 'none';
});

document.getElementById('btnSketch').addEventListener('click', function() {
    document.getElementById('map').style.display = 'none';
    document.getElementById('map2').style.display = 'block';
    document.getElementById('btnSketch').style.fontWeight = 'bold';
    document.getElementById('btnSketch').style.borderBottom = '3px solid #6b8e6b';
    document.getElementById('btnMap').style.fontWeight = 'normal';
    document.getElementById('btnMap').style.borderBottom = 'none';
});

// 기본 지도 활성화
document.getElementById('btnMap').style.fontWeight = 'bold';
document.getElementById('btnMap').style.borderBottom = '3px solid #6b8e6b';

// 카카오맵 초기화 (카카오맵 API 키 필요)
function initMap() {
    if (typeof kakao !== 'undefined' && kakao.maps) {
        var container = document.getElementById('map');
        var options = {
            center: new kakao.maps.LatLng(37.56842026526049, 126.89614545179921),
            level: 5
        };
    // 마커가 표시될 위치입니다
    var markerPosition  = new kakao.maps.LatLng(37.56842026526049, 126.89614545179921);

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        position: markerPosition
    });

    var map = new kakao.maps.Map(container, options);
    }

    marker.setMap(map);
}

// 길찾기 버튼
//document.getElementById('findDestination').addEventListener('click', function() {
  //  window.open('https://map.kakao.com/?q=상암월드컵컨벤션', '_blank');
//});

initMap();

// ============================================
// BGM (Background Music) 기능
// ============================================

// BGM 음악 파일 경로를 여기에 설정하세요
// 예시: var bgmSound = new Howl({ src: ['music/wedding-bgm.mp3'], ... });
var bgmSound = null;
var isBgmPlaying = false;

// Howler.js를 사용한 BGM 초기화
// 음악 파일이 준비되면 아래 주석을 해제하고 경로를 수정하세요
/*
bgmSound = new Howl({
    src: ['music/wedding-bgm.mp3'],  // 음악 파일 경로 (music 폴더에 파일 추가 필요)
    loop: true,                       // 반복 재생
    volume: 0.5,                      // 볼륨 (0.0 ~ 1.0)
    onload: function() {
        console.log('BGM 로드 완료');
    },
    onloaderror: function(id, error) {
        console.error('BGM 로드 실패:', error);
    }
});
*/

// BGM 컨트롤 버튼 클릭 이벤트
document.getElementById('bgmBtn').addEventListener('click', function() {
    // 음악 파일이 설정되지 않은 경우 안내 메시지
    if (!bgmSound) {
        alert('BGM 음악 파일이 설정되지 않았습니다.\n\n설정 방법:\n1. music 폴더에 음악 파일 추가\n2. scripts/main.js 파일에서 BGM 코드 주석 해제\n3. 파일 경로 수정');
        return;
    }

    var btn = document.getElementById('bgmBtn');

    if (isBgmPlaying) {
        // 음악 정지
        bgmSound.pause();
        btn.classList.remove('playing');
        btn.classList.add('paused');
        isBgmPlaying = false;
    } else {
        // 음악 재생
        bgmSound.play();
        btn.classList.add('playing');
        btn.classList.remove('paused');
        isBgmPlaying = true;
    }
});

// 페이지 로드 시 자동 재생 (선택사항)
// 주의: 최신 브라우저는 사용자 인터랙션 없이 자동 재생을 차단할 수 있습니다
/*
window.addEventListener('load', function() {
    if (bgmSound) {
        // 사용자가 페이지를 클릭하면 자동 재생 시작
        document.body.addEventListener('click', function autoplay() {
            if (!isBgmPlaying) {
                bgmSound.play();
                document.getElementById('bgmBtn').classList.add('playing');
                isBgmPlaying = true;
            }
            document.body.removeEventListener('click', autoplay);
        }, { once: true });
    }
});
*/

