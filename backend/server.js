// backend/server.js

const express = require('express');
const ytdl = require("@distube/ytdl-core");
const app = express();
const fs = require('fs');
const path = require('path');
const os = require('os');
const cors = require('cors');
const proxyAgent = require('https-proxy-agent');
const { exec } = require('child_process');
const { stdout, stderr } = require('process');

app.use(cors({ origin: '*' }));
var router = express.Router();
const downloadsDir = path.join(os.homedir(), 'Downloads'); 

router.get('/', async function (req, res) {
    console.log('router called');
    let url = req.query.url;
    let fileType = req.query.type;
    if (!url) {
        return res.status(400).send('No url provided');
    }

    try{
        console.log('starting');
        const agent = new proxyAgent('https://13.59.156.167:3128');
        const info = await ytdl.getInfo(url);
        let title = info.videoDetails.title;
        fileName = title;
        if (fileType == 'mp3') {
            fileName += '.mp3';
            const filePath = path.join(downloadsDir, fileName);
            console.log(title);
            const videoStream = ytdl(url,{
                filter: 'audioonly',
                requestOptions: {
                    agent,
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
            fileName += '.mp4';
            const videoPath = path.join(__dirname, 'video.mp4');
            const audioPath = path.join(__dirname, 'audio.mp3');
            const filePath = path.join(downloadsDir, fileName);
            console.log(title);
            const videoStream = ytdl(url,{
                filter: 'videoonly',
                requestOptions: {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36',
                        'Accept-Language': 'en-US,en;q=0.9',
                    },
                },
            });
            const audioStream = ytdl(url,{
                filter: 'audioonly',
                requestOptions: {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36',
                        'Accept-Language': 'en-US,en;q=0.9',
                    },
                },
            });
            const videoWriteStream = fs.createWriteStream(videoPath);
            const audioWriteStream = fs.createWriteStream(audioPath);

            console.log('piping');
            videoStream.pipe(videoWriteStream);
            audioStream.pipe(audioWriteStream);

            let downloadComplete = 0;
            const checkDownload = async () => {
                downloadComplete++;
                if (downloadComplete === 2) {
                    console.log('video and audio downloaded, merging streams');

                    const ffmpegCmd = `ffmpeg -y -i "${videoPath}" -i "${audioPath}" -c:v copy -c:a aac "${filePath}"`;
                    exec(ffmpegCmd, (err, stdout, stderr) => {
                        if (err) {
                            console.error('Error merging:', err);
                            res.status(500).send('Failed to merge video and audio');
                            return;
                        }
                        console.log('Merge successful:', stdout, stderr);
                        res.send(`Video downloaded and saved as ${filePath}`);
                        cleanupTemporaryFiles();
                    });
                }
            }

            function cleanupTemporaryFiles() {
                fs.unlink(videoPath, (err) => {
                    if (err) {
                        console.error('Error deleting video file:', err);
                    } else {
                        console.log('Temporary video file deleted.');
                    }
                });
            
                fs.unlink(audioPath, (err) => {
                    if (err) {
                        console.error('Error deleting audio file:', err);
                    } else {
                        console.log('Temporary audio file deleted.');
                    }
                });
            }

            videoWriteStream.on('finish', checkDownload);
            audioWriteStream.on('finish', checkDownload);

            videoStream.on('error', (err) => {
                console.error('Error downloading video:', err);
                res.status(500).send('Failed to download video');
            });
    
            audioStream.on('error', (err) => {
                console.error('Error downloading audio:', err);
                res.status(500).send('Failed to download audio');
            });
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
