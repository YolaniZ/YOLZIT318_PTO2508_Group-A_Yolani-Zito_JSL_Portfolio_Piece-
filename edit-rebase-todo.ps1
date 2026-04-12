param([string]$path)
(Get-Content -Raw $path) -replace '^pick 51d2ea8','drop 51d2ea8' -replace '^pick 5998119','drop 5998119' | Set-Content -LiteralPath $path
