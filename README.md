#  Amalga
Amalga 2021 yılında GMTK Game Jam yarışmasında ilk %10 a girmeyi başaran Unity teknolojileri kullanılarak geliştirilen 2 boyutlu arena oyunudur. Oyuncu, yön tuşlarıyla kontrol ettiği karekteriyle düşman mermilerinden kaçmaya çalışır, vurduğu düşmanları da toplayarak boyut ve güç kazanır.

Oyunun ismi: Amalga

Orjinal oyunun linki: https://waytoomuchrice.itch.io/amalga

![image](https://github.com/user-attachments/assets/530435d6-5b38-439a-820b-d37bef93011a)


Amacımız Unity teknolojisi ile geliştirilen bu oyunu HTML5, JS ve canvas ile temel mekaniğine uygun olarak tekrardan kodlamak.

İşte projemizden bazı kesitler;

Öldürülen düşmanların bazıları müttefiğe dönüşebilir; 
![image](https://github.com/user-attachments/assets/c6bebbeb-e1b8-45a4-a834-001376a21241)

Eğer oyuncu yeni müttefiklerine dokunursa müttefikler oyuncuya katılır ve onunla birlikte savaşır;
![image](https://github.com/user-attachments/assets/95b9d17c-1c53-49f1-94a6-baa9fcc366c9)

Oyun, kullanıcıya her yeni dalgada artan zorluk seviyesi ve zamanla ortaya çıkan kırmızı ölüm bölgeleri (Red Zone) ile mücadele sunar;

![image](https://github.com/user-attachments/assets/3b137f2b-40ea-458c-a562-fd9380298454)

Arena içerisine belirli aralıklarla gelen bu tehlikeli bölgeler, oyuncunun stratejik olarak hareket etmesini zorunlu kılar.

**Not**: Orjinal oyunda redzone tarzı bir mekanik içermiyor. Orjinallik açısından eklenmiştir.

##  Kurulum ve Çalıştırma

Amalga'yı kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyebilirsiniz:

1.  Bu repoyu klonlayın:

    ```bash
    git clone [https://github.com/kullanici_adiniz/amalga.git](https://github.com/kullanici_adiniz/amalga.git)
    cd amalga
    ```

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

**Yazar:** Ali Doran

**Youtube Oynanış Linki:** https://youtu.be/e1yysvxHmRk
   
>  Proje tamamen HTML,CSS ,JavaScript ve canvas ile  yazılmıştır.
