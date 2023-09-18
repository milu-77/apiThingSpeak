function promedio(array) {
    let promedio = 0;
    array.forEach((element) => {
      promedio += element;
    });
  
    return promedio / array.length;
  }
  function max(array) {
    return Math.max(...array);
  }
  function min(array) {
    return Math.min(...array);
  }
  
  function calcularDispersión(datos) {
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
  
    return dispersion;
  }