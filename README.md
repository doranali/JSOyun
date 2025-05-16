#  Amalga

Amalga, HTML5 ve JavaScript teknolojileri kullanılarak geliştirilen 2 boyutlu bir arena savunma oyunudur. Oyuncu, yön tuşlarıyla kontrol ettiği bir tankı kullanarak düşmanlardan kaçmak ve onlara ateş ederek hayatta kalmaya çalışır.

Öldürülen düşmanların bazıları müttefiğe dönüşebilir; 
![image](https://github.com/user-attachments/assets/c6bebbeb-e1b8-45a4-a834-001376a21241)

Eğer oyuncu yeni müttefiklerine dokunursa müttefikler oyuncuya katılır ve onunla birlikte savaşır;
![image](https://github.com/user-attachments/assets/95b9d17c-1c53-49f1-94a6-baa9fcc366c9)

Oyun, kullanıcıya her yeni dalgada artan zorluk seviyesi ve zamanla ortaya çıkan kırmızı ölüm bölgeleri (Red Zone) ile mücadele sunar;

![image](https://github.com/user-attachments/assets/3b137f2b-40ea-458c-a562-fd9380298454)

Arena içerisine belirli aralıklarla gelen bu tehlikeli bölgeler, oyuncunun stratejik hareket etmesini zorunlu kılar.

Amalga, popüler bir "game jam" oyunundan esinlenilerek, özgün mekaniklerle ve görsellerle yeniden tasarlanmıştır. Hazır oyun kütüphanelerinden hiçbirine yer verilmemiştir.

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
*  **JavaScript **: Oyun mantığı, kullanıcı etkileşimleri, düşman yapay zekâsı, ses kontrolü ve oyun döngüsünün yönetimi için ana programlama dili olarak kullanılmıştır.
*  **Görsel Varlıklar (Assets)**: Oyuncu ve düşman tank görselleri PNG formatında https://hive.blog/utopian-io/@granturismo89/tank-design-for-2d-tanks sitesinden alınmıştır.

>  Proje tamamen HTML,CSS ,JavaScript ve canvas ile  yazılmıştır.
