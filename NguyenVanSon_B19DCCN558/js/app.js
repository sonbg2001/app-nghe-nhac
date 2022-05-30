const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
var slideIndex = 0
const slides = $$('.slider__item')
slidesLength = slides.length

// Slides show

showSlides();

function plusSlides(n) {
    showSlidesClick(slideIndex += n);
}

const nextBtn = $('.slider__icon--next')
const backBtn = $('.slider__icon--back')
nextBtn.onclick = function () {
    plusSlides(1)
}
backBtn.onclick = function () {
    plusSlides(-1)
}

function showSlidesClick(n) {
    if (n > slidesLength) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slidesLength
    }

    slides.forEach(function (slide) {
        slide.style.display = "none";
    })
    slides[slideIndex - 1].style.display = "block";
}

function showSlides() {

    slides.forEach(function (slide) {
        slide.style.display = "none";
    })
    slideIndex++;
    if (slideIndex > slidesLength) {
        slideIndex = 1
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 3000);
}

// tab story

const tabs = $$('.tab-item')
const panes = $$('.tab-pane')
const tabActive = $('.tab-item.active')
const line = $('.line')
line.style.width = tabActive.offsetWidth + 'px'
line.style.left = tabActive.offsetLeft + 'px'



tabs.forEach((tab, index) => {
    pane = panes[index]
    tab.onclick = function () {

        $('.tab-item.active').classList.remove('active')
        $('.tab-pane.active').classList.remove('active')
        line.style.width = this.offsetWidth + 'px'
        line.style.left = this.offsetLeft + 'px'
        this.classList.add('active')
        panes[index].classList.add('active')

    }
})

//Music Player
const playSongCurrent = $('.play__song--current')
const songThumbPlay = $('.song__thumb--play')
const songTitlePlay = $('.song__title--play')
const songAutherPlay = $('.song__author--play')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const playerBody = $('.player__body')
const progress = $('.progress')
const nextBtnSong = $('.btn-next')
const prevBtnSong = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')
const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs: [
        {
            name: 'Bình yên nơi đâu',
            singer: 'Sơn Tùng MT-P',
            path: './assets/music/binhyennoidau.mp3',
            image: './assets/img/binhyennoidau.jpg'
        },
        {
            name: 'Cơn mưa ngang qua',
            singer: 'Sơn Tùng MT-P',
            path: './assets/music/conmuangangqua.mp3',
            image: './assets/img/conmuangangqua.jpg'
        },
        {
            name: 'Không phải dạng vừa đâu',
            singer: 'Sơn Tùng MT-P',
            path: './assets/music/khongphaidangvuadau.mp3',
            image: './assets/img/khongphaidangvuadau.jpg'
        },
        {
            name: 'Khuôn mặt đáng thương',
            singer: 'Sơn Tùng MT-P',
            path: './assets/music/khuonmatdangthuong.mp3',
            image: './assets/img/khuonmatdangthuong.jpg'
        },
        {
            name: 'Màu mắt em',
            singer: 'J97',
            path: './assets/music/maumatem.mp3',
            image: './assets/img/maumatem.jpg'
        },
        {
            name: 'Nơi này có anh',
            singer: 'Sơn Tùng MT-P',
            path: './assets/music/noinaycoanh.mp3',
            image: './assets/img/noinaycoanh.jpg'
        },
        {
            name: 'Nụ cười 18 20',
            singer: 'Doãn Hiếu',
            path: './assets/music/nucuoi1820.mp3',
            image: './assets/img/nucuoi1820.jpg'
        },
        {
            name: 'Remember me',
            singer: 'Sơn Tùng MT-P',
            path: './assets/music/rememberme.mp3',
            image: './assets/img/rememberme.jpg'
        },
        {
            name: 'Thái bình mồ hôi rơi',
            singer: 'Sơn Tùng MT-P',
            path: './assets/music/thaibinhmohoiroi.mp3',
            image: './assets/img/thaibinhmohoiroi.jpg'
        },
        {
            name: 'Tiến lên Việt Nam ơi!',
            singer: 'Sơn Tùng MT-P',
            path: './assets/music/tienlenvietnamoi.mp3',
            image: './assets/img/tienlenvietnamoi.jpg'
        }
    ],

    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
                <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                    <div class="song__thumb" style="background-image: url('${song.image}')">
                    </div>
                    <div class="song__body">
                        <h3 class="song__title">${song.name}</h3>
                        <p class="song__author">${song.singer}</p>
                    </div>
                    <div class="song__option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>`
        })
        playlist.innerHTML = htmls.join('')

    },
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },

    handleEvent: function () {
        const _this = this
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause()
            } else {
                //xu li khi click play
                audio.play()
            }

        }
        audio.onplay = function () {
            _this.isPlaying = true
            playerBody.classList.add('playing')
            songThumbPlayAnimate.play()
        }
        audio.onpause = function () {
            _this.isPlaying = false

            playerBody.classList.remove('playing')
            songThumbPlayAnimate.pause()

        }
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
        }
        progress.onchange = function (e) {
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime
        }



        // xu li anh bai hat dang phat quay/dung
        const songThumbPlayAnimate = songThumbPlay.animate([
            {
                transform: 'rotate(360deg)'
            },
        ], {
            duration: 10000,
            iterations: Infinity
        })
        songThumbPlayAnimate.pause()

        // khi nextSong/prevSong
        nextBtnSong.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.nextSong()

            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }
        prevBtnSong.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.prevSong()

            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        // random song 
        randomBtn.onclick = function (e) {
            _this.isRandom = !_this.isRandom
            randomBtn.classList.toggle('active', _this.isRandom)
            if(_this.isRandom && _this.isRepeat) {
                repeatBtn.classList.remove('active')

            }
        }

        // repeat song
        repeatBtn.onclick = function (e) {
            _this.isRepeat = !_this.isRepeat
            repeatBtn.classList.toggle('active', _this.isRepeat)
            if(_this.isRandom && _this.isRepeat) {
                randomBtn.classList.remove('active')

            }
        }

        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play()
            } else {
                nextBtnSong.click()

            }
        }

        // lang nghe hanh dong click vao playlist 
        playlist.onclick= function (e) {
            const songNode = e.target.closest('.song:not(.active)')
            if(songNode || e.target.closest('.option')){
                if(songNode){
                    _this.currentIndex= Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    audio.play()
                    _this.render()
                }
            }
        }
    },
    scrollToActiveSong: function () {
        setTimeout( ()=> {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            })
        }, 500)
    },

    loadCurrentSong: function () {
        songTitlePlay.textContent = this.currentSong.name
        songAutherPlay.textContent = this.currentSong.singer
        songThumbPlay.style.backgroundImage = `url(${this.currentSong.image})`
        audio.src = this.currentSong.path
    },

    nextSong: function () {
        this.currentIndex++
        if (this.currentIndex > this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    prevSong: function () {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },
    playRandomSong: function () {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
    }
    ,
    start: function () {
        //dinh nghia cac thuoc tinh cho object
        this.defineProperties()

        //tai thong tin bai hat dau tien
        this.loadCurrentSong()

        //xu li domevent
        this.handleEvent()

        // hien thi ds bai hat ra giao dien
        this.render()
    },
}
app.start()













