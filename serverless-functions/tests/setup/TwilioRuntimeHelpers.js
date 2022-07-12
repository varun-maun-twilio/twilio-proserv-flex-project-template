const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');


class Runtime {


  static formatKey(pth) {
    return (pth + "").replace("\.private\.js", "").replace("\.protected\.js", "").replace("\.js", "").replace("\./src/", "")
  }


  static readFunctionsFolder = (dirMain, filePaths) => {
    const readDirMain = fs.readdirSync(dirMain);
    readDirMain.forEach((dirNext) => {
      if (fs.lstatSync(dirMain + "/" + dirNext).isDirectory()) {
        this.readFunctionsFolder(dirMain + "/" + dirNext, filePaths);
      }
      else {
        let pth = dirMain + "/" + dirNext;
        filePaths[this.formatKey(pth)] = { path: path.resolve(pth) };
      }
    });
  };

  static getFunctions() {
    let filePaths = {};
    this.readFunctionsFolder('./src/functions', filePaths);
    return filePaths;
  }
}



class Response {
  constructor() {
    this.headers = {};
    this.statusCode = 200;
    this.body = null;
  }
  appendHeader(k, v) {
    this.headers[k] = v;
  }
  setStatusCode(statusCode) {
    this.statusCode = statusCode;
  }
  setBody(body) {
    this.body = body;
  }
}


async function executeHandler(handler, context, event, requestHeaders = {}) {
  return new Promise((resolve, reject) => {
    const callback = (error, payload) => {
      if (error) {
        reject(error);
      } else {
        resolve(payload);
      }
    };
    handler(
      context,
      {
        ...event,
        request: {
          cookies: {},
          headers: { ...requestHeaders },
        },
      },
      callback,
    );
  });
}




module.exports = {
  Runtime,
  Twilio: {
    Response
  },
  executeHandler
}