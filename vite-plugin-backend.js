// Vite plugin - Backend API'yi dev server ile birlikte çalıştır
import express from 'express';
import fs from 'fs/promises';
import path from 'path';

export default function backendPlugin() {
  return {
    name: 'vite-plugin-backend',
    configureServer(server) {
      const app = express();
      
      app.use(express.json({ limit: '50mb' }));
      app.use(express.urlencoded({ limit: '50mb', extended: true }));

      const publicDir = path.resolve(server.config.root, 'public');

      // JSON dosyasına veri kaydet
      app.post('/api/save-data', async (req, res) => {
        try {
          const { filePath, data } = req.body;
          
          if (!filePath || !filePath.startsWith('/data/')) {
            return res.status(400).json({ error: 'Geçersiz dosya yolu' });
          }
          
          const fullPath = path.join(publicDir, filePath);
          const dir = path.dirname(fullPath);
          
          await fs.mkdir(dir, { recursive: true });
          await fs.writeFile(fullPath, JSON.stringify(data, null, 2), 'utf-8');
          
          console.log(`✅ Kaydedildi: ${filePath}`);
          res.json({ success: true, filePath });
        } catch (error) {
          console.error('Kaydetme hatası:', error);
          res.status(500).json({ error: 'Kaydetme başarısız' });
        }
      });

      // Medya dosyası kaydet
      app.post('/api/save-media', async (req, res) => {
        try {
          const { base64Data, directory, filename } = req.body;
          
          if (!base64Data || !directory || !filename || !directory.startsWith('/media/')) {
            return res.status(400).json({ error: 'Geçersiz parametreler' });
          }
          
          const matches = base64Data.match(/^data:([^;]+);base64,(.+)$/);
          if (!matches) {
            return res.status(400).json({ error: 'Geçersiz base64 formatı' });
          }
          
          const buffer = Buffer.from(matches[2], 'base64');
          const fullDir = path.join(publicDir, directory);
          const fullPath = path.join(fullDir, filename);
          
          await fs.mkdir(fullDir, { recursive: true });
          await fs.writeFile(fullPath, buffer);
          
          const filePath = `${directory}/${filename}`;
          console.log(`✅ Medya kaydedildi: ${filePath} (${(buffer.length / 1024 / 1024).toFixed(2)}MB)`);
          
          res.json({ success: true, filePath });
        } catch (error) {
          console.error('Medya kaydetme hatası:', error);
          res.status(500).json({ error: 'Medya kaydetme başarısız' });
        }
      });

      // Medya dosyası sil
      app.post('/api/delete-media', async (req, res) => {
        try {
          const { filePath } = req.body;
          
          if (!filePath || !filePath.startsWith('/media/')) {
            return res.status(403).json({ error: 'Geçersiz dosya yolu' });
          }
          
          const fullPath = path.join(publicDir, filePath);
          
          try {
            await fs.access(fullPath);
            await fs.unlink(fullPath);
            console.log(`✅ Silindi: ${filePath}`);
          } catch (error) {
            console.log(`⚠️ Dosya bulunamadı: ${filePath}`);
          }
          
          res.json({ success: true });
        } catch (error) {
          console.error('Silme hatası:', error);
          res.status(500).json({ error: 'Silme başarısız' });
        }
      });

      // Middleware'i Vite server'a ekle
      server.middlewares.use(app);
      
      console.log('🚀 Backend API hazır: /api/*');
    }
  };
}
