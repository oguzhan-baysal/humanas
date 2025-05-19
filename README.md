![Image](https://github.com/user-attachments/assets/81ec2b62-3539-4209-9e17-4da015c1b252)




# Kullanıcı Oturum Tahmin Sistemi

## Proje Tanımı
Kullanıcı Oturum Tahmin Sistemi, kullanıcıların geçmiş login verilerini analiz ederek bir sonraki olası login zamanını tahmin eden ve bu tahminleri modern, kullanıcı dostu bir arayüzde sunan tam entegre bir web uygulamasıdır.

## Özellikler
- API'den kullanıcı login verilerini çekme ve işleme
- Kullanıcı bazında login örüntülerini analiz etme
- En az iki farklı algoritma ile login tahmini (Ortalama Aralık, Gün-Saat Örüntüsü, opsiyonel: Hareketli Ortalama, Ağırlıklı Gün-Saat)
- Tahminlerin tablo ve grafik ile görselleştirilmesi
- Kullanıcı seçimi ve detaylı tahmin görüntüleme
- Tam responsive (mobil, tablet, masaüstü)
- Modern ve sade UI/UX (TailwindCSS, Radix, Shadcn)

## Mimarisi
- **Backend:** Node.js, Express.js (Render.com üzerinde host edilir)
- **Frontend:** Next.js (React) (Vercel üzerinde host edilir)
- **Veri Kaynağı:** [case-test-api.humanas.io](https://case-test-api.humanas.io)

## Algoritmalar
- **Ortalama Aralık Yöntemi:** Son loginler arası ortalama süre ile tahmin
- **Gün ve Saat Örüntüsü:** En sık login yapılan gün/saat kombinasyonuna göre tahmin
- **Hareketli Ortalama (opsiyonel):** Son N login aralığının ortalaması
- **Ağırlıklı Gün-Saat (opsiyonel):** Son loginlere daha fazla ağırlık vererek tahmin

## Kurulum
### 1. Backend
```bash
cd backend
npm install
npm run build
npm start
```
- .env dosyasına gerek yoktur. Render.com üzerinde otomatik deploy edilir.

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
- Lokal geliştirme için `frontend/.env` dosyası oluşturun:
  ```
  NEXT_PUBLIC_API_URL=https://humanas-backend.onrender.com
  ```
- Vercel deploy için aynı environment variable'ı Vercel panelinden ekleyin.

## Test
- Backend: `cd backend && npm test`
- Frontend: `cd frontend && npm test`
- Test altyapısı Jest ve React Testing Library ile hazırdır.

## Deploy
- **Backend:** Render.com üzerinden, root directory olarak `backend` seçilerek deploy edilir.
- **Frontend:** Vercel üzerinden, root directory olarak `frontend` seçilerek deploy edilir.
- Environment variable olarak `NEXT_PUBLIC_API_URL` tanımlanmalıdır.

## Kullanım
- Uygulama açıldığında tüm kullanıcılar ve tahminler listelenir.
- Kullanıcı seçildiğinde, ilgili tahminler ve grafik detaylı şekilde görüntülenir.
- Mobilde ve tablette de tam uyumludur.

## Teknik Detaylar
- **Backend API Endpointleri:**
  - `/api/users`: Tüm kullanıcıları getirir
  - `/api/users/{id}`: Belirli kullanıcıyı getirir
  - `/api/predictions`: Tüm kullanıcılar için tahminleri getirir
  - `/api/predictions/{id}`: Belirli kullanıcı için tahminleri getirir
- **Frontend:**
  - `UserList`, `PredictionTable`, `PredictionChart` (opsiyonel) ana bileşenler
  - Tüm stiller TailwindCSS ile yazılmıştır
  - Erişilebilirlik ve modern UX önceliklidir

## Ekran Görüntüsü
> Masaüstü, tablet ve mobilde örnek ekranlar için [Vercel canlı demo linki](https://humanas.vercel.app) üzerinden inceleyebilirsiniz.

## Katkı ve Lisans
- Katkı yapmak için PR gönderebilirsiniz.
- MIT Lisansı ile lisanslanmıştır.

---
Daha fazla bilgi ve gereksinim için `prd.md` dosyasını inceleyebilirsiniz.
