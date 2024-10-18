
import admin from 'firebase-admin';


export default async function handler(req, res) {

    const serviceAccount ={
        projectId:'test-dce9e',
        privateKey:'-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCyh+dhYN22x5SS\nEF1OhqIAkUUZmNTm1z7YLsdkCdIe78pMnilipcPA/HGHq5GTKpr1OEHEOATJD3WV\nqI87SM0DK5GvVGNi/6gf89u3DaFCADtt1QFacIBUUpp/fFOlu5xJVTYA2X9sC+Rq\nFin+988HnIjve/S9bEePTRHGc6yGCpAp84NUP6oesJ2Xyss5+7if8mDp0sRn+Ids\nU99b5WJ/YdM6fdSDfpYKYZOKumbvVhhDeAMM42YFHdgsaNg1UDSulWoF83owBvvR\nBc7GSPDg364k+kM189PtaPTivCxoH19VsuRNqxUBVnkZNQdZxnPWTSxV0ArByKn/\nrk9lqJcXAgMBAAECggEALNJE62Q71acurCsSmePgKT9Pd1kw3lGc0/6OjZWPnLe7\n9NdicYNHbZyTTinrTuTL6ZO5oy8jOG06qpuadhpVah3WoguQNisURQ1elIsF+MGB\nKhZnlBKZjVH9utL2Vy4OUzTi7Xytam1j56Rv37TMU89fa6yVqbbVEmuZclbZMf9q\nYeGutGnAn3cDgO5VtsTiHhU0ZEfxkIS8ZydQrLNifHJlLqo1nM/ZrAAibmO/1HoZ\n07HufJShIupp9cQVQ7j/grZQHT6735mfEV/7h9ElC16ZU322NC1UvCHyCb1H+AxZ\nU+uijLXPSNjjfevsHSY0D4aoyd/adKVR4+j5QB/uCQKBgQDiocL2P8fq4Yh+mUiY\nF5/TE6eOHDt2QlH0G97S6ZPcawlgo/BpzO+7SihoXrCPw2Hh/aKxc5H//KYl3RFj\nNeOdTPLwm+6AbnQNB3X+v2dk59NrqaDmCXz1VtpHCez958cgsZGCRNodLpn2mO+C\nNM4wV5vfkXCPOwMO241nhqED/wKBgQDJqnMWeuC1HUgwS/DCfkO0Re/vml+VRo+i\nil1K7maKgjWd5UhamfgMlLUywbSW3uAwzJfxhZpX85Qt4G+4ht50zFlLk5B3zVwn\nmeFj0TEmFaKkZKnY/nKzd4emy7ocjIW/uOEAEdHA/ac2Rc9ZVEOizkYAB5HxaMMX\nuerJ/xQM6QKBgFPC8anNvPfkz2vq/1enM5zx4LW3XYrBzERqoJpXVhzbOqYLMWoJ\nInmYWQLqLFuWHPFHqv/m9Qklucq4wBpo6m1S6V9gYm/5Ys8F+OhkmbRDsnJSSXN8\nAkEzDo2+72aQaZp9xofdJrguZx0rPSpklehsGOIygOWPK/wrzUF8ErrFAoGBALTl\nK5U3pgdwe8eu5wlfv5WewopYHHNHtyIjIWpMjTijcjrvZ8a1pDaM0jj0XuySgeHk\nNEuW/4rzWLEKSMzqVfPJNjQ/6vA8CvUO6InkJUU3VQxHq7+VBwiLKOhqiMiBGJyQ\n12t7kH6gSXS6jDNiDcWlaE8wey5kPdQzljOZlr+5AoGAT0fkrI9ek1F1abTfA3SZ\nRT20mvBXgvAxa5f2UE1kVURSFOZvP/Q/yf3uDMi5FECiG4270xLRtgf0PTi+Pso5\nHIVd1PRrmixHkOaViw9c7/NSZdI8Y14oDuL9u67Xr5gQSFi10r5/BM1Hw1aOeA46\nwMHHsBOPxdtShFm+xNyTqn0=\n-----END PRIVATE KEY-----\n',
        clientEmail:'firebase-adminsdk-uat05@test-dce9e.iam.gserviceaccount.com',
    }

    //admin을 사용할 수 있을때 messaing을 send(데이터...)

    if (!admin.apps.length) {
        admin.initializeApp(
            {credential:admin.credential.cert(serviceAccount)}
        );
    }

    const msg = await admin.messaging().send(req.body);

    res.status(200).send('FCM 메세지 발송 완료!...');

};