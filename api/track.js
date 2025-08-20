// Supabaseのクライアントをインポート
import { createClient } from '@supabase/supabase-js';

// Vercelに設定した環境変数を取得
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Supabaseクライアントを初期化
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // リクエストボディから緯度と経度を取得
        const { lat, lon, alt } = req.body;

        // Supabaseの 'locations' テーブルにデータを挿入
        const { data, error } = await supabase
            .from('location') // 作成したテーブル名を指定
            .insert([{
                latitude: lat,
                longitude: lon,
                altitude: alt
            }]);

        if (error) {
            console.error('データの保存に失敗しました:', error);
            return res.status(500).json({ message: 'Error saving data' });
        }

        console.log('位置情報が正常に保存されました:', data);
        res.status(200).json({ message: 'Location data received and saved' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}