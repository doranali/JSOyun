#  Amalga
Amalga 2021 yılında GMTK Game Jam yarışmasında ilk %10 a girmeyi başaran Unity teknolojileri kullanılarak geliştirilen 2 boyutlu arena oyunudur. Oyuncu, yön tuşlarıyla kontrol ettiği karekteriyle düşman mermilerinden kaçmaya çalışır, vurduğu düşmanları da toplayarak boyut ve güç kazanır.

Oyunun ismi: Amalga

Orjinal oyunun linki: https://waytoomuchrice.itch.io/amalga

![image](https://github.com/user-attachments/assets/530435d6-5b38-439a-820b-d37bef93011a)


Amacımız Unity teknolojisi ile geliştirilen bu oyunu HTML5, JS ve canvas ile temel mekaniğine uygun olarak tekrardan kodlamak.

İşte projemizden bazı kesitler;

Öldürülen düşmanların bazıları müttefiğe dönüşebilir; 

![image](https://github.com/user-attachments/assets/0a43a3df-ea48-43dc-8a6c-a60c6eb1a799)


Eğer oyuncu yeni müttefiklerine dokunursa müttefikler oyuncuya katılır ve onunla birlikte savaşır;

![image](https://github.com/user-attachments/assets/f1e58c6c-2abf-485c-ba40-1bfc393f7397)


Oyun, kullanıcıya her yeni dalgada artan zorluk seviyesi ve zamanla ortaya çıkan kırmızı ölüm bölgeleri (Red Zone) ile mücadele sunar;

![image](https://github.com/user-attachments/assets/1405de0c-e40f-48c3-bfa0-c7759150835f)


Arena içerisine belirli aralıklarla gelen bu tehlikeli bölgeler, oyuncunun stratejik olarak hareket etmesini zorunlu kılar.

**Not**: Orjinal oyunda redzone tarzı bir mekanik içermiyor. Orjinallik açısından eklenmiştir.

##  Kurulum ve Çalıştırma

Bu oyunu kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyebilirsiniz:

### 1. Bu repoyu klonlayın:

   ```bash
git clone https://github.com/doranali/doranali.github.io.git
cd doranali.github.io/JSOyun
```
Veya doğrudan GitHub üzerinden ZIP olarak indirin:
https://github.com/doranali/doranali.github.io/archive/refs/heads/main.zip

2.  Gerekli dosyaların olduğundan emin olun:
    * `index.html`
    * `style.css`
    * `oyun.js`
    * `/img/` klasörü (gerekli görseller burada)
    * `/sounds/` klasörü (oyun müzikleri ve efektler burada)

3.  Tarayıcıda açın:
    Projeyi çalıştırmak için bir web sunucusuna ihtiyacınız yoktur.

    Sadece `index.html` dosyasına çift tıklayarak tarayıcıda açmanız yeterlidir.

    Tüm modern tarayıcılarla uyumludur (Chrome, Firefox, Edge).

 #  Kullanılan Teknolojiler

Bu proje aşağıdaki teknolojiler ve araçlar kullanılarak geliştirilmiştir:

*  **HTML5 Canvas API**: Oyun sahnesinin çizilmesi ve tüm grafiklerin işlenmesi için kullanılmıştır.
*  **JavaScript**: Oyun mantığı, kullanıcı etkileşimleri, düşman yapay zekâsı, ses kontrolü ve oyun döngüsünün yönetimi için ana programlama dili olarak kullanılmıştır.
*  **Görsel Varlıklar (Assets)**: Oyuncu ve düşman tank görselleri PNG formatında https://hive.blog/utopian-io/@granturismo89/tank-design-for-2d-tanks sitesinden alınmıştır.
*  **Ses ve Efektler**: Oyun içerisinde yer alan ana oyun sesi, düşman vurma efekti ve oyun bitme sesleri https://pixabay.com/tr/sound-effects/search/oyun/ sitesinden alınmıştır.
*  **Kullanılan Yapay Zeka Araçları:** Bu proje kodlanmasında yapay zeka aracı olarak ChatGPT den yardım alınmıştır. AI.md dosyasında bulunan link üzerinden kullanılan tüm promtlara ve cevaplara ulaşabilirsiniz.

**Yazar:** Ali Doran

**Youtube Oynanış Linki:** https://youtu.be/E4_vNSAijAU
   
>  Proje tamamen HTML,CSS ,JavaScript ve canvas ile  yazılmıştır.
