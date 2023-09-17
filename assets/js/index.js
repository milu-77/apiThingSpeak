Vue.createApp({
  data() {
    return {
      channelId: "",
      apiKey: "",
      alertChannelId: false,
      public: false,
    };
  },
  created() {},
  methods: {
    login: function () {
      if (!this.public) {
        axios
          .get(
            `https://api.thingspeak.com/channels/${this.channelId}/status/last.json?api_key=${this.apiKey}`
          )
          .then((res) => {
            console.log(res.data);
            if (res.data == -1) {
              cd("Oops!", "ID or KEY  wrong!", "error");
            } else {
              localStorage.setItem("channelId", this.channelId);
              localStorage.setItem("apiKey", this.apiKey);
              window.location.href = "./date.html";
            }
          })
          .catch((err) => {
            console.error(err);
          });
        console.log(
          `https://api.thingspeak.com/channels/${this.channelId}/status/last.json?api_key=${this.apiKey}`
        );
      } else {
        axios
          .get(
            `https://api.thingspeak.com/channels/${this.channelId}/status/last.json`
          )
          .then((res) => {
            console.log(res.data);
            if (res.data == -1) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "ID or KEY  wrong!",
                footer: '<a href="">Why do I have this issue?</a>',
              });
            } else {
              localStorage.setItem("channelId", this.channelId);
              localStorage.setItem("apiKey", this.apiKey);
              window.location.href = "./date.html";
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
  },
  computed: {
    validacion() {
      if (isNaN(this.channelId)) {
        this.alertChannelId = true;
      } else {
        this.alertChannelId = false;
      }
    },
    readPrevies() {
      if (localStorage.getItem("channelId") != null)
        this.channelId = localStorage.getItem("channelId");
      if (localStorage.getItem("apiKey") != null)
        this.apiKey = localStorage.getItem("apiKey");
    },
  },
}).mount("#app");
