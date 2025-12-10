//var images = ['images/A06I6424.JPG', 'images/A06I5339.JPG', 'images/A06I5706.JPG', 'images/A06I5801.JPG', 'images/A06I5871.JPG', 'images/A06I6052.JPG', 'images/A06I6250.JPG', 'images/outSide1.jpg','images/outSide2.jpg', 'images/outSide3.jpg'];
var images = ['images/readyForGallery.png'];
var currentIdx = 0;
var mainImg = document.getElementById('mainGalleryImg');
var thumbsDiv = document.getElementById('galleryThumbs');

// TODO ::: 보정 이미지 받으면 주석 해제 
// images.forEach(function(src, i) {
//     var t = document.createElement('div');
//     t.className = i === 0 ? 'gallery-thumb active' : 'gallery-thumb';
//     var img = document.createElement('img');
//     img.src = src;
//     img.alt = '사진' + (i+1);
//     t.appendChild(img);
//     t.onclick = function() {
//         currentIdx = i;
//         mainImg.src = src;
//         var thumbs = document.querySelectorAll('.gallery-thumb');
//         thumbs.forEach(function(th, idx) {
//             if (idx === i) {
//                 th.classList.add('active');
//                 th.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
//             } else {
//                 th.classList.remove('active');
//             }
//         });
//     };
//     thumbsDiv.appendChild(t);
// });

function updateDday() {
    // 모바일 Safari 호환 날짜 형식
    var weddingDate = new Date(2026, 2, 15, 13, 50, 0).getTime(); // 월은 0부터 시작 (2 = 3월)
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

        var daysEl = document.getElementById('days');
        var hoursEl = document.getElementById('hours');
        var minutesEl = document.getElementById('minutes');
        var secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.textContent = days;
        if (hoursEl) hoursEl.textContent = hours;
        if (minutesEl) minutesEl.textContent = minutes;
        if (secondsEl) secondsEl.textContent = seconds;
    }
    update();
    setInterval(update, 1000);
}

// DOM이 로드된 후 실행
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateDday);
} else {
    updateDday();
}

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
                description: '2026년 3월 15일 일요일 오후 1시 40분\n상암 월드컵 컨벤션 임페리얼 홀',
                imageUrl: 'https://pkjuno.github.io/weddingInvite/images/KHY_0482.JPG',
                link: { mobileWebUrl: 'https://pkjuno.github.io/weddingInvite', webUrl: 'https://pkjuno.github.io/weddingInvite' }
            },
            buttons: [
                {
                    title: '초대장 보기',
                    link: { mobileWebUrl: 'https://pkjuno.github.io/weddingInvite', webUrl: 'https://pkjuno.github.io/weddingInvite' }
                }
            ]
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

// 카카오맵 길찾기 버튼
$("#findDestination_kakao").click(function(){
    window.open('https://map.kakao.com/?q=상암월드컵컨벤션', '_blank');
});

initMap();


// ============================================
// 네비게이션 앱 연동
// ============================================

// 목적지 정보
var destination = {
    name: '상암월드컵컨벤션',
    address: '서울특별시 마포구 월드컵북로 402',
    lat: 37.56842026526049,
    lng: 126.89614545179921
};

// 네이버지도 길찾기
var navermapLinks = document.querySelectorAll('.navermap');
navermapLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        // 네이버지도 웹 URL (모바일/PC 모두 지원)
        var naverUrl = 'https://map.naver.com/v5/search/' + encodeURIComponent(destination.name);
        window.open(naverUrl, '_blank');
    });
});

// 티맵 길찾기
var tmapLinks = document.querySelectorAll('.tmap');
tmapLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        // 티맵 URL Scheme (모바일 앱)
        var tmapUrl = 'tmap://route?goalname=' + encodeURIComponent(destination.name) +
                      '&goalx=' + destination.lng + '&goaly=' + destination.lat;

        // 앱 실행 시도, 실패시 웹 페이지로 이동
        window.location.href = tmapUrl;
        setTimeout(function() {
            // 앱이 설치되지 않은 경우 티맵 웹사이트로 이동
            window.open('https://www.tmap.co.kr', '_blank');
        }, 1500);
    });
});

$("#findDestination_kakao").click(function(){
    window.open('https://map.kakao.com/?q='+encodeURIComponent(destination.name), '_blank');
})
// 카카오맵 길찾기
// var kakaomapLinks = document.querySelectorAll('.kakaomap');
// kakaomapLinks.forEach(function(link) {
//     link.addEventListener('click', function(e) {
//         e.preventDefault();
//         // 카카오맵 웹 URL
//         var kakaoMapUrl = 'https://map.kakao.com/link/to/' + encodeURIComponent(destination.name) +
//                           ',' + destination.lat + ',' + destination.lng;
//         window.open(kakaoMapUrl, '_blank');
//     });
// });

// ============================================
// 네비게이션 앱 연동
// ============================================

// 목적지 정보
var destination = {
    name: '상암월드컵컨벤션',
    address: '서울특별시 마포구 월드컵북로 402',
    lat: 37.56842026526049,
    lng: 126.89614545179921
};

// 네이버지도 길찾기
var navermapLinks = document.querySelectorAll('.navermap');
navermapLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        // 네이버지도 웹 URL (모바일/PC 모두 지원)
        var naverUrl = 'https://map.naver.com/v5/search/' + encodeURIComponent(destination.name);
        window.open(naverUrl, '_blank');
    });
});

// 티맵 길찾기
var tmapLinks = document.querySelectorAll('.tmap');
tmapLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        // 티맵 URL Scheme (모바일 앱)
        var tmapUrl = 'tmap://route?goalname=' + encodeURIComponent(destination.name) +
                      '&goalx=' + destination.lng + '&goaly=' + destination.lat;

        // 앱 실행 시도, 실패시 웹 페이지로 이동
        window.location.href = tmapUrl;
        setTimeout(function() {
            // 앱이 설치되지 않은 경우 티맵 웹사이트로 이동
            window.open('https://www.tmap.co.kr', '_blank');
        }, 1500);
    });
});

// 카카오내비 길찾기
var kakaonaviLinks = document.querySelectorAll('.kakaonavi');
kakaonaviLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        // 카카오내비 URL Scheme (모바일 앱)
        var kakaoNaviUrl = 'kakaonavi://route?ep=' + destination.lng + ',' + destination.lat +
                           '&ename=' + encodeURIComponent(destination.name);

        // 앱 실행 시도, 실패시 웹 페이지로 이동
        window.location.href = kakaoNaviUrl;
        setTimeout(function() {
            // 앱이 설치되지 않은 경우 카카오내비 안내 페이지로 이동
            window.open('https://kakaonavi.kakao.com', '_blank');
        }, 1500);
    });
});

// 카카오맵 길찾기
var kakaomapLinks = document.querySelectorAll('.kakaomap');
kakaomapLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        // 카카오맵 웹 URL
        var kakaoMapUrl = 'https://map.kakao.com/link/to/' + encodeURIComponent(destination.name) +
                          ',' + destination.lat + ',' + destination.lng;
        window.open(kakaoMapUrl, '_blank');
    });
});

// ============================================
// BGM (Background Music) 기능
// ============================================

// jQuery 체크 및 BGM 초기화
(function() {
    console.log('BGM 초기화 시작');
    console.log('jQuery 로드 여부:', typeof jQuery !== 'undefined');
    console.log('Howler 로드 여부:', typeof Howl !== 'undefined');

    function initBGM() {
        console.log('initBGM 함수 실행');
        var bgmSound = null;
        var isBgmPlaying = false;
        var autoplayAttempted = false;

        // Howler.js를 사용한 BGM 초기화
        try {
            bgmSound = new Howl({
                src: ['music/bgm.mp3'],  // 음악 파일 경로
                loop: true,               // 반복 재생
                volume: 0.5,              // 볼륨 (0.0 ~ 1.0)
                html5: true,              // 모바일 호환성 향상
                onload: function() {
                    console.log('BGM 로드 완료');
                },
                onloaderror: function(id, error) {
                    console.error('BGM 로드 실패:', id, error);
                },
                onplay: function() {
                    isBgmPlaying = true;
                    var btn = document.getElementById('bgmBtn');
                    if (btn) {
                        btn.classList.add('playing');
                        btn.classList.remove('paused');
                    }
                    console.log('BGM 재생 중');
                },
                onpause: function() {
                    isBgmPlaying = false;
                    var btn = document.getElementById('bgmBtn');
                    if (btn) {
                        btn.classList.remove('playing');
                        btn.classList.add('paused');
                    }
                    console.log('BGM 정지됨');
                }
            });
        } catch(error) {
            console.error('Howl 초기화 오류:', error);
        }

        // 사용자의 첫 번째 클릭/터치 시 자동 재생 시도
        document.addEventListener('click', function autoplayHandler() {
            if (!autoplayAttempted && bgmSound) {
                autoplayAttempted = true;
                console.log('사용자 인터랙션 감지, BGM 자동 재생 시도');
                bgmSound.play();
            }
        }, { once: true });

        document.addEventListener('touchstart', function autoplayTouchHandler() {
            if (!autoplayAttempted && bgmSound) {
                autoplayAttempted = true;
                console.log('터치 인터랙션 감지, BGM 자동 재생 시도');
                bgmSound.play();
            }
        }, { once: true });

        // BGM 컨트롤 버튼 클릭 이벤트
        var bgmBtn = document.getElementById('bgmBtn');
        if (bgmBtn) {
            console.log('BGM 버튼 찾음');
            bgmBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                console.log('BGM 버튼 클릭됨');

                // 음악 파일이 설정되지 않은 경우 안내 메시지
                if (!bgmSound) {
                    console.error('bgmSound가 없음');
                    alert('BGM 음악 파일이 설정되지 않았습니다.');
                    return;
                }

                if (isBgmPlaying) {
                    // 음악 정지
                    console.log('BGM 정지 시도');
                    bgmSound.pause();
                } else {
                    // 음악 재생
                    console.log('BGM 재생 시도');
                    bgmSound.play();
                }
            });
        } else {
            console.error('BGM 버튼을 찾을 수 없음');
        }
    }

    // DOM 로드 후 실행
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBGM);
    } else {
        initBGM();
    }
})();