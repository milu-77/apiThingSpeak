Vue.createApp({
  data() {
    return {
      channelId: localStorage.getItem("channelId"),
      apiKey: localStorage.getItem("apiKey"),
      dateStart: "",
      dateEnd: "",
      sensorName: "",
      field: "",
      sensorNumber: 0,
      sensor: [],
      dates: [],
      title: "",
    };
  },
  mounted: function () {
    this.getData();
  },
  methods: {
    getData: function () {
      axios
        .get(
          `https://api.thingspeak.com/channels/${this.channelId}/feeds.json?api_key=${this.apiKey}&results=1`
        )
        .then((res) => {
          this.sensor = this.filterField(res.data);
          this.title = channel = res.data.channel.name;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    filterField: function (data) {
      let fields = [];
      for (let index = 1; index < 9; index++) {
        if (
          data.channel["field" + index] != undefined &&
          data.channel["field" + index] != "Control"
        ) {
          fields.push(data.channel["field" + index]);
        }
      }
      return fields;
    },
    logout: function (date) {
      // let channelId = localStorage.removeItem("channelId")    ;
      //let apiKey = localStorage.removeItem("apiKey");
      window.location.href = "./index.html";
    },
    searchDate: async function () {
      const fecha1 = new Date(this.dateStart);
      const fecha2 = new Date(this.dateEnd);

      if (this.sensorName.trim() === "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Sensor no seleccionado",
          footer:
            '<a href="http://biocorpinveco.com.ar">¿Desea saber más? </a>',
        });
      }
      if (this.dateEnd.trim() === "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Fecha de Final  no seleccionada!",
          footer:
            '<a href="http://biocorpinveco.com.ar">¿Desea saber más? </a>',
        });
      }
      if (this.dateStart.trim() === "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Fecha de Inicio no seleccionada!",
          footer:
            '<a href="http://biocorpinveco.com.ar">¿Desea saber más? </a>',
        });
      }
      if (fecha1 > fecha2) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Fecha de Inicio posterior a la del Final",
          footer:
            '<a href="http://biocorpinveco.com.ar">¿Desea saber más? </a>',
        });
      }
      if (
        this.dateStart.trim() !== "" &&
        this.dateEnd.trim() !== "" &&
        this.sensorName.trim() !== "" &&
        fecha1 <= fecha2
      ) {
        await axios
          .get(
            // https://api.thingspeak.com/channels/9/fields/1.json?&start=2011-11-11%2010:10:10&end=2011-11-11%2011:11:11
            `https://api.thingspeak.com/channels/${this.channelId}/fields/${this.sensorNumber}.json?api_key=${this.apiKey}&?&start=${this.dateStart}%2000:00:10&end=${this.dateEnd}%2023:59:10`
          )
          .then((res) => {
            this.dates = this.searchDateValid(res.data.feeds);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
    searchDateValid: function (dates) {
      return dates.filter(
        (valor) => valor[`field${this.sensorNumber}`] !== null
      );
    },
    convertDate: function (date) {
      const cadenaFecha = date;
      const partes = cadenaFecha.split("T");
      const fechaSinTHora = partes[0];
      return fechaSinTHora;
    },
    convertHours: function (date) {
      let fechaHoraObjeto = new Date(date);
      let horas = fechaHoraObjeto.getUTCHours();
      let minutos = fechaHoraObjeto.getUTCMinutes();
      let segundos = fechaHoraObjeto.getUTCSeconds();
      return `${horas.toString().padStart(2, "0")}:${minutos
        .toString()
        .padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;
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
      return parseFloat(Math.max(...temps)).toFixed(2);
    },
    min: function (array, field) {
      let temps = [];
      array.forEach((element) => {
        temps.push(parseFloat(element[field]));
      });
      return parseFloat(Math.min(...temps)).toFixed(2);
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
    exportToPdf: function () {
      const contentToExport = document.getElementById("export");

      // Crear un nuevo libro de Excel
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.table_to_sheet(contentToExport);
      const header = [
        ["Valor Maximo", "Valor Minimo", "Promedio", "Dispersion"],
      ];
      XLSX.utils.sheet_add_aoa(ws, header, { origin: "E1" });
      var max = this.max(this.dates, this.field) * 1;
      var min = this.min(this.dates, this.field) * 1;
      var promedio = this.average(this.dates, this.field) * 1;
      var dispersion = this.dispersion(this.dates, this.field) * 1;
      const valores = [[max, min, promedio, dispersion]];
      console.log(valores);
      XLSX.utils.sheet_add_aoa(ws, valores, { origin: "E2" });
      // Agregar la hoja al libro
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      // Guardar el libro como un archivo Excel
      XLSX.writeFile(
        wb,
        `${this.sensorName}-${this.dateStart} to ${this.dateEnd}.xlsx`
      );
    },
  },
  computed: {
    monitor() {
      this.sensorNumber = this.sensor.indexOf(this.sensorName) + 1;
      this.field = "field" + this.sensorNumber;
      this.dates = [];
    },
  },
}).mount("#report");
