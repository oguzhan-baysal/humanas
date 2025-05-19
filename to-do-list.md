Kullanıcı Oturum Tahmin Sistemi - Yapılacaklar Listesi
1. Proje Kurulumu ve Temel Yapı

 GitHub/GitLab repository oluşturma
 Backend için Express.js projesini başlatma

 npm init ile proje başlatma
 Express.js kurulumu (npm install express)
 Gerekli diğer dependencies kurulumu (cors, dotenv, axios vb.)
 Temel klasör yapısını oluşturma (controllers, routes, models, services, utils)
 .env dosyası oluşturma ve API URL'ini tanımlama
 Express sunucusunu yapılandırma (app.js / server.js)
 CORS yapılandırması


 Frontend için React projesini başlatma

 create-react-app veya vite ile proje oluşturma
 Gereksiz dosyaları temizleme
 Temel klasör yapısını oluşturma (components, pages, services, utils, hooks, context)
 Genel stil dosyalarını oluşturma
 Responsive tasarım için yapılandırma



2. API Entegrasyonu

 Backend tarafında API entegrasyonu

 API'den veri çekmek için servis yazma
 API'den gelen verileri işleme (parsing)
 Hata yönetimi ve yeniden deneme mekanizması
 Veri önbelleğe alma (caching) stratejisi


 Test amaçlı API çağrılarını yapma ve verileri doğrulama

3. Backend Geliştirme

 RESTful endpoint'leri oluşturma

 /api/users endpoint'i oluşturma
 /api/users/{id} endpoint'i oluşturma
 /api/predictions endpoint'i oluşturma
 /api/predictions/{id} endpoint'i oluşturma


 Tahmin algoritmalarını geliştirme

 Algoritma 1: Ortalama Aralık Yöntemi

 Login zamanları arasındaki farkları hesaplama
 Ortalama aralık hesaplama
 Bir sonraki tahmini hesaplama


 Algoritma 2: Gün ve Saat Örüntüsü Analizi

 Gün ve saat bazında login frekansını hesaplama
 En yüksek olasılıklı bir sonraki gün-saat kombinasyonunu belirleme


 Algoritma 3: Hareketli Ortalama (opsiyonel)

 Son N login aralığını hesaplama
 Hareketli ortalamayı hesaplama


 Algoritma 4: Ağırlıklı Gün-Saat Analizi (opsiyonel)

 Yakın zamanlı login'lere daha fazla ağırlık verme
 Ağırlıklı olasılık hesaplama




 Tahmin güvenilirlik skorlarını hesaplama (opsiyonel)
 Veri işleme optimizasyonu ve cache mekanizması

4. Frontend Geliştirme

 Temel komponentleri oluşturma

 App komponenti
 Layout komponenti (header, main content, footer)
 UserList komponenti
 UserDetails komponenti
 PredictionTable komponenti
 PredictionChart komponenti (opsiyonel)


 Backend ile iletişim için servisler yazma

 API istemcisi oluşturma (axios vb. kullanarak)
 Kullanıcı verilerini getirme servisi
 Tahmin verilerini getirme servisi


 UI geliştirme

 Ana sayfa tasarımı
 Kullanıcı listesi tasarımı
 Karşılaştırmalı tahmin tablosu tasarımı
 Detay görünümü tasarımı
 Responsive tasarım ayarlamaları


 State yönetimi

 Context API veya Redux kurulumu (gerekiyorsa)
 State ve reducer fonksiyonlarını yazma


 Kullanıcı etkileşimleri

 Kullanıcı seçme/filtreleme fonksiyonalitesi
 Algoritma seçme fonksiyonalitesi (opsiyonel)
 Zaman dilimi ayarlama (opsiyonel)



5. Test ve Hata Ayıklama

 Backend testleri

 Birim testleri yazma (Jest vb. kullanarak)
 API entegrasyon testleri
 Algoritma doğruluk testleri


 Frontend testleri

 Komponent testleri (React Testing Library vb. kullanarak)
 UI testleri


 End-to-end testler
 Performans testleri

 Yük testleri
 Sayfa yükleme süreleri


 Hata ayıklama ve iyileştirmeler

 Backend hata ayıklama
 Frontend hata ayıklama
 Performans iyileştirmeleri



6. Dağıtım (Deployment)

 Backend dağıtım

 Heroku veya benzeri platform seçimi
 Deployment konfigürasyonu
 Environment değişkenleri ayarlama
 Backend deployment


 Frontend dağıtım

 Vercel veya benzeri platform seçimi
 Build ve deployment konfigürasyonu
 Environment değişkenleri ayarlama
 Frontend deployment


 İki sistemin entegrasyonunu test etme

7. Dokümantasyon ve Teslim

 README dosyası hazırlama

 Proje açıklaması
 Kurulum talimatları
 Çalıştırma talimatları
 API dokümantasyonu
 Kullanılan teknolojiler


 Algoritma açıklamaları ve performans raporu (opsiyonel)
 Deployment linklerinin hazırlanması
 Tüm kaynak kodlarının gözden geçirilmesi

 Kod temizliği
 Kod standartlarına uygunluk
 Yorum satırları


 Projenin son kontrolü
 Proje kaynaklarının Humanas Community yetkilisine teslim edilmesi

8. İleri Düzey İyileştirmeler (Opsiyonel)

 Kullanıcı deneyimi geliştirmeleri

 Animasyonlar ve geçiş efektleri
 Gelişmiş filtreleme özellikleri
 Gelişmiş görselleştirmeler


 Algoritma performans iyileştirmeleri

 Algoritma doğruluk skorlarının görselleştirilmesi
 Yeni tahmin algoritmalarının eklenmesi


 Backend optimizasyonları

 Veri önbelleğe alma (caching) iyileştirmeleri
 Veritabanı entegrasyonu (gerekiyorsa)


 Güvenlik iyileştirmeleri

 API rate limiting
 İleri düzey input sanitization


 CI/CD pipeline kurulumu
