# 🕹️ Amalga

Amalga, HTML5 ve JavaScript teknolojileri kullanılarak geliştirilen 2 boyutlu bir arena savunma oyunudur. Oyuncu, yön tuşlarıyla kontrol ettiği bir tankı kullanarak düşmanlardan kaçmak ve onlara ateş ederek hayatta kalmaya çalışır. Öldürülen düşmanların bazıları müttefiğe dönüşebilir; bu müttefikler oyuncuya katılır ve onunla birlikte savaşır.

Oyun, kullanıcıya her yeni dalgada artan zorluk seviyesi ve zamanla ortaya çıkan kırmızı ölüm bölgeleri (Red Zone) ile mücadele sunar. Arena içerisine belirli aralıklarla gelen bu tehlikeli bölgeler, oyuncunun stratejik hareket etmesini zorunlu kılar.

Amalga, popüler bir "game jam" oyunundan esinlenilerek, özgün mekaniklerle ve görsellerle yeniden tasarlanmıştır. Projede canvas API kullanılarak tüm oyun sahnesi çizilmiş, hazır oyun kütüphanelerinden hiçbirine yer verilmemiştir.

## ⚙️ Kurulum ve Çalıştırma

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
    * `/img/` klasörü (tank görselleri burada)
    * `/sounds/` klasörü (oyun müzikleri ve efektler burada)

3.  Tarayıcıda açın:
    Projeyi çalıştırmak için bir web sunucusuna ihtiyacınız yoktur.

    Sadece `index.html` dosyasına çift tıklayarak tarayıcıda açmanız yeterlidir.

    Tüm modern tarayıcılarla uyumludur (Chrome, Firefox, Edge).
    ## ⚙️ Kullanılan Teknolojiler

Bu proje aşağıdaki teknolojiler ve araçlar kullanılarak geliştirilmiştir:

* 🎨 **HTML5 Canvas API**: Oyun sahnesinin çizilmesi ve tüm grafiklerin işlenmesi için kullanılmıştır.
* 🧠 **JavaScript (Vanilla JS)**: Oyun mantığı, kullanıcı etkileşimleri, düşman yapay zekâsı, ses kontrolü ve oyun döngüsünün yönetimi için ana programlama dili olarak kullanılmıştır.
* 🎧 **Web Audio API**: Oyun içi ses efektleri ve müzik kontrolü bu API yardımıyla gerçekleştirilmiştir.
* 🖼️ **Görsel Varlıklar (Assets)**: Oyuncu ve düşman tank görselleri PNG formatında özel olarak tasarlanmış veya açık kaynaklı olarak edinilmiştir.

> ❌ Bu projede hazır oyun motorları (Phaser, Three.js, Pixi.js vb.) kesinlikle kullanılmamıştır.
> 🧩 Proje tamamen saf JavaScript ve canvas ile sıfırdan yazılmıştır.
