async function getWaveInfo(locationName) {
  const apiKey = '72cbd248-6883-11f0-bed1-0242ac130006-72cbd2de-6883-11f0-bed1-0242ac130006';

  // サンプルで湘南の座標（他の海岸にしたい場合はここを変更）
  const latitude = 35.308;
  const longitude = 139.553;

  const params = 'waveHeight,swellHeight,swellDirection,waveDirection';
  const url = `https://api.stormglass.io/v2/weather/point?lat=${latitude}&lng=${longitude}&params=${params}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': apiKey
      }
    });

    if (!response.ok) {
      throw new Error('APIエラー: ' + response.status);
    }

    const jsonData = await response.json();
    const data = jsonData.hours[0]; // 最新の1時間分のデータ

    const info = `
      🌊 波情報（${locationName}）<br>
      波の高さ：${data.waveHeight.jp} m<br>
      うねりの高さ：${data.swellHeight.jp} m<br>
      波の向き：${data.waveDirection.jp}°<br>
      うねりの向き：${data.swellDirection.jp}°
    `;

    document.getElementById('wave-result').innerHTML = info;
  } catch (error) {
    document.getElementById('wave-result').innerHTML = '波情報の取得に失敗しました。';
    console.error(error);
  }
}
