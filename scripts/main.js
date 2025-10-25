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
    window.open('https://map.kakao.com/?q=상암월드컵컨벤션', '_blank');
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