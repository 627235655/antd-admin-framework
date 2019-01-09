const fs = require('fs');
const os = require('os');
const path = require('path');
const _root = path.resolve(__dirname, '..');

/**
 * Get ip(v4) address
 * @return {String} the ipv4 address or 'localhost'
 */
const getIP = function () {
  var ifaces = os.networkInterfaces();
  var ip = '';
  for (var dev in ifaces) {
    ifaces[dev].forEach(function (details) {
      if (ip === '' && details.family === 'IPv4' && !details.internal) {
        ip = details.address;
        return;
      }
    });
  }
  return ip || "127.0.0.1";
};

const root = function (...args) {
  return path.join(...[_root].concat(args));
}

// 同步文件遍历方法
const getFileList = function(files, filePath) {
    //根据文件路径读取文件，返回文件列表
    let file_list = [];
    try {
        file_list = fs.readdirSync(filePath);
        //遍历读取到的文件列表
        file_list.forEach(function(filename) {
            //获取当前文件的绝对路径
            let filedir = path.join(filePath, filename);
            //根据文件路径获取文件信息，返回一个fs.Stats对象
            try {
                // 同步获取文件信息
                let stats = fs.statSync(filedir);
                let isFile = stats.isFile(); //是文件
                let isDir = stats.isDirectory(); //是文件夹
                if (isFile) {
                    let no_ext_filename = filename.split('.')[0]
                    files.push(no_ext_filename);
                }
                if (isDir) {
                    getFileList(filedir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
                }
            } catch (err) {
                console.log(err)
            }
        });
    } catch (err) {
        console.log(err)
    }
    console.log(files)
};

module.exports = { getIP, root,  getFileList};
