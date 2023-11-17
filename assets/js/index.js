Vue.createApp({
  data() {
    return {
      channelId: "",
      apiKey: "",
      unitID: "",
      pass: "",
      user: "",
      responseData: "",
      public: false,
      alertChannelId: false,
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
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "ID or KEY  equivocado!",
                footer:
                  '<a href="http://biocorpinveco.com.ar">¿Desea saber más? </a>',
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
        console.log(
          `https://api.thingspeak.com/channels/${this.channelId}/status/last.json?api_key=${this.apiKey}`
        );
      } else {
        console.log("GRD");
        Swal.fire({
          icon: "info",
          title: "Proximamente",
          text: "Esta funcion estara habilitada proximamente",
          footer:
            '<a href="http://biocorpinveco.com.ar">¿Desea saber más? </a>',
        });
        // axios
        //   .get(
        //     // `http://m2m.exemys.com.ar/last.direct.php?unitID=${this.unitID}&user=${this.user}&pass=${this.pass}`
        //     `http://m2m.exemys.com.ar/last.direct.php?unitID=739&user=thermofisher&pass=iturri1474`
        //      )
        //   .then((res) => {
        //     console.log(res.data);
        //     if (res.data == -1) {
        //       Swal.fire({
        //         icon: "error",
        //         title: "Oops...",
        //         text: "ID wrong!",
        //         footer: '<a href="">Why do I have this issue?</a>',
        //       });
        //     } else {
        //       localStorage.setItem("channelId", this.channelId);
        //       localStorage.setItem("apiKey", this.apiKey);
        //       window.location.href = "./date.html";
        //     }
        //   })
        //   .catch((err) => {
        //     console.error(err);
        //   });
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
