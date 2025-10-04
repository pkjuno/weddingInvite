var images = [
            'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200',
            'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200',
            'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200',
            'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200',
            'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200',
            'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200'
        ];
        
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
        
        function openModal() {
            document.getElementById('modal').classList.add('active');
            document.getElementById('modalImg').src = images[currentIdx];
        }
        
        function closeModal() {
            document.getElementById('modal').classList.remove('active');
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