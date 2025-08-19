export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { lat, lon } = req.body;
        
        // ここで位置情報（lat, lon）をデータベースに保存する処理を記述します
        console.log(`Received location data: Latitude: ${lat}, Longitude: ${lon}`);

        // データベースに保存する場合、以下のようなコードを追加
        // await db.collection('locations').add({ lat, lon, timestamp: new Date() });

        res.status(200).json({ message: 'Location data received successfully' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}