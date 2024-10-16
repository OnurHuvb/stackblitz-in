import express from 'express';
import mysql from 'mysql2';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'logis',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(query, [username, email, hashedPassword], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error registering user' });
    } else {
      res.status(201).json({ message: 'User registered successfully' });
    }
  });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error logging in' });
    } else if (results.length === 0) {
      res.status(401).json({ error: 'Invalid email or password' });
    } else {
      const user = results[0];
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
      } else {
        res.status(401).json({ error: 'Invalid email or password' });
      }
    }
  });
});

app.get('/api/user', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const query = 'SELECT id, username, email FROM users WHERE id = ?';
    db.query(query, [decoded.userId], (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Error fetching user data' });
      } else if (results.length === 0) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.json(results[0]);
      }
    });
  });
});

// Add this new route to handle teaching info submission
app.post('/api/teaching-info', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const userId = decoded.userId;
    const {
      level_bilgisi,
      ders_brans,
      class_size,
      student_discipline_status,
      academic_hazirbulunusluluk,
      ogretmen_tecrube_durumu
    } = req.body;

    // Boş string veya undefined değerler için varsayılan değer atayalım
    const safeLevel = level_bilgisi || 'Not Specified';
    const safeDersBrans = ders_brans || 'Not Specified';
    const safeClassSize = class_size || 0;
    const safeStudentDiscipline = student_discipline_status || 0;
    const safeAcademicHazirbulunusluluk = academic_hazirbulunusluluk || 0;
    const safeOgretmenTecrube = ogretmen_tecrube_durumu || 0;

    const query = `
      INSERT INTO teaching_info 
      (user_id, level_bilgisi, ders_brans, class_size, student_discipline_status, academic_hazirbulunusluluk, ogretmen_tecrube_durumu) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
      level_bilgisi = VALUES(level_bilgisi),
      ders_brans = VALUES(ders_brans),
      class_size = VALUES(class_size),
      student_discipline_status = VALUES(student_discipline_status),
      academic_hazirbulunusluluk = VALUES(academic_hazirbulunusluluk),
      ogretmen_tecrube_durumu = VALUES(ogretmen_tecrube_durumu)
    `;

    db.query(
      query,
      [userId, safeLevel, safeDersBrans, safeClassSize, safeStudentDiscipline, safeAcademicHazirbulunusluluk, safeOgretmenTecrube],
      (err, result) => {
        if (err) {
          console.error('Error saving teaching info:', err);
          res.status(500).json({ error: 'Error saving teaching information' });
        } else {
          res.status(200).json({ message: 'Teaching information saved successfully' });
        }
      }
    );
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
