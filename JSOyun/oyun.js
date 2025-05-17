// oyun_ayarlarini burada tanimladik oyunun genel hız,süre ve davraniş ayrlari
const AYAR = {
  GENISLIK: 1200,
  YUKSEKLIK: 800,
  oyuncuHizi: 3,
  mermiHizi: 5,
  oyuncuAtesSuresi: 300,
  muttefikAtesSuresi: 500,
  dusmanAtesSuresi: 2000,
  dusmanHizi: 1.2,
  donusmeSans: 0.4,
  canSayisi: 4,
  raundBaslamaSuresi: 1500,
  kirmiziAlanAralik: 5000,
  kirmiziAlanYaricap: 100,
  kirmiziAlanUyariSuresi: 3000,
  kirmiziAlanTehlikeSuresi: 800
};

// oyun ses dosyalari ve kontrolü 
const SES = {
  aktif: true,
  muzik: new Audio('sounds/bgmusic.wav'),
  oyunSonu: new Audio('sounds/gameover.wav'),
  oldurme: new Audio('sounds/kill.wav')
};
SES.muzik.loop = true;
SES.muzik.volume = 0.5;

function sesCal(tur) {
  if (!SES.aktif) return;
  if (tur === 'muzik') {
    SES.muzik.currentTime = 0;
    SES.muzik.play();
  } else if (SES[tur]) {
    SES[tur].cloneNode().play(); // ayni sesi üst üste oynatabilmek için
  }
}
//tüm sesleri ve müziği durdurma 
function sesleriDurdur() {
  SES.muzik.pause();
  SES.muzik.currentTime = 0;
}

// yardimci_fonksiyonlar
const rastgele = (min, max) => Math.random() * (max - min) + min;
const mesafe = (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1);
const aci = (x1, y1, x2, y2) => Math.atan2(y2 - y1, x2 - x1);
const ekranDisindaMi = o => o.x < -o.r || o.x > AYAR.GENISLIK + o.r || o.y < -o.r || o.y > AYAR.YUKSEKLIK + o.r;

// gorseller , tank göreselleri , mavi oyuncu kirmizi düşman
const gorselTankOyuncu = new Image();
gorselTankOyuncu.src = 'img/tank_green.png';
const gorselTankMavi = new Image();
gorselTankMavi.src = 'img/tank_blue.png';
const gorselTankKirmizi = new Image();
gorselTankKirmizi.src = 'img/tank_red.png';

// global durumları tanımlama .  (oyuncu,düsman,mermi filan)
let oyuncu, mermilerOyuncu, mermilerDusman, dusmanlar, toplayicilar, kirmiziAlanlar;
let zamanOnceki, oyunAcilMi = false, raund = 1, raundBekleme = 0;
let kirmiziAlanSayac = 0;

// DOM dan alinacak elemanlar canvas skor buton gibi
let cizimKutusu, cizimAlani, arayuzYazisi, raundYazisi, arayuz, baslatButon, oyunBittiYazisi, skorTablosu, sesButonu;
let tuslar = {}, fare = { x: AYAR.GENISLIK / 2, y: AYAR.YUKSEKLIK / 2 };

// temel_daire_nesnesi
class Daire {
  constructor(x, y, r, renk) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.renk = renk;
  }
  ciz(cizimAlani) {
    cizimAlani.fillStyle = this.renk;
    cizimAlani.beginPath();
    cizimAlani.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    cizimAlani.fill();
  }
}

// oyuncu_sinifi : davranislari burada
class Oyuncu extends Daire {
  constructor(x, y) {
    super(x, y, 24, 'transparent');
    this.bekleme = 0;
    this.can = AYAR.canSayisi;
    this.muttefikler = [];
  }

  guncelle(dt) {
    if (tuslar.KeyW) this.y -= AYAR.oyuncuHizi;
    if (tuslar.KeyS) this.y += AYAR.oyuncuHizi;
    if (tuslar.KeyA) this.x -= AYAR.oyuncuHizi;
    if (tuslar.KeyD) this.x += AYAR.oyuncuHizi;

    // Ekran disina cikmasini engeller
    this.x = Math.max(this.r, Math.min(AYAR.GENISLIK - this.r, this.x));
    this.y = Math.max(this.r, Math.min(AYAR.YUKSEKLIK - this.r, this.y));

    this.bekleme -= dt;
    if (this.bekleme <= 0) {
      mermilerOyuncu.push(new Mermi(this.x, this.y, fare.x, fare.y, 'dodgerblue'));
      this.bekleme = AYAR.oyuncuAtesSuresi;
    }
  }

  ciz(cizimAlani) {
    const yon = aci(this.x, this.y, fare.x, fare.y);
    cizimAlani.save();
    cizimAlani.translate(this.x, this.y);
    cizimAlani.rotate(yon);
    cizimAlani.drawImage(gorselTankOyuncu, -this.r, -this.r, this.r * 2, this.r * 2);
    cizimAlani.restore();
  }
}

// muttefik_sinifi
class Muttefik {
  constructor(dx, dy) {
    this.dx = dx;
    this.dy = dy;
    this.bekleme = rastgele(0, AYAR.muttefikAtesSuresi);
  }

  guncelle(dt, oyuncu) {
    this.x = oyuncu.x + this.dx;
    this.y = oyuncu.y + this.dy;
    this.bekleme -= dt;
    if (this.bekleme <= 0) {
      mermilerOyuncu.push(new Mermi(this.x, this.y, fare.x, fare.y, 'dodgerblue'));
      this.bekleme = AYAR.muttefikAtesSuresi;
    }
  }
 // tank görsellerini fareye göre döndürme
  ciz(cizimAlani) {
    const yon = aci(this.x, this.y, fare.x, fare.y);
    cizimAlani.save();
    cizimAlani.translate(this.x, this.y);
    cizimAlani.rotate(yon);
    cizimAlani.drawImage(gorselTankMavi, -24, -24, 48, 48);
    cizimAlani.restore();
  }
}

// dusman_sinifi: rastgele yönlerde hareket edip belli sureler oyuncaya ates edecekler
class Dusman extends Daire {
  constructor(x, y) {
    super(x, y, 24, 'transparent');
    const yon = rastgele(0, 2 * Math.PI);
    this.vx = Math.cos(yon) * AYAR.dusmanHizi;
    this.vy = Math.sin(yon) * AYAR.dusmanHizi;
    this.bekleme = rastgele(0, AYAR.dusmanAtesSuresi);
  }
//oyuncunun konumuna göre ateşleme olsun diye guncelleme
  guncelle(dt) {
    this.x += this.vx;
    this.y += this.vy;

    // Kenarlardan seksin diye bu yansima acisi ile
    if ((this.x <= this.r && this.vx < 0) || (this.x >= AYAR.GENISLIK - this.r && this.vx > 0)) this.vx *= -1;
    if ((this.y <= this.r && this.vy < 0) || (this.y >= AYAR.YUKSEKLIK - this.r && this.vy > 0)) this.vy *= -1;

    this.bekleme -= dt;
    if (this.bekleme <= 0) {
      mermilerDusman.push(new Mermi(this.x, this.y, oyuncu.x, oyuncu.y, 'orange'));
      this.bekleme = AYAR.dusmanAtesSuresi;
    }
  }

  ciz(cizimAlani) {
    const yon = aci(this.x, this.y, oyuncu.x, oyuncu.y);
    cizimAlani.save();
    cizimAlani.translate(this.x, this.y);
    cizimAlani.rotate(yon);
    cizimAlani.drawImage(gorselTankKirmizi, -this.r, -this.r, this.r * 2, this.r * 2);
    cizimAlani.restore();
  }
}

// mermi_sinifi
class Mermi extends Daire {
  constructor(x, y, hedefX, hedefY, renk) {
    super(x, y, 4, renk);
    const yon = aci(x, y, hedefX, hedefY);
    this.vx = Math.cos(yon) * AYAR.mermiHizi;
    this.vy = Math.sin(yon) * AYAR.mermiHizi;
  }

  guncelle() {
    this.x += this.vx;
    this.y += this.vy;
  }
}

// toplayici_sinifi : düsmanı vurursak rastgele bizim tarafa gecme
class Toplayici extends Daire {
  constructor(x, y) {
    super(x, y, 24, 'transparent');
  }

  ciz(cizimAlani) {
    cizimAlani.save();
    cizimAlani.translate(this.x, this.y);
    cizimAlani.drawImage(gorselTankMavi, -this.r, -this.r, this.r * 2, this.r * 2);
    cizimAlani.restore();
  }
}

// redzon(kirmizi alan) sinifi
class KirmiziAlan {
  constructor(x, y, r, uyari, tehlike) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.uyari = uyari;
    this.tehlike = tehlike;
    this.sure = uyari + tehlike;
    this.tehlikeliMi = false;
    this.sonHasarZamani = 0;
  }

  guncelle(dt) {
    this.sure -= dt;
    if (!this.tehlikeliMi && this.sure <= this.tehlike) {
      this.tehlikeliMi = true;
    }
  }

  ciz(cizimAlani) {
    const oran = 1 - Math.max(0, Math.min(1, (this.sure - this.tehlike) / this.uyari));
    cizimAlani.fillStyle = `rgba(255, 0, 0, ${oran})`;
    cizimAlani.beginPath();
    cizimAlani.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    cizimAlani.fill();
  }

  silinebilirMi() {
    return this.sure <= 0;
  }
}

// başlangıç veya yeniden başlama icin oyun durumunu sifirlama
function oyunuBaslat() {
  if (SES.aktif) sesCal('muzik');
  arayuz.style.display = 'none';
  oyunBittiYazisi.style.display = 'none';
  baslatButon.textContent = 'Tekrar Oyna';

  oyuncu = new Oyuncu(AYAR.GENISLIK / 2, AYAR.YUKSEKLIK / 2);
  mermilerOyuncu = [];
  mermilerDusman = [];
  dusmanlar = [];
  toplayicilar = [];
  kirmiziAlanlar = [];

  raund = 0;
  kirmiziAlanSayac = 0;

  raunduBaslat();

  zamanOnceki = performance.now();
  oyunAcilMi = true;
  requestAnimationFrame(oyunDongusu);
}

// raund başlatma : her yeni raundda dusmanlar yeniden konumlandirir
function raunduBaslat() {
  raund++;
  raundBekleme = AYAR.raundBaslamaSuresi;
  raundYazisi.textContent = `Raund ${raund}`;
  raundYazisi.style.opacity = 1;
  setTimeout(() => raundYazisi.style.opacity = 0, AYAR.raundBaslamaSuresi);
  dusmanlar = [];

  for (let i = 0; i < 4 + raund * 2; i++) {
    let x, y;
    do {
      x = rastgele(60, AYAR.GENISLIK - 60);
      y = rastgele(60, AYAR.YUKSEKLIK - 60);
    } while (mesafe(x, y, oyuncu.x, oyuncu.y) < 150);
    dusmanlar.push(new Dusman(x, y));
  }
}

// oyun bitir: cani kontrol et 0 olursa oyun biter ve sonuclari göster
function oyunuBitir() {
  if (SES.aktif) sesCal('oyunSonu');
  sesleriDurdur();
  oyunAcilMi = false;
  arayuz.style.display = 'flex';
  oyunBittiYazisi.style.display = 'block';
  oyunBittiYazisi.textContent = 'Oyun Bitti!';

  //skor bilgisi
  const yazi = `
    Skor: ${raund} 
    Kazanilan Muttefik: ${oyuncu.muttefikler.length}
  `;
  skorTablosu.textContent = yazi;
  baslatButon.textContent = 'Tekrar Oyna';
}

// guncelleme_fonksiyonu!! önemli her karede oyuncu ,müttefik,dusman ve mermileri günceller
function guncelle(dt) {
  if (raundBekleme > 0) {
    raundBekleme -= dt;
    return;
  }

  oyuncu.guncelle(dt);
  oyuncu.muttefikler.forEach(m => m.guncelle(dt, oyuncu));
  dusmanlar.forEach(d => d.guncelle(dt));
  mermilerOyuncu.forEach(m => m.guncelle());
  mermilerDusman.forEach(m => m.guncelle());
  kirmiziAlanlar.forEach(k => k.guncelle(dt));

  // belli aralıklarla redzone(kırmızı alan olusturma)
  kirmiziAlanSayac += dt;
  if (kirmiziAlanSayac >= AYAR.kirmiziAlanAralik) {
    kirmiziAlanSayac = 0;
    const x = rastgele(120, AYAR.GENISLIK - 120);
    const y = rastgele(120, AYAR.YUKSEKLIK - 120);
    kirmiziAlanlar.push(new KirmiziAlan(x, y, AYAR.kirmiziAlanYaricap, AYAR.kirmiziAlanUyariSuresi, AYAR.kirmiziAlanTehlikeSuresi));
  }

  // rezdone bitmeden içinden cıkmazsak 1 can gideer
  const simdi = performance.now();
  for (const k of kirmiziAlanlar) {
    if (k.tehlikeliMi && mesafe(oyuncu.x, oyuncu.y, k.x, k.y) < oyuncu.r + k.r) {
      if (simdi - k.sonHasarZamani > 1000) {
        oyuncu.can--;
        k.sonHasarZamani = simdi;
        if (oyuncu.can <= 0) oyunuBitir();
      }
    }
  }

  kirmiziAlanlar = kirmiziAlanlar.filter(k => !k.silinebilirMi());
  mermilerOyuncu = mermilerOyuncu.filter(m => !ekranDisindaMi(m));
  mermilerDusman = mermilerDusman.filter(m => !ekranDisindaMi(m));

  for (let i = mermilerOyuncu.length - 1; i >= 0; i--) {
    const m = mermilerOyuncu[i];
    for (let j = dusmanlar.length - 1; j >= 0; j--) {
      const d = dusmanlar[j];
      if (mesafe(m.x, m.y, d.x, d.y) < m.r + d.r) {
        mermilerOyuncu.splice(i, 1);
        if (Math.random() < AYAR.donusmeSans) {
          toplayicilar.push(new Toplayici(d.x, d.y));
        }
        dusmanlar.splice(j, 1);
        sesCal('oldurme');
        break;
      }
    }
  }

  // oyuncu  toplayiciya değdiğinde yeni müttefik kazanir
  for (let i = toplayicilar.length - 1; i >= 0; i--) {
    if (mesafe(oyuncu.x, oyuncu.y, toplayicilar[i].x, toplayicilar[i].y) < oyuncu.r + toplayicilar[i].r) {
      const dx = toplayicilar[i].x - oyuncu.x;
      const dy = toplayicilar[i].y - oyuncu.y;
      oyuncu.muttefikler.push(new Muttefik(dx, dy));
      toplayicilar.splice(i, 1);
    }
  }

  for (let i = mermilerDusman.length - 1; i >= 0; i--) {
    const m = mermilerDusman[i];
    if (mesafe(m.x, m.y, oyuncu.x, oyuncu.y) < m.r + oyuncu.r) {
      mermilerDusman.splice(i, 1);
      oyuncu.can--;
      if (oyuncu.can <= 0) oyunuBitir();
    }
  }

  for (let i = mermilerDusman.length - 1; i >= 0; i--) {
    const m = mermilerDusman[i];
    for (let j = oyuncu.muttefikler.length - 1; j >= 0; j--) {
      const mut = oyuncu.muttefikler[j];
      if (mesafe(m.x, m.y, mut.x, mut.y) < m.r + 8) {
        mermilerDusman.splice(i, 1);
        oyuncu.muttefikler.splice(j, 1);
        break;
      }
    }
  }

  if (dusmanlar.length === 0 && oyunAcilMi) {
    raunduBaslat();
  }

  arayuzYazisi.textContent = `Can: ${oyuncu.can}\nMuttefik: ${oyuncu.muttefikler.length}\nRaund: ${raund}`;
}

// tüm oyun elemanlarini ekrana cizen fonksiyon
function ciz() {
  cizimAlani.clearRect(0, 0, AYAR.GENISLIK, AYAR.YUKSEKLIK);
  cizimAlani.fillStyle = '#000';
  cizimAlani.fillRect(0, 0, AYAR.GENISLIK, AYAR.YUKSEKLIK);

  kirmiziAlanlar.forEach(k => k.ciz(cizimAlani));
  oyuncu.ciz(cizimAlani);
  oyuncu.muttefikler.forEach(m => m.ciz(cizimAlani));
  dusmanlar.forEach(d => d.ciz(cizimAlani));
  mermilerOyuncu.forEach(m => m.ciz(cizimAlani));
  mermilerDusman.forEach(m => m.ciz(cizimAlani));
  toplayicilar.forEach(t => t.ciz(cizimAlani));

    // HUD bilgilerini canvas üzerine yazmak için
  cizimAlani.fillStyle = "#fff";
  cizimAlani.font = "20px sans-serif";
  cizimAlani.textAlign = "left";
  cizimAlani.textBaseline = "top";
  cizimAlani.fillText(`Can: ${oyuncu.can}  Müttefik: ${oyuncu.muttefikler.length}  Raund: ${raund}`, 20, 20);

}

// her karede guncelle() ve ciz() fonksiyonlarini çağırarak oyun akisini sürdürürüyoruz
function oyunDongusu(zamanSimdi) {
  if (!oyunAcilMi) return;
  const dt = zamanSimdi - zamanOnceki;
  zamanOnceki = zamanSimdi;
  guncelle(dt);
  ciz();
  requestAnimationFrame(oyunDongusu);
}

// DOM dan elemanlar seçilir ve olay dinleyiciler eklenir
document.addEventListener('DOMContentLoaded', () => {
  cizimKutusu = document.getElementById('oyunAlani');
  cizimAlani = cizimKutusu.getContext('2d');
  arayuzYazisi = document.getElementById('arayuz');
  raundYazisi = document.getElementById('raundYazisi');
  arayuz = document.getElementById('bitisEkrani');
  baslatButon = document.getElementById('baslatButon');
  oyunBittiYazisi = document.getElementById('oyunBittiYazisi');
  skorTablosu = document.getElementById('skorTablosu');
  sesButonu = document.getElementById('sesButon');

  tuslar = {};
  fare = { x: AYAR.GENISLIK / 2, y: AYAR.YUKSEKLIK / 2 };

  // klavye kontrolu
  window.addEventListener('keydown', e => tuslar[e.code] = true);
  window.addEventListener('keyup', e => tuslar[e.code] = false);
  
  // fare konumunu takip et
  cizimKutusu.addEventListener('mousemove', e => {
    const sinir = cizimKutusu.getBoundingClientRect();
    fare.x = e.clientX - sinir.left;
    fare.y = e.clientY - sinir.top;
  });

  //ses ac kapa butonuna tıklama
  sesButonu.onclick = () => {
    SES.aktif = !SES.aktif;
    if (!SES.aktif) {
      sesleriDurdur();
      sesButonu.textContent = 'Ses Kapali';
    } else {
      sesCal('muzik');
      sesButonu.textContent = 'Ses Acik';
    }
  };
// baslat butonuna basma
  baslatButon.onclick = oyunuBaslat;
   // canvas'ı ekrana göre yeniden boyutlandır
  function canvasBoyutlariniAyarla() {
    cizimKutusu.width = window.innerWidth;
    cizimKutusu.height = window.innerHeight;
    
    // Oyun ayarlarini da ekran boyutuna uydur
    AYAR.GENISLIK = cizimKutusu.width;
    AYAR.YUKSEKLIK = cizimKutusu.height;

  // Fare konumunu da yeni merkeze çek
  fare.x = AYAR.GENISLIK / 2;
  fare.y = AYAR.YUKSEKLIK / 2;
  }

  canvasBoyutlariniAyarla(); // Sayfa yüklendiğinde ayarla
  window.addEventListener('resize', canvasBoyutlariniAyarla); // Ekran boyutu değişirse yeniden ayarla
});
