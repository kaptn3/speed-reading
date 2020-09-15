var app = new Vue({
  el: '#app',
  data() {
    return {
      text: null,
      isRun: false,
      currentWord: null,
      wordArray: [],
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
    }
  },
  methods: {
    reset() {
      this.text = null;
      this.isRun = false;
      this.currentWord = null;
      this.wordArray = [];
      this.interval = null;
      this.indexOfArray = 0;
      this.isPause = false;
      this.isEnd = false;
    },
    start() {
      this.isRun = true;
      this.wordArray = this.text.split(' ');
      this.indexOfArray = 0;
      this.run();
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