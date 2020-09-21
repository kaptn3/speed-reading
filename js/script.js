var app = new Vue({
  el: '#app',
  data() {
    return {
      text: '',
      isRun: false,
      currentWord: null,
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
    }
  },
  mounted() {
    const t = this;
    document.body.addEventListener('keyup', (e) => {
      if (e.keyCode == 32 && t.isRun) {
        t.pauseHandle();
      }
    });
  },
  methods: {
    reset() {
      this.text = '';
      this.isRun = false;
      this.currentWord = null;
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
          this.currentWord = this.wordArray[this.indexOfArray];
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