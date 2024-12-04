// backend/server.js

const express = require('express');
const ytdl = require("@distube/ytdl-core");
const app = express();
const fs = require('fs');
const path = require('path');
const os = require('os');
const cors = require('cors');

app.use(cors({ origin: 'http://localhost:5173' }));
var router = express.Router();
const downloadsDir = path.join(os.homedir(), 'Downloads'); 

router.get('/', async function (req, res) {
    console.log('router called');
    let url = req.query.url;
    let fileType = req.query.type;
    try{
        console.log('starting');
        const info = await ytdl.getInfo(url);
        let title = info.videoDetails.title;
        if (fileType == 'mp3') {
            const filePath = path.join(downloadsDir, `${title}.mp3`);
            console.log(title);
            const videoStream = ytdl(url,{
                filter: 'audioonly',
                requestOptions: {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36',
                        'Accept-Language': 'en-US,en;q=0.9',
                    },
                },
            });
            const writeStream = fs.createWriteStream(filePath);
            console.log('piping');
            videoStream.pipe(writeStream);
            writeStream.on('finish', () => {
                console.log('Download complete');
                if (!res.headersSent) {
                    res.send('Video downloaded successfully to ${filePath}');
                }
            });
            videoStream.on('error', (err) => {
                console.error('Error downloading video:', err);
                if (!res.headersSent) {
                    res.status(500).send('Failed to download video');
                }
            });

            // Handle errors from the file write stream
            writeStream.on('error', (err) => {
                console.error('Error writing to file:', err);
                if (!res.headersSent) {
                    res.status(500).send('Failed to save video');
                }
            });
        }
        if (fileType == 'mp4') {
            console.log(fileType, url);
            /*const filePath = path.join(downloadsDir, `${title}.mp4`);
            console.log(title);
            const videoStream = ytdl(url,{
                filter: 'audioonly',
                requestOptions: {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36',
                        'Accept-Language': 'en-US,en;q=0.9',
                    },
                },
            });
            const writeStream = fs.createWriteStream(filePath);
            console.log('piping');
            videoStream.pipe(writeStream);
            writeStream.on('finish', () => {
                console.log('Download complete');
                if (!res.headersSent) {
                    res.send('Video downloaded successfully to ${filePath}');
                }
            });
            videoStream.on('error', (err) => {
                console.error('Error downloading video:', err);
                if (!res.headersSent) {
                    res.status(500).send('Failed to download video');
                }
            });

            // Handle errors from the file write stream
            writeStream.on('error', (err) => {
                console.error('Error writing to file:', err);
                if (!res.headersSent) {
                    res.status(500).send('Failed to save video');
                }
            });*/
        }

    } catch (err) {
        console.error('Unexpected error:', err);
        if (!res.headersSent) {
            res.status(500).send('An unexpected error occurred');
        }
    }
    
    //res.end();
})
app.use(router)
app.listen(2222, () => {
    console.log('listening on 2222');
})
