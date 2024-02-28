// import { NextApiRequest, NextApiResponse } from 'next';
// import { Pool } from 'pg';

// interface FormData {
//     productName: string;
//     category: string;
//     measurements: string[];
// }

// const pool = new Pool({
//   connectionString: process.env.POSTGRES_URL, 
//   ssl: {
//     rejectUnauthorized: false 
//   }
// });

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === 'POST') {
//     const { formDataList } = req.body;
//     try {
//       const client = await pool.connect();
//       await Promise.all(formDataList.map(async (formData: FormData) => {
//         const { productName, category, measurements } = formData;
//         await client.query(
//           'INSERT INTO your_table_name (productName, category, measurements) VALUES ($1, $2, $3)',
//           [productName, category, measurements]
//         );
//       }));
//       client.release();
//       res.status(201).json({ message: 'Data submitted successfully' });
//     } catch (error) {
//       console.error('Error submitting data:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end('Method Not Allowed');
//   }
// };

// export default handler;