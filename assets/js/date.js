Vue.createApp({
  data() {
    return {
      channelId: localStorage.getItem("channelId"),
      apiKey: localStorage.getItem("apiKey"),
      title: "",
      dates: [],
      channel: [],
      field1: [],
      field2: [],
      field3: [],
      field4: [],
      field5: [],
      field6: [],
      field7: [],
      field8: [],
      averages: [],
      maxs: [],
      mins: [],
      dispersions: [],
    };
  },
  created: function () {
    setTimeout(() => {
      location.reload();
    }, 600000); //10 minutes
  },
  mounted: function () {
    this.getData();
  },
  updated: function () {
    this.drawGraf(this.field1, "id1", 0, "field1");
    this.drawGraf(this.field2, "id2", 1, "field2");
    this.drawGraf(this.field3, "id3", 2, "field3");
    this.drawGraf(this.field4, "id4", 3, "field4");
    this.drawGraf(this.field5, "id5", 4, "field5");
    this.drawGraf(this.field6, "id6", 5, "field6");
    this.drawGraf(this.field7, "id7", 6, "field7");
    this.drawGraf(this.field8, "id8", 7, "field8");
  },
  methods: {
    getData: function () {
      axios
        .get(
          `https://api.thingspeak.com/channels/${this.channelId}/feeds.json?api_key=${this.apiKey}&results=100`
        )
        .then((res) => {
          this.dates = res.data.feeds;
          this.channel = res.data.channel;
          this.title = channel = res.data.channel.name;
          this.field1 = this.dates.filter(
            (elements) => elements.field1 != null
          );
          this.field2 = this.dates.filter(
            (elements) => elements.field2 != null
          );
          this.field3 = this.dates.filter(
            (elements) => elements.field3 != null
          );
          this.field4 = this.dates.filter(
            (elements) => elements.field4 != null
          );
          this.field5 = this.dates.filter(
            (elements) => elements.field5 != null
          );
          this.field6 = this.dates.filter(
            (elements) => elements.field6 != null
          );
          this.field7 = this.dates.filter(
            (elements) => elements.field7 != null
          );
          this.field8 = this.dates.filter(
            (elements) => elements.field8 != null
          );
          this.calculation();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    calculation: function () {
      this.averages.push(this.average(this.field1, "field1"));
      this.averages.push(this.average(this.field2, "field2"));
      this.averages.push(this.average(this.field3, "field3"));
      this.averages.push(this.average(this.field4, "field4"));
      this.averages.push(this.average(this.field5, "field5"));
      this.averages.push(this.average(this.field6, "field6"));
      this.averages.push(this.average(this.field7, "field7"));
      this.averages.push(this.average(this.field8, "field8"));
      //________________________________________________________________
      this.maxs.push(this.max(this.field1, "field1"));
      this.maxs.push(this.max(this.field2, "field2"));
      this.maxs.push(this.max(this.field3, "field3"));
      this.maxs.push(this.max(this.field4, "field4"));
      this.maxs.push(this.max(this.field5, "field5"));
      this.maxs.push(this.max(this.field6, "field6"));
      this.maxs.push(this.max(this.field7, "field7"));
      this.maxs.push(this.max(this.field8, "field8"));
      //________________________________________________________________
      this.mins.push(this.min(this.field1, "field1"));
      this.mins.push(this.min(this.field2, "field2"));
      this.mins.push(this.min(this.field3, "field3"));
      this.mins.push(this.min(this.field4, "field4"));
      this.mins.push(this.min(this.field5, "field5"));
      this.mins.push(this.min(this.field6, "field6"));
      this.mins.push(this.min(this.field7, "field7"));
      this.mins.push(this.min(this.field8, "field8"));
      //________________________________________________________________
      this.dispersions.push(this.dispersion(this.field1, "field1"));
      this.dispersions.push(this.dispersion(this.field2, "field2"));
      this.dispersions.push(this.dispersion(this.field3, "field3"));
      this.dispersions.push(this.dispersion(this.field4, "field4"));
      this.dispersions.push(this.dispersion(this.field5, "field5"));
      this.dispersions.push(this.dispersion(this.field6, "field6"));
      this.dispersions.push(this.dispersion(this.field7, "field7"));
      this.dispersions.push(this.dispersion(this.field8, "field8"));
    },
    average: function (array, field) {
      let promedio = 0;
      array.forEach((element) => {
        promedio += parseFloat(element[field]);
      });
      return parseFloat((promedio / array.length).toFixed(2));
    },

    max: function (array, field) {
      let temps = [];
      array.forEach((element) => {
        temps.push(parseFloat(element[field]));
      });
      return parseFloat(Math.max(...temps));
    },
    min: function (array, field) {
      let temps = [];
      array.forEach((element) => {
        temps.push(parseFloat(element[field]));
      });
      return parseFloat(Math.min(...temps));
    },
    dispersion: function (array, field) {
      let datos = [];
      array.forEach((element) => {
        datos.push(parseFloat(element[field]));
      });
      // Calcular la media de los datos
      let sum = 0;
      for (let i = 0; i < datos.length; i++) {
        sum += datos[i];
      }
      const media = sum / datos.length;

      // Calcular la suma de los cuadrados de las diferencias con la media
      let sumCuadrados = 0;
      for (let i = 0; i < datos.length; i++) {
        sumCuadrados += (datos[i] - media) ** 2;
      }

      // Calcular la dispersión
      const dispersion = Math.sqrt(sumCuadrados / datos.length);

      return dispersion.toFixed(2);
    },
    logout: function () {
      // let channelId = localStorage.removeItem("channelId")    ;
      //let apiKey = localStorage.removeItem("apiKey");
      window.location.href = "./index.html";
    },
    drawGraf: function (field1, chart, num, field) {
      if (document.getElementById(chart) != null) {
        let ctx = document.getElementById(chart).getContext("2d");

        let myChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: [
              this.formatDate(field1[field1.length - 10].created_at),
              this.formatDate(field1[field1.length - 9].created_at),
              this.formatDate(field1[field1.length - 8].created_at),
              this.formatDate(field1[field1.length - 7].created_at),
              this.formatDate(field1[field1.length - 6].created_at),
              this.formatDate(field1[field1.length - 5].created_at),
              this.formatDate(field1[field1.length - 3].created_at),
              this.formatDate(field1[field1.length - 2].created_at),
              this.formatDate(field1[field1.length - 1].created_at),
            ],
            datasets: [
              {
                label: "Ultimas Mediciones ",
                data: [
                  field1[field1.length - 10][field],
                  field1[field1.length - 9][field],
                  field1[field1.length - 8][field],
                  field1[field1.length - 7][field],
                  field1[field1.length - 6][field],
                  field1[field1.length - 5][field],
                  field1[field1.length - 4][field],
                  field1[field1.length - 3][field],
                  field1[field1.length - 2][field],
                  field1[field1.length - 1][field],
                ],
                backgroundColor: "rgba(13,202,240,0.1)",
                borderColor: "rgba(54, 162, 235, 1)", // Color del borde
                borderWidth: 1, // Ancho del borde
              },
            ],
          },
          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    min: parseInt(this.mins[num]) - 1,
                    max: parseInt(this.maxs[num]) + 1,
                  },
                },
              ],
            },
          },
        });
      }
    },
    formatDate: function (date) {
      return new Date(date).toLocaleTimeString();
    },
    handleCardBodyClick: function (num) {
      //continuar de aca generar un informe del ultimo dia
      localStorage.setItem("channelNumber", num);
      window.location.href = `./report.html?sensor= ${num}`;
    },
  },
  computed: {},
}).mount("#app");
