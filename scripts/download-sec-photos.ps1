# Una imagen unica por seccion — solo futbol soccer / Mundiales FIFA
$ua = "GoalDeskSmart/1.0 (educational; laragon local dev)"
$dir = "c:\laragon\www\goaldesk-smart-2026\frontend\public\images\photos"
$pex = "https://images.pexels.com/photos/{0}/pexels-photo-{0}.jpeg?auto=compress&cs=tinysrgb&w=1600"

if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }

# Wikimedia: partidos Copa Mundial 2018 + Azteca (soccer, no NFL)
$wiki = [ordered]@{
  'sec-hero.jpg' = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Luzhniki_Stadium%2C_2018_FIFA_World_Cup.jpg/1920px-Luzhniki_Stadium%2C_2018_FIFA_World_Cup.jpg'
  'sec-football-hub.jpg' = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Kazan_Arena%2C_2018_FIFA_World_Cup.jpg/1920px-Kazan_Arena%2C_2018_FIFA_World_Cup.jpg'
  'sec-feat-box.jpg' = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Volgograd_Arena%2C_2018_FIFA_World_Cup.jpg/1280px-Volgograd_Arena%2C_2018_FIFA_World_Cup.jpg'
  'sec-mundial-resumen.jpg' = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Spartak_Stadium%2C_2018_FIFA_World_Cup.jpg/1920px-Spartak_Stadium%2C_2018_FIFA_World_Cup.jpg'
  'sec-mundial-sedes.jpg' = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Nizhny_Novgorod_Stadium%2C_2018_FIFA_World_Cup.jpg/1920px-Nizhny_Novgorod_Stadium%2C_2018_FIFA_World_Cup.jpg'
  'sec-qr.jpg' = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Spartak_Stadium%2C_2018_FIFA_World_Cup.jpg/1280px-Spartak_Stadium%2C_2018_FIFA_World_Cup.jpg'
  'sec-stadium-mx.jpg' = 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Estadio_Azteca.jpg'
  'sec-stadium-us.jpg' = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Luzhniki_Stadium%2C_2018_FIFA_World_Cup.jpg/1280px-Luzhniki_Stadium%2C_2018_FIFA_World_Cup.jpg'
}

# Pexels: cada ID aparece UNA sola vez
$pexMap = [ordered]@{
  'sec-product-hero.jpg' = 1618261
  'sec-product.jpg' = 1279330
  'sec-model-classic.jpg' = 1692118
  'sec-hero-accent.jpg' = 13241582
  'sec-countdown.jpg' = 1884574
  'sec-fans.jpg' = 35795144
  'sec-north-america.jpg' = 28948295
  'sec-customizer.jpg' = 1526996
  'sec-model-pro.jpg' = 274422
  'sec-mundial-equipos.jpg' = 15644520
  'sec-feat-phone.jpg' = 30552971
  'sec-model-elite.jpg' = 30553008
  'sec-mundial-fechas.jpg' = 399187
  'sec-mundial-historia.jpg' = 15926254
  'sec-stadium-ca.jpg' = 31753425
}

# Unsplash: slots extra (soccer explícito)
$unsplash = [ordered]@{
  'sec-trophy.jpg' = 'https://unsplash.com/photos/AmhdN68wjPc/download?force=true&w=1600'
  'sec-feat-ball.jpg' = 'https://unsplash.com/photos/NpELykTsRl8/download?force=true&w=1600'
  'sec-feat-palette.jpg' = 'https://unsplash.com/photos/ozGoDlCgXvM/download?force=true&w=1600'
  'sec-mundial-formato.jpg' = 'https://unsplash.com/photos/NpELykTsRl8/download?force=true&w=1400'
  'sec-mundial-debut.jpg' = 'https://unsplash.com/photos/WqZwkrBuZIE/download?force=true&w=1600'
  'sec-mundial-curiosidad.jpg' = 'https://unsplash.com/photos/ozGoDlCgXvM/download?force=true&w=1500'
}

foreach ($k in $wiki.Keys) {
  Start-Sleep -Milliseconds 2000
  $out = Join-Path $dir $k
  curl.exe -fsSL -H "User-Agent: $ua" -L -o $out $wiki[$k]
  if ($LASTEXITCODE -ne 0) { Write-Host "FAIL wiki $k" }
}

foreach ($k in $pexMap.Keys) {
  $out = Join-Path $dir $k
  curl.exe -fsSL -L -o $out ($pex -f $pexMap[$k])
  if ($LASTEXITCODE -ne 0) { Write-Host "FAIL pex $k id=$($pexMap[$k])" }
}

foreach ($k in $unsplash.Keys) {
  $out = Join-Path $dir $k
  curl.exe -fsSL -L -o $out $unsplash[$k]
  if ($LASTEXITCODE -ne 0) { Write-Host "FAIL uns $k" }
}

Write-Host "`nArchivos: $((Get-ChildItem $dir -Filter 'sec-*.jpg').Count)"
$dup = Get-ChildItem $dir -Filter 'sec-*.jpg' | ForEach-Object {
  [PSCustomObject]@{ Name = $_.Name; Hash = (Get-FileHash $_.FullName).Hash }
} | Group-Object Hash | Where-Object { $_.Count -gt 1 }
if ($dup) {
  $dup | ForEach-Object { Write-Host "DUPLICATE: $(($_.Group.Name) -join ', ')" }
  exit 1
}
Write-Host "OK: todas las imagenes son unicas."
