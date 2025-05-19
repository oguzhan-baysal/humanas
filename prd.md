Kullanıcı Oturum Tahmin Sistemi - Ürün Gereksinim Dokümanı (PRD)
1. Giriş
1.1 Amaç
Bu proje, kullanıcıların geçmiş login verilerini analiz ederek her kullanıcı için bir sonraki olası login zamanını tahmin eden ve bu tahminleri kullanıcı dostu bir arayüzde sunan bir web uygulaması geliştirmeyi amaçlamaktadır.
1.2 Kapsam
Bu uygulama, API üzerinden alınan kullanıcı verilerini işleyecek, çeşitli algoritmalar kullanarak login tahminleri yapacak ve bu tahminleri karşılaştırmalı olarak görselleştirecektir.
1.3 Tanımlar ve Kısaltmalar

API: Application Programming Interface
Login: Kullanıcı oturum açma işlemi
Frontend: Kullanıcı arayüzü
Backend: Sunucu tarafı uygulama mantığı
React: JavaScript tabanlı kullanıcı arayüzü kütüphanesi
nodejs, express.js: Sunucu taraflı betik dili

2. Sistem Mimarisi
2.1 Genel Mimari
Uygulama iki ana bileşenden oluşacaktır:

nodejs, express.js Backend: Veri çekme, işleme ve tahmin algoritmalarını çalıştırma
React Frontend: Tahminleri görselleştirme ve kullanıcı etkileşimi sağlama

2.2 Teknoloji Yığını

Backend: nodejs, express.js
Frontend: React
Veri Kaynağı: case-test-api.humanas.io
Deployment: GitHub/GitLab (kod paylaşımı), Vercel/ (canlı ortam)

3. Fonksiyonel Gereksinimler
3.1 Veri İşleme

API'den kullanıcı login verilerini çekme ve işleme
Login verilerini kullanıcı bazında gruplama
Saat, gün ve tekrar sıklığı örüntülerini analiz etme

3.2 Tahmin Algoritmaları
Her kullanıcı için en az iki farklı algoritma kullanılarak bir sonraki login zamanı tahmin edilecektir:
3.2.1 Algoritma 1: Ortalama Aralık Yöntemi

Ardışık login zamanları arasındaki farkların ortalaması alınarak bir sonraki login tahmin edilecektir.
Formül: Son login zamanı + ortalama login aralığı

3.2.2 Algoritma 2: Gün ve Saat Örüntüsü Analizi

Kullanıcının haftanın hangi günleri ve günün hangi saatlerinde login yaptığı analiz edilecektir.
En sık login yapılan gün ve saat kombinasyonları tespit edilecektir.
Formül: Bir sonraki en olası gün/saat kombinasyonu

3.2.3 Algoritma 3 (Opsiyonel): Hareketli Ortalama

Son N login aralığının hareketli ortalaması alınarak yakın zamandaki değişimlere daha duyarlı bir tahmin yapılacaktır.
Formül: Son login zamanı + son N aralığın hareketli ortalaması

3.2.4 Algoritma 4 (Opsiyonel): Ağırlıklı Gün-Saat Analizi

Gün ve saat örüntülerinin son login'lere daha fazla ağırlık verilerek analizi

3.3 Frontend Görselleştirme

Kullanıcıların listesini görüntüleme
Her kullanıcı için:

Son login zamanı
Her algoritma için tahmin edilen bir sonraki login zamanı
Tahminlerin karşılaştırmalı tablosu
(Opsiyonel) Tahmin güvenilirlik skorları



3.4 Kullanıcı Etkileşimi

Kullanıcı seçme/filtreleme
(Opsiyonel) Tahmin algoritmaları arasında geçiş yapabilme
(Opsiyonel) Zaman dilimi ayarlama

4. Teknik Spesifikasyonlar
4.1 API Entegrasyonu

Endpoint: case-test-api.humanas.io
Veri Formatı: JSON
Veri Yapısı:
json{
  "id": "user_1",
  "name": "Ahmet",
  "logins": [
    "2025-04-01T08:12:00Z",
    "2025-04-02T08:05:00Z",
    "2025-04-03T08:10:00Z",
    ...
  ]
}


4.2 Backend Gereksinimleri

nodejs, express.js
RESTful API endpointleri:

/api/users: Tüm kullanıcıları getir
/api/users/{id}: Belirli bir kullanıcının detaylarını getir
/api/predictions: Tüm kullanıcılar için tahminleri getir
/api/predictions/{id}: Belirli bir kullanıcı için tahminleri getir



4.3 Frontend Gereksinimleri

React en kararlı sürümü
Responsive tasarım (mobil ve masaüstü uyumlu)
Minimum komponentler:

UserList: Kullanıcıların listesi
UserDetails: Seçilen kullanıcının detayları
PredictionTable: Algoritmaların tahminlerini karşılaştıran tablo
(Opsiyonel) PredictionChart: Tahminleri görselleştiren grafik



5. Uygulama Akışı
5.1 Veri Akışı

Uygulama başladığında API'den kullanıcı verileri çekilir
Backend'de veriler işlenir ve tahmin algoritmaları çalıştırılır
Tahmin sonuçları frontend'e gönderilir
Frontend tahminleri görselleştirir

5.2 Kullanıcı Akışı

Kullanıcı uygulamayı açar
Sistem tüm kullanıcıları ve tahminleri gösterir
Kullanıcı isteğe bağlı olarak belirli bir kullanıcıyı seçebilir
Sistem seçilen kullanıcının detaylı tahmin bilgilerini gösterir

6. Performans Gereksinimleri

API çağrıları 3 saniye içinde tamamlanmalıdır
Tahmin algoritmaları 5 saniye içinde sonuç üretmelidir
Sayfa yükleme süresi 2 saniyeden az olmalıdır

7. Güvenlik Gereksinimleri

API iletişimi HTTPS üzerinden yapılmalıdır
Input sanitization uygulanmalıdır
(Opsiyonel) API rate limiting

8. Test Stratejisi

Birim testleri: Algoritmaların doğruluğu için
Entegrasyon testleri: API entegrasyonu için
UI testleri: Kullanıcı arayüzü için

9. Dağıtım (Deployment) Planı

Kod GitHub/GitLab reposunda tutulacak
Backend Heroku veya benzeri bir platformda host edilecek
Frontend Vercel, Netlify veya benzeri bir platformda host edilecek
README dosyasında kurulum ve çalıştırma talimatları detaylandırılacak



11. Teslim Edilecekler

Tüm kaynak kodunu içeren GitHub/GitLab repo linki
Çalışan uygulamanın deploy edilmiş versiyonunun linki
Kurulum ve çalıştırma talimatlarını içeren README dosyası
(Opsiyonel) Algoritma performans raporu

12. Kabul Kriterleri

En az iki farklı tahmin algoritmasının uygulanmış olması
Algoritmalardan en az birinin %70 üzeri doğruluk oranı sağlaması
Frontend'in tüm gereksinimleri karşılaması
Kodun temiz, okunabilir ve iyi belgelenmiş olması
Uygulamanın belirtilen platformlardan birinde başarıyla deploy edilmiş olması