import * as functions from 'firebase-functions';

const path = require('path');
const os = require('os');
const mkdirp = require('mkdirp-promise');
const spawn = require('child-process-promise').spawn;
const rimraf = require('rimraf');

const {Storage} = require('@google-cloud/storage');
const gcs = new Storage();

export const resizeThumbnail = functions.storage.object()
  .onFinalize(async (object, context) => {
    const fileFullPath = object.name || '',
      contentType = object.contentType || '',
      fileDir = path.dirname(fileFullPath),
      fileName = path.basename(fileFullPath),
      tempLocalDir = path.join(os.tmpdir(), fileDir);
    console.log('Thumbnail generation started: ', fileFullPath, fileDir, fileName);
    if (!contentType.startsWith('image/') || fileName.startsWith('thumb_')) {
      console.log('Abbruch');
      return null;
    }
    await mkdirp(tempLocalDir);
    const bucket = gcs.bucket(object.bucket);
    const originalImageFile = bucket.file(fileFullPath);
    const tempLocalFile = path.join(os.tmpdir(), fileFullPath);
    console.log('Downloading image to: ', tempLocalFile);

    await originalImageFile.download({destination: tempLocalFile});

    // Thumbnail erzeugen: ImageMagic
    const outputFilePath = path.join(fileDir, 'thumb_' + fileName);
    const outputFile = path.join(os.tmpdir(), outputFilePath);
    console.log('Generating a thumbnail to: ', outputFile);
    await spawn('convert', [tempLocalFile, '-thumbnail', '510x287 >', outputFile],
      {capture: ['stdout', 'stderr']});

    // hochladen
    const metatdata = {
      contentType: object.contentType,
      cacheControl: 'public.max-age=2592000, s-maxage=2592000'
    };

    console.log('Uploding to storage: ', outputFile, outputFilePath);

    const uploadedFiles = await bucket.upload(outputFile, {destination: outputFilePath, metatdata});

    //delete Original
    rimraf.sync(tempLocalDir);

    await originalImageFile.delete();
    // create Link
    const thumbnail = uploadedFiles[0];
    const url = await thumbnail.getSignedUrl({action: 'read', expires: new Date(3000, 0, 1)});
    console.log('Generated URL: ', url);
    // save link in db
    // const frags = fileFullPath.split('/'),
    //   patId = frags[1];

    return null;
  });
