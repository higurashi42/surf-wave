const apiKey = "72cbd248-6883-11f0-bed1-0242ac130006-72cbd2de-6883-11f0-bed1-0242ac130006";

function searchWave() {
  const location = document.getElementById("locationInput").value;
  const coords = locationCoords[location];

  if (!coords) {
    document.getElementById("wave-result").textContent = "対応していない地域です。";
    return;
  }

  fetch(`https://api.stormglass.io/v2/weather/point?lat=${coords.lat}&lng=${coords.lng}&params=waveHeight,windSpeed&source=noaa`, {
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
const locationCoords = {
  "湘南": { lat: 35.3, lng: 139.5 },
  "千葉": { lat: 35.6, lng: 140.0 },
  "茨城": { lat: 36.4, lng: 140.6 },
  "静岡": { lat: 34.8, lng: 138.4 },
  "宮崎": { lat: 31.9, lng: 131.4 }
};
