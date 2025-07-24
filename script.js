async function getWaveInfo(spot) {
  // ★スポットに応じた緯度・経度（ここは後で県や海岸名で切り替える予定）
  const lat = 35.3096;  // 例：湘南
  const lng = 139.5565;

  const apiKey = '72cbd248-6883-11f0-bed1-0242ac130006-72cbd2de-6883-11f0-bed1-0242ac130006';

  try {
    const response = await fetch(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=waveHeight,windSpeed,waterTemperature,windDirection&source=noaa`, {
      headers: {
        'Authorization': apiKey
      }
    });

    const json = await response.json();
    const data = json.hours[0]; // 最新1時間のデータ

    document.getElementById('result').innerHTML = `
      🌊 <strong>波の高さ：</strong>${data.waveHeight.noaa} m<br>
      💨 <strong>風速：</strong>${data.windSpeed.noaa} m/s<br>
      🌬️ <strong>風向き：</strong>${data.windDirection.noaa}°<br>
      🌡️ <strong>水温：</strong>${data.waterTemperature.noaa} ℃
    `;
  } catch (error) {
    console.error('波情報の取得に失敗しました:', error);
    document.getElementById('result').innerText = '波情報の取得に失敗しました。';
  }
}
