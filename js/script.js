var app = new Vue({
  el: '#app',
  data() {
    return {
      text: '',
      isRun: false,
      interval: null,
      speed: 200,
      indexOfArray: 0,
      isPause: false,
      isEnd: false
    };
  },
  computed: {
    seconds() {
      return 1000 / (this.speed / 60); 
    },
    progress() {
      return ((this.indexOfArray) / this.wordArray.length) * 100;
    },
    wordArray() {
      return this.text.split(' ');
    },
    backgroundBtnPause() {
      return this.isPause ? 'img/play.svg'  : 'img/pause.svg';
    },
    currentWord() {
      return this.wordArray[this.indexOfArray] || null;
    }
  },
  mounted() {
    const t = this;
    document.body.addEventListener('keyup', (e) => {
      if (t.isRun) {
        if (e.keyCode === 32) {
          t.pauseHandle();
        } else if (e.keyCode === 37) {
          this.indexOfArray -= 1;
        } else if (e.keyCode === 39) {
          this.indexOfArray += 1;
        }
      }
    });
  },
  methods: {
    reset() {
      this.text = '';
      this.isRun = false;
      this.interval = null;
      this.indexOfArray = 0;
      this.isPause = false;
      this.isEnd = false;
    },
    start() {
      if (this.text.length > 0) {
        this.isRun = true;
        this.indexOfArray = 0;
        this.run();
      }
    },
    run() {
      this.isEnd = false;
      this.interval = setInterval(() => {
        if (this.indexOfArray < this.wordArray.length) {
          this.indexOfArray++;
        } else {
          this.isEnd = true;
          clearInterval(this.interval);
        }
      }, this.seconds);
    },
    pauseHandle() {
      this.isPause = !this.isPause;
      this.isPause ? clearInterval(this.interval) : this.run();
    }
  }
});