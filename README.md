# Kullanıcı Oturum Tahmin Sistemi

Bu proje, kullanıcıların geçmiş login verilerini analiz ederek bir sonraki olası login zamanını tahmin eden ve bu tahminleri kullanıcı dostu bir arayüzde sunan bir web uygulamasıdır.

## Proje Mimarisi
- **Backend:** Node.js, Express.js (Render.com üzerinde host)
- **Frontend:** Next.js (React) (Vercel üzerinde host)
- **Veri Kaynağı:** case-test-api.humanas.io

## Özellikler
- API'den kullanıcı login verilerini çekme ve işleme
- Kullanıcı bazında login örüntülerini analiz etme
- En az iki farklı algoritma ile login tahmini
- Tahminlerin karşılaştırmalı tablo ve grafik ile görselleştirilmesi
- Kullanıcı seçimi ve detaylı tahmin görüntüleme

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

## Deploy
- **Backend:** Render.com üzerinden, root directory olarak `backend` seçilerek deploy edilir.
- **Frontend:** Vercel üzerinden, root directory olarak `frontend` seçilerek deploy edilir.
- Environment variable olarak `NEXT_PUBLIC_API_URL` tanımlanmalıdır.

## Kullanım
- Uygulama açıldığında tüm kullanıcılar ve tahminler listelenir.
- Kullanıcı seçildiğinde, ilgili tahminler ve grafik detaylı şekilde görüntülenir.

## Katkı ve Lisans
- Katkı yapmak için PR gönderebilirsiniz.
- MIT Lisansı ile lisanslanmıştır.

---
Daha fazla bilgi için `prd.md` dosyasını inceleyebilirsiniz. 