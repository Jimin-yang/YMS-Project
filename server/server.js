const express = require('express');
const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const models = require('../models'); // models 모듈을 가져오는 부분에서 오류 발생 가능성이 있습니다. 정의된 모듈이 아니라면 수정이 필요합니다.

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3001;
const dbPath = '../DataBase/movieDB.db';

let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the movieDB database.');

    // 영화 데이터를 제공하는 엔드포인트
    app.get('/api/selection-data', (req, res) => {
      const query = `
        SELECT MovieShowings.id, Movies.image AS movieImage, Movies.title AS movieTitle, Theaters.name AS theater, Times.value AS time
        FROM MovieShowings
        INNER JOIN Movies ON MovieShowings.movieid = Movies.movieid
        INNER JOIN Theaters ON MovieShowings.theaterid = Theaters.theaterid
        INNER JOIN Times ON MovieShowings.timeid = Times.timeid
      `;

      db.all(query, [], (err, rows) => {
        if (err) {
          console.error(err.message);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json(rows);
        }
      });
    });
    // DB에서 상영관 정보 가져오기
    app.get('/api/theaters', (req, res) => {
      // 실제로는 DB에서 데이터를 가져오는 로직이 들어가야 합니다.
      const theatersFromDB = [
        { theaterid: 11, name: '상영관1' },
        { theaterid: 12, name: '상영관2' },
        { theaterid: 13, name: '상영관3' },
      ];
      res.json(theatersFromDB);
    });

    app.get('/api/paid-seats', (req, res) => {
  db.all('SELECT * FROM Seats WHERE isPaid = 1', [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: '내부 서버 오류' });
    } else {
      res.json(rows);
    }
  });
});

    // DB에서 상영시간 정보 가져오기
    app.get('/api/times', (req, res) => {
      const query = 'SELECT * FROM Times'; // Times 테이블에서 시간 정보를 가져오는 쿼리
    
      db.all(query, [], (err, rows) => {
        if (err) {
          console.error(err.message);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json(rows); // 쿼리로부터 가져온 시간 정보를 JSON으로 응답
        }
      });
    });

    // 영화 좌석 데이터를 제공하는 엔드포인트
    app.get('/api/seats', (req, res) => {
      db.all('SELECT * FROM Seats', [], (err, rows) => {
        if (err) {
          console.error(err.message);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json(rows);
        }
      });
    });

    // 삭제 엔드포인트 예시
    app.delete('/api/movies/:title', (req, res) => {
      const movieTitleToDelete = req.params.title;

      // 여기에서 movieDB.db에서 movieTitleToDelete와 일치하는 항목을 삭제하는 코드를 작성
      // ...

      res.status(200).json({ message: `Deleted movie with title: ${movieTitleToDelete}` });
    });

    // 수정 엔드포인트 예시
    app.put('/api/movies/:title', (req, res) => {
      const movieTitleToUpdate = req.params.title;
      const updatedData = req.body; // 수정할 데이터는 요청의 body에서 받아옴

      // 여기에서 movieDB.db에서 movieTitleToUpdate와 일치하는 항목을 업데이트하는 코드를 작성
      // ...

      res.status(200).json({ message: `Updated movie with title: ${movieTitleToUpdate}` });
    });

    // 결제 완료 후 좌석 상태 업데이트
    app.post('/api/payment', (req, res) => {
      const {
        movieTitle,
        theater,
        time,
        selectedSeats,
        childCount,
        adultCount,
      } = req.body;
    
      const insertQuery = `
        INSERT INTO Receipt (movieTitle, theater, showTime, selectedSeats, childCount, adultCount)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
    
      db.run(
        insertQuery,
        [movieTitle, theater, time, selectedSeats.join(', '), childCount, adultCount],
        function (err) {
          if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
          } else {
            // 결제가 완료되면 해당 좌석의 isPaid 필드를 true로 업데이트
            const updateSeatsQuery = `
              UPDATE Seats
              SET isPaid = true
              WHERE id IN (${selectedSeats.join(', ')})
            `;
            db.run(updateSeatsQuery, function (err) {
              if (err) {
                console.error(err.message);
                res.status(500).json({ error: 'Internal Server Error' });
              } else {
                console.log(`A row has been inserted with rowid ${this.lastID}`);
                res.status(200).json({ message: 'Payment information saved successfully' });
              }
            });
          }
        }
      );
    });

// 좌석 선택 시 결제 상태 확인
app.get('/api/seats', (req, res) => {
  db.all('SELECT * FROM Seats WHERE isPaid = false', [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(rows);
    }
  });
});

    // Payment 정보를 Receipt 테이블에 저장하는 엔드포인트
app.post('/api/payment', (req, res) => {
  const {
    movieTitle,
    theater,
    time,
    selectedSeats,
    childCount,
    adultCount,
    merchantUid, // 결제 코드 추가
  } = req.body;

  // Receipt 테이블에 데이터를 삽입하는 쿼리
  const insertQuery = `
    INSERT INTO Receipt (movieTitle, theater, showTime, selectedSeats, childCount, adultCount, merchantUid)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(insertQuery, [movieTitle, theater, time, selectedSeats, childCount, adultCount, merchantUid], function(err) {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Payment information saved successfully', id: this.lastID });
    }
  });
});

    app.use(express.static(path.join(__dirname, '../build')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../build', 'index.html'));
    });

    app.listen(PORT, () => {
      console.log('서버가 동작중입니다.');

      models.sequelize
        .sync()
        .then(() => {
          console.log('DB연결 성공');
        })
        .catch((e) => {
          console.error(e);
          console.log('DB연결 에러');
          process.exit();
        });
    });
  }
});