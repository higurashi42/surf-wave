const apiKey = "72cbd248-6883-11f0-bed1-0242ac130006-72cbd2de-6883-11f0-bed1-0242ac130006";

function searchWave() {
  const location = document.getElementById("locationInput").value;

  fetch(`https://api.stormglass.io/v2/weather/point?lat=35.0&lng=139.0&params=waveHeight,windSpeed&source=noaa`, {
    headers: {
      'Authorization': apiKey
    }
  })
  .then(response => response.json())
  .then(data => {
    const wave = data.hours[0].waveHeight.noaa;
    const wind = data.hours[0].windSpeed.noaa;
    document.getElementById("wave-result").innerHTML = 
      `<strong>${location}</strong> の波情報：<br>🌊 波の高さ：${wave} m<br>💨 風速：${wind} m/s`;
  })
  .catch(error => {
    document.getElementById("wave-result").textContent = "取得に失敗しました";
    console.error(error);
  });
}
